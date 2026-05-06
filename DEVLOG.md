# Developer Log

## Day 1 — 2026-05-01
**Hours worked:** 3
**What I did:** Initialized the Next.js App Router project. Set up Tailwind CSS and shadcn/ui components. Created the foundational project structure and began drafting the entrepreneurial markdown files (GTM, ECONOMICS, PRICING_DATA).
**What I learned:** Next.js 15 has slightly different patterns for server actions compared to 14, requiring explicit `"use server"` directives in separated files for clean architecture.
**Blockers / what I'm stuck on:** Need to figure out the best way to handle complex dynamic form state with multiple tools without making the component too bloated.
**Plan for tomorrow:** Build the Spend Input Form and integrate local storage persistence.

## Day 2 — 2026-05-02
**Hours worked:** 4
**What I did:** Completed the dynamic Spend Input Form. Users can add multiple tools, select plans, and input spend. Integrated local storage so the form state persists across reloads. Conducted first two user interviews.
**What I learned:** Handling array state in React for dynamic forms can get tricky with standard inputs; using a reducer or custom hook makes it cleaner than inline `setTools`.
**Blockers / what I'm stuck on:** The UI looks a bit basic. Need to spend more time on polish and aesthetics to make it feel premium.
**Plan for tomorrow:** Design and implement the Audit Engine logic based on the collected pricing data.

## Day 3 — 2026-05-03
**Hours worked:** 5
**What I did:** Built the core Audit Engine. Implemented hardcoded rules to check for plan mismatches, redundant tools (e.g., Cursor + Copilot for small teams), and API vs UI pricing differences. Completed the final user interview.
**What I learned:** Edge cases in pricing logic are abundant. For example, some tools require a minimum seat count (like Claude Team requires 5), so downgrading to them isn't always an option if the team size is 2.
**Blockers / what I'm stuck on:** Accurately calculating annual savings requires distinguishing between monthly and annual billing options for some tools, which complicates the form. I decided to assume monthly billing for the MVP to keep the input simple.
**Plan for tomorrow:** Build the Audit Results page and the Anthropic API integration.

## Day 4 — 2026-05-04
**Hours worked:** 4
**What I did:** Created the Audit Results page. Added the Anthropic SDK and wrote the server action to generate the personalized summary. Added a graceful fallback if the Anthropic API fails or times out.
**What I learned:** LLMs are bad at math. I had to explicitly structure my prompt to provide the calculated savings rather than asking the LLM to calculate it from the raw input.
**Blockers / what I'm stuck on:** The Anthropic API sometimes takes 3-4 seconds to respond, which makes the UI feel slow.
**Plan for tomorrow:** Add loading skeletons for the API call and build the Lead Capture form.

## Day 5 — 2026-05-05
**Hours worked:** 3
**What I did:** Added loading states. Built the email capture form and set up a basic Supabase table to store leads. Added a simple honeypot field for abuse protection.
**What I learned:** Using a honeypot field (an invisible input field that bots fill out but humans don't) is often more user-friendly than forcing a CAPTCHA for a simple lead form.
**Blockers / what I'm stuck on:** None currently.
**Plan for tomorrow:** Implement the shareable result URL feature.

## Day 6 — 2026-05-06
**Hours worked:** 4
**What I did:** Created the dynamic route `[id]/page.tsx` for shareable results. When a user captures their email, the audit data is saved to Supabase and a unique ID is generated. Added Open Graph meta tags for Twitter/LinkedIn previews.
**What I learned:** Next.js App Router makes generating dynamic metadata very easy with the `generateMetadata` function.
**Blockers / what I'm stuck on:** Testing Open Graph tags locally is difficult without a tunnel like ngrok.
**Plan for tomorrow:** Final polish, write tests, and deploy.

## Day 7 — 2026-05-07
**Hours worked:** 3
**What I did:** Polished the UI, ensuring Lighthouse mobile scores are >90. Wrote tests for the Audit Engine logic. Deployed to Vercel. Finalized all README and submission documents.
**What I learned:** Vercel deployments catch build errors that sometimes don't appear in local dev, specifically around strict TypeScript types.
**Blockers / what I'm stuck on:** Resolved.
**Plan for tomorrow:** Submit the assignment.
