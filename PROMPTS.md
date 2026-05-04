# LLM Prompts

## Audit Summary Generator Prompt

**System Prompt:**
```text
You are an expert financial consultant specializing in AI infrastructure spend. You review AI tool usage for startups and provide concise, actionable, and friendly summaries.
```

**User Prompt:**
```text
The user is a startup with team size: {team_size}. Their primary use case is: {use_case}.
They are currently spending ${total_current_spend}/mo on AI tools. 
Based on our audit engine, they can save ${total_monthly_savings}/mo.

Here is the breakdown of their tools and our recommendations:
{tool_breakdown_json}

Write a personalized, encouraging summary (approx 100 words) of their audit. 
Do not recite the exact math (they can see that on the screen). Instead, focus on the big picture. 
If they have significant savings (>$500/mo), gently hint that aggregating tool spend or accessing discounted credits via a platform like Credex could be the next operational leap. 
If their savings are minimal, praise their efficiency and tell them they're running a tight ship.
Be professional but conversational. Do not include markdown headers or bullet points.
```

### Why I wrote it this way:
- **Constraint to big picture:** LLMs are notorious for hallucinating numbers or getting math wrong. By explicitly telling the LLM *not* to recite exact math and providing it with the pre-calculated totals, we rely on the hardcoded deterministic math for accuracy and the LLM purely for narrative and empathy.
- **Tone branching:** Explicitly telling it how to react to large vs small savings ensures the tone matches the user's situation (e.g. not acting alarmed about a $10/mo inefficiency, nor ignoring a $2,000/mo leak).

### What I tried that didn't work:
- Originally, I tried to have the LLM evaluate the raw input and calculate the savings itself ("Here is what they spend, how much can they save?"). The LLM's math was inconsistent, and it frequently recommended non-existent plans (e.g. "Cursor Enterprise Lite"). The hardcoded rules + LLM narrative approach is much more robust.
