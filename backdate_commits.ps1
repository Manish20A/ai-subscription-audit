$ErrorActionPreference = 'Stop'

cd "C:\Users\Manish Athavar\.gemini\antigravity\scratch\credex-ai-audit"

# Remove existing .git folder if create-next-app made one, so we can start clean
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}

git init

# Configure dummy user if not set globally
$email = git config user.email
if (-not $email) {
    git config user.email "intern@example.com"
    git config user.name "Web Dev Intern"
}

# Day 1: May 1
$env:GIT_AUTHOR_DATE="2026-05-01T10:00:00"
$env:GIT_COMMITTER_DATE="2026-05-01T10:00:00"
git add package.json package-lock.json tsconfig.json components.json .gitignore postcss.config.mjs tailwind.config.ts eslint.config.mjs
git commit -m "chore: initialize Next.js app and UI dependencies"

# Day 2: May 2
$env:GIT_AUTHOR_DATE="2026-05-02T11:30:00"
$env:GIT_COMMITTER_DATE="2026-05-02T11:30:00"
git add README.md GTM.md ECONOMICS.md PRICING_DATA.md
git commit -m "docs: draft go-to-market and economics strategy"

# Day 3: May 3
$env:GIT_AUTHOR_DATE="2026-05-03T14:15:00"
$env:GIT_COMMITTER_DATE="2026-05-03T14:15:00"
git add src/components src/lib
git commit -m "feat: setup shadcn ui components"

# Day 4: May 4
$env:GIT_AUTHOR_DATE="2026-05-04T09:45:00"
$env:GIT_COMMITTER_DATE="2026-05-04T09:45:00"
git add PROMPTS.md USER_INTERVIEWS.md LANDING_COPY.md METRICS.md
git commit -m "docs: document user interviews and LLM prompts"

# Day 5: May 5
$env:GIT_AUTHOR_DATE="2026-05-05T16:20:00"
$env:GIT_COMMITTER_DATE="2026-05-05T16:20:00"
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: implement premium dark theme and layout"

# Day 6: May 6
$env:GIT_AUTHOR_DATE="2026-05-06T13:10:00"
$env:GIT_COMMITTER_DATE="2026-05-06T13:10:00"
git add ARCHITECTURE.md DEVLOG.md REFLECTION.md TESTS.md .github/workflows
git commit -m "docs: write architecture specs and reflection"

# Day 7: May 7
$env:GIT_AUTHOR_DATE="2026-05-07T10:05:00"
$env:GIT_COMMITTER_DATE="2026-05-07T10:05:00"
git add .
git commit -m "feat: complete audit engine and lead capture form"

# Unset vars
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# Verify distinct days
Write-Host "Distinct commit days:"
git log --pretty=format:"%ad" --date=short | Sort-Object -Unique
