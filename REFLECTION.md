# Reflection

## 1. The hardest bug you hit this week, and how you debugged it
The hardest bug I hit was a hydration mismatch error in Next.js related to the form state persisting via `localStorage`. When the page initially loaded on the server, `localStorage` wasn't available, so it rendered an empty form. Then, the client kicked in, read `localStorage`, and updated the state, causing a React hydration error because the server and client HTML didn't match. 
*Hypothesis:* The component was trying to read `localStorage` during the initial synchronous render.
*What I tried:* I wrapped the `localStorage` retrieval in a `useEffect` to ensure it only ran after the component mounted. However, this caused a visible flicker (empty form -> populated form).
*What worked:* I implemented a custom hook `useMounted` to track if the component had mounted. I rendered a loading skeleton on the server and initial client pass, and only rendered the populated form once `mounted` was true. This fixed the hydration error and eliminated the ugly flicker.

## 2. A decision you reversed mid-week, and what made you reverse it
Initially, I planned to use a complex URL parameter system to store the form state (e.g., `?tools=cursor,copilot&spend=200,100`). My rationale was that it would make the state instantly shareable without needing a database. 
I reversed this decision on Day 3 after talking to users and looking at the resulting URLs. The URLs were incredibly long, ugly, and brittle. More importantly, it exposed exactly how much a company was spending directly in the URL string, which users felt was a privacy concern if they accidentally shared it. I switched to using `localStorage` for the input state, and only generating a clean, database-backed UUID URL (e.g., `/audit/abc-123`) *after* they opted into sharing their results.

## 3. What you would build in week 2 if you had it
In week 2, I would build the **PDF Export** and **Benchmark Mode**.
The PDF export is crucial for the target persona (VP of Eng/CTO) because they often need to present these findings to a CFO or the rest of the executive team. A clean, branded PDF is much easier to attach to an email or a Slack message than a web link. 
Benchmark Mode would be the next killer feature. Right now, the tool tells you if you're overpaying based on pricing logic. Benchmark Mode would tell you if you're overpaying compared to *your peers*. Saying "You spend $200/dev on AI tools, but the average Series A startup spends $80/dev" is a massively compelling reason to book a consultation with Credex.

## 4. How you used AI tools
I used **Claude 3.5 Sonnet** heavily for brainstorming the initial logic rules for the Audit Engine. I asked it to help me identify edge cases in Anthropic and OpenAI pricing structures. I didn't trust it to write the actual final math calculations, as LLMs frequently hallucinate exact dollar amounts, so I manually verified all pricing against the official websites and hardcoded the logic myself.
*Specific time AI was wrong:* I asked Claude to generate the Next.js App Router metadata structure for Open Graph tags. It generated the code using the Next.js 12 Pages Router syntax (`<Head> <meta property="og:title".../></Head>`) instead of the App Router's exported `metadata` object. I caught it because the compiler immediately threw an error, and I rewrote it using the official Next 14/15 documentation.

## 5. Self-rating (1–10)
- **Discipline (9):** Consistently committed code over 7 days, paced the work evenly, and avoided last-minute scrambles.
- **Code quality (8):** The code is modular, well-typed with TypeScript, and uses sensible abstractions, though the audit engine logic could be refactored into smaller sub-modules for better testability.
- **Design sense (9):** Delivered a premium, high-contrast, professional UI using Tailwind and shadcn, avoiding generic templates and focusing on visual hierarchy.
- **Problem-solving (8):** Effectively navigated Next.js quirks and successfully distilled complex pricing matrices into simple, defensible code logic.
- **Entrepreneurial thinking (10):** Treated this strictly as a GTM asset for Credex rather than a coding exercise. Prioritized the "viral loop" and the Credex lead-gen CTA over unnecessary technical features.
