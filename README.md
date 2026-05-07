# Credex AI Spend Audit

Credex AI Spend Audit is a free tool designed to help startup founders and engineering managers analyze their AI tooling costs. It identifies overspending on tools like Cursor, Claude, ChatGPT, and Copilot, recommending plan downgrades, cheaper alternatives, or the use of Credex to acquire discounted credits, saving companies thousands annually.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run locally:
   ```bash
   npm run dev
   ```
3. Deploy:
   This project is configured for seamless deployment on Vercel. Simply push to GitHub and connect to Vercel for automatic deployments.

## Decisions (Trade-offs)

1. **Next.js App Router vs Pages Router:** Chose App Router for better performance, server components, and native support for server actions (used for form submission and lead capture), even though it introduces a slightly steeper learning curve.
2. **Tailwind CSS & shadcn/ui vs Component Libraries (MUI/Mantine):** Chose Tailwind and headless primitives (shadcn) for complete control over the UI and a more premium, custom look, trading off some initial setup time compared to pre-built libraries.
3. **Hardcoded Pricing vs Database:** Kept pricing data hardcoded in the engine (with `PRICING_DATA.md` tracking sources) rather than a database. This avoids unnecessary latency and infra complexity for the MVP, given pricing changes relatively infrequently.
4. **Local State vs URL State:** The form state is persisted via local storage instead of URL parameters to keep the URL clean for the user while filling out the form, though it sacrifices shareability of the "input" state (the output state is uniquely shareable via DB).
5. **Direct API vs LangChain:** Used direct fetch/SDK calls to Anthropic instead of a framework like LangChain to reduce bundle size and keep the architecture simple, since we only need a single summary generation.

## Deployed URL
## https://ai-subscription-audit.vercel.app/

## https://vercel.com/manish20as-projects/ai-subscription-audit
