# Architecture

## System Diagram

```mermaid
graph TD
    A[User (Browser)] -->|1. Fills form| B(Next.js Client Components)
    B -->|2. Form submission| C{Audit Engine Logic}
    C -->|3. Calculate Savings| C
    C -->|4. Request Summary| D[Next.js Server Actions / API]
    D -->|5. Fetch| E[Anthropic API / LLM]
    E -->|6. Summary Response| D
    D -->|7. Return Audit Results| C
    C -->|8. Renders Report| F[Audit Results Page]
    F -->|9. Captures Email| G[Next.js Server Actions]
    G -->|10. Store Lead| H[(Supabase / Postgres)]
    G -->|11. Send Email| I[Resend (Email API)]
    F -->|12. Generate Share URL| J[Unique Audit Route]
```

## Data Flow
1. **Input**: User selects tools, plans, monthly spend, team size, and use case. Form state is persisted in localStorage.
2. **Audit Processing**: The `Audit Engine` (client-side or server-side) takes this input, cross-references with hardcoded `PRICING_DATA` logic, and generates specific recommendations (e.g., "Switch to Pro", "Use Credex").
3. **AI Generation**: A request is sent to a server action which calls the Anthropic API to generate a personalized ~100-word summary based on the generated recommendations.
4. **Result Presentation**: The UI renders the breakdown, calculating Total Monthly/Annual Savings.
5. **Lead Capture**: If the user provides an email, it's captured and stored in a database via a server action. A transactional email is dispatched via Resend.
6. **Viral Loop**: A unique URL with Open Graph tags is generated using the stored audit data, stripping out PII (email/name) to allow the user to share their savings publicly.

## Tech Stack & Justification

- **Framework:** Next.js (React). It provides a full-stack environment. Server actions allow us to securely call the Anthropic API, interact with a database, and send emails without standing up a separate backend server. The App Router provides great performance and SEO capabilities.
- **Styling:** Tailwind CSS & shadcn/ui. This allows for rapidly building a highly polished, premium, and dynamic design without being constrained by an opinionated material/bootstrap design language.
- **Language:** TypeScript. Crucial for catching bugs early and defining strict interfaces for our Tool, Plan, and Pricing data structures.
- **Backend/DB:** Supabase. Fast, easy to integrate Postgres for storing leads and audit data for shareable links.
- **Email:** Resend. Simple API for transactional emails.

## Scaling to 10k audits/day

If this tool scaled to 10k audits/day, I would change the following:
1. **Caching LLM Responses:** Similar tool stacks and team sizes would produce similar LLM summaries. I would implement a Redis cache (e.g., Upstash) keyed by the exact tool configurations to save Anthropic API costs and reduce latency.
2. **Rate Limiting:** Implement strict rate limiting (e.g., Upstash Ratelimit) on the LLM endpoint to prevent abuse and runaway API costs.
3. **Queueing Emails:** Move email dispatch from synchronous server actions to an asynchronous queue or background worker (e.g., Inngest or Upstash QStash) to prevent UI blocking or dropped emails during spikes.
4. **Database Indexing:** Ensure proper indexes on the Audit Share URLs table and the Leads table in Postgres.
5. **Static Pricing Fetch:** Instead of hardcoded logic, pull pricing rules from a CMS or Redis at build time/revalidation, so the marketing team can update pricing rules without a code deployment.
