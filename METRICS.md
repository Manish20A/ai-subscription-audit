# Metrics

## North Star Metric
**High-Intent Consultations Booked**
*Why:* For a B2B lead-generation tool, raw traffic or "Daily Active Users" (DAU) is a vanity metric. People use an audit tool once, maybe twice. The entire purpose of this tool existing on the Credex balance sheet is to drive pipeline for the core product. A booked consultation from a user proven to have >$500/mo in savings is the purest signal of success.

## Input Metrics
1. **Completion Rate of Audit Form:** (Audits Completed / Unique Visitors). This measures if the form is too long or confusing.
2. **High-Savings Identification Rate:** (% of completed audits showing >$500/mo savings). This measures if our target audience (startups with high spend) is actually the one using the tool, versus solo indie hackers.
3. **Email Capture Rate on High-Savings Audits:** This measures the effectiveness of our Credex "tease" and whether the results are compelling enough to trade contact info for.

## First Instrumentation
I would first instrument PostHog to track the funnel drop-off within the form itself. I need to know exactly which field (e.g., "Monthly Spend") causes users to bounce.

## Pivot Decision Trigger
If the **High-Savings Identification Rate** drops below 5% after 1,000 visitors. This would indicate our distribution channels are reaching the wrong people (hobbyists spending $20/mo) and we need to pivot our GTM entirely away from Twitter/Reddit and strictly toward targeted outbound to Series A+ CTOs.
