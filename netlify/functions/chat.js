/**
 * Netlify Function — Gemini chat proxy for CuriousPersona.
 * Keeps GEMINI_API_KEY server-side. Converts Anthropic-style
 * {system, messages: [{role, content}]} → Gemini generateContent format.
 */

// Try newer model first (2.5 Flash has free tier in most regions), fall back.
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-2.0-flash']
const endpointFor = (m) => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return json({ error: 'Server not configured' }, 500)
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const { system = '', messages = [], maxTokens = 300 } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: 'messages[] required' }, 400)
  }

  // Gemini expects alternating user/model turns in `contents`.
  // System instruction goes in a separate field.
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content ?? '') }],
  }))

  const geminiPayload = {
    systemInstruction: system ? { parts: [{ text: system }] } : undefined,
    contents,
    generationConfig: {
      // Give room for both the reply and any thinking tokens 2.5 burns internally.
      maxOutputTokens: Math.max(maxTokens * 4, 1024),
      temperature: 0.85,
      // Disable "thinking" mode on 2.5 models so tokens go to the reply.
      thinkingConfig: { thinkingBudget: 0 },
    },
  }

  let lastErr = null
  for (const model of MODELS) {
    try {
      const res = await fetch(`${endpointFor(model)}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      })

      if (res.ok) {
        const data = await res.json()
        const reply =
          data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
          'Hmm — I lost my train of thought. Try asking again?'
        return json({ reply, model })
      }

      // Only try next model on quota or model-unavailable errors
      if (res.status === 429 || res.status === 404 || res.status === 503) {
        lastErr = { status: res.status, detail: await res.text(), model }
        continue
      }

      const errText = await res.text()
      return json({ error: 'Gemini API error', detail: errText, model }, res.status)
    } catch (err) {
      lastErr = { status: 502, detail: err.message, model }
    }
  }

  return json({ error: 'All models unavailable', detail: lastErr }, 502)
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = { path: '/api/chat' }
