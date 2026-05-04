# User Interviews

## Interview 1
**Name:** M.T. (Prefers anonymity)
**Role:** Co-founder & CTO
**Company Stage:** Seed (12 employees)

**Direct Quotes:**
- *"I literally just approved a $600 GitHub Copilot bill yesterday and I don't even know if our designers accidentally got seats."*
- *"We use ChatGPT Plus for everyone, but some engineers demanded Cursor. We're definitely paying twice for the same LLM access."*
- *"I wouldn't use a tool that requires my email just to see if I have a problem."*

**The most surprising thing they said:**
They don't view Cursor and Copilot as mutually exclusive. They pay for both for some devs because "Copilot's autocomplete is faster but Cursor's codebase chat is better."

**What it changed about my design:**
I ensured the audit engine doesn't automatically flag having *both* Cursor and Copilot as 100% waste without context, but rather flags it as a *potential* redundancy worth investigating. I also firmly made the tool no-login required to see value.

## Interview 2
**Name:** Sarah Jenkins
**Role:** VP of Engineering
**Company Stage:** Series A (45 employees)

**Direct Quotes:**
- *"Tracking AI spend is a nightmare. It's fragmented across 4 different corporate cards."*
- *"If you tell me I can save $50 a month, I don't care. That's noise. If you tell me I can save $2,000, we'll talk."*
- *"Are you sure you can get discounted credits? That sounds like a secondary market for software licenses."*

**The most surprising thing they said:**
The threshold for caring about savings is extremely high. Startups flush with cash (or focusing on growth) view small tooling optimizations as a distraction.

**What it changed about my design:**
I added clear conditional logic for the "Hero" savings number. If savings are <$100/mo, the UI doesn't try to sell Credex. It honestly states "You're spending well." We only aggressively push the Credex CTA for >$500/mo savings.

## Interview 3
**Name:** D.R.
**Role:** Lead Developer
**Company Stage:** Bootstrapped/Profitable (5 employees)

**Direct Quotes:**
- *"We use the Anthropic API directly via a custom UI we built to avoid paying $20/mo per seat for Claude Pro."*
- *"I hate when marketing tools try to shame you for your tech stack choices."*
- *"We actually downgraded from ChatGPT Enterprise back to Team because the minimum seat requirement didn't make sense for us."*

**The most surprising thing they said:**
They actively circumvent per-seat SaaS pricing by building internal tools using raw APIs to save money.

**What it changed about my design:**
I added "API Direct" as a selectable plan option for Claude, ChatGPT, and Gemini. The audit engine now praises users who use API direct for specific use cases (like writing/data) instead of flagging it as unusual.
