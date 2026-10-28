import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Local-only optional LLM endpoint. The API key never goes into client JavaScript. */
function sofiaChatApi(apiKey: string | undefined, model: string): Plugin {
  return {
    name: 'whatsack-local-sofia-ai',
    configureServer(server) {
      server.middlewares.use('/api/sofia-chat', (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const remote = (req.socket.remoteAddress || '').replace(/^::ffff:/, '');
        if (!['127.0.0.1', '::1'].includes(remote)) {
          res.statusCode = 403;
          res.end(JSON.stringify({ error: 'Local requests only' }));
          return;
        }
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'POST required' }));
          return;
        }
        if (!apiKey) {
          res.statusCode = 503;
          res.end(JSON.stringify({ mode: 'demo', error: 'No optional API key configured' }));
          return;
        }
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
          if (body.length > 12000) req.destroy();
        });
        req.on('end', async () => {
          try {
            const payload = JSON.parse(body) as { question?: unknown; context?: unknown };
            const question = typeof payload.question === 'string' ? payload.question.trim().slice(0, 2000) : '';
            const context = typeof payload.context === 'string' ? payload.context.trim().slice(0, 2500) : '';
            if (!question) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing question' }));
              return;
            }
            const officialSources = [
              'https://www.ohlone.edu/admissions',
              'https://www.ohlone.edu/financialaid',
              'https://icangotocollege.com/frequently-asked-questions',
              'https://studentaid.gov/',
              'https://www.csac.ca.gov/',
              'https://collegecost.ed.gov/net-price',
              'https://assist.org/',
              'https://www.calstate.edu/apply',
              'https://admission.universityofcalifornia.edu/',
            ];
            const instructions = `You are the WhatSack educational navigation demo for a fictional first-generation California high-school senior, Sofia Delgado, age 17, living in Fremont. Answer questions about community college, universities, transfers, FAFSA, CADAA, Cal Grants, scholarships, costs, admissions, and financial-aid special circumstances. Speak in plain language, answer the user's latest question directly, and consider provided conversational context. Keep answers to 2-4 short paragraphs, up to three recommended next steps, and one optional follow-up question. Use these official URLs as starting points only: ${officialSources.join(' ')}. Do not pretend to have browsed or checked live sources. Never invent eligibility, guarantees, current deadlines, award amounts, appointment openings, or admissions decisions. Refer students to official sites and human admissions/financial-aid counselors to confirm details. Explain that family job loss may warrant asking a college about a special-circumstances review, but does not guarantee aid. Avoid requesting names, immigration status, SSNs, exact household income, addresses, or private school records. No medical or legal advice. If information is uncertain, say so explicitly. This is an academic prototype; not a substitute for the responsible agency.`;
            const upstream = await fetch('https://api.openai.com/v1/responses', {
              method: 'POST',
              signal: AbortSignal.timeout(20000),
              headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ model, instructions, input: `Recent conversation (for context, may be incomplete):\n${context}\n\nLatest user question:\n${question}`, max_output_tokens: 500, store: false }),
            });
            if (!upstream.ok) {
              res.statusCode = 502;
              res.end(JSON.stringify({ error: 'AI service unavailable; using demonstration answer' }));
              return;
            }
            const response = await upstream.json() as {
              output?: Array<{type?: string; content?: Array<{type?: string; text?: string}>}>;
              output_text?: string;
            };
            const answer = response.output_text || response.output?.flatMap(item => item.content || []).filter(c => c.type === 'output_text').map(c => c.text || '').join('\n').trim();
            if (!answer) {
              res.statusCode = 502;
              res.end(JSON.stringify({ error: 'Empty AI response; using demonstration answer' }));
              return;
            }
            res.end(JSON.stringify({ mode: 'live', answer: answer.slice(0, 6000) }));
          } catch {
            res.statusCode = 502;
            res.end(JSON.stringify({ error: 'AI request failed; using demonstration answer' }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Only OPENAI_* server variables, never a VITE_* browser variable.
  const serverEnv = loadEnv(mode, process.cwd(), 'OPENAI_');
  return {
    plugins: [react(), sofiaChatApi(serverEnv.OPENAI_API_KEY || process.env.OPENAI_API_KEY, serverEnv.OPENAI_MODEL || 'gpt-6-luna')],
    server: { port: 5173, host: '127.0.0.1' },
  };
});