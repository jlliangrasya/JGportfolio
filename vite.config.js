import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-2.0-flash']
const geminiEndpoint = (m) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'dev-api-chat',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            const apiKey = env.GEMINI_API_KEY
            if (!apiKey) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Add GEMINI_API_KEY to .env.local' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', async () => {
              try {
                const { system = '', messages = [], maxTokens = 300 } = JSON.parse(body)

                const contents = messages.map((m) => ({
                  role: m.role === 'assistant' ? 'model' : 'user',
                  parts: [{ text: String(m.content ?? '') }],
                }))

                const payload = {
                  systemInstruction: system ? { parts: [{ text: system }] } : undefined,
                  contents,
                  generationConfig: {
                    maxOutputTokens: Math.max(maxTokens * 4, 1024),
                    temperature: 0.85,
                    thinkingConfig: { thinkingBudget: 0 },
                  },
                }

                let lastErr = null
                for (const model of GEMINI_MODELS) {
                  try {
                    const r = await fetch(`${geminiEndpoint(model)}?key=${apiKey}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    })

                    if (r.ok) {
                      const data = await r.json()
                      const reply =
                        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
                        'Hmm — I lost my train of thought. Try asking again?'
                      res.setHeader('Content-Type', 'application/json')
                      res.end(JSON.stringify({ reply, model }))
                      return
                    }

                    if (r.status === 429 || r.status === 404 || r.status === 503) {
                      lastErr = { status: r.status, model }
                      continue
                    }

                    const errText = await r.text()
                    res.statusCode = r.status
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ error: 'Gemini error', detail: errText, model }))
                    return
                  } catch (err) {
                    lastErr = { status: 502, detail: err.message, model }
                  }
                }

                res.statusCode = 502
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'All models unavailable', detail: lastErr }))
              } catch {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Invalid JSON' }))
              }
            })
          })
        },
      },
    ],
  }
})
