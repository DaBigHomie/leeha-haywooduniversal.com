# 🚀 Quick Start: Clean Repository Migration

## TL;DR - Just Run This

```bash
# Option 1: Preserve git history (recommended)
brew install git-filter-repo  # One-time setup
./MIGRATE_TO_CLEAN_REPO.sh

# Option 2: Fresh start (simpler, no history)
./MIGRATE_SIMPLE.sh
```

Then set up Vercel deployment at: https://vercel.com/new

---

## What's Happening?

We're extracting `next-app/` to a new clean repository to fix deployment issues.

### The Problem
- Current repo has TWO projects (Vite + Next.js) causing build errors
- Webpack fails with "Unexpected end of JSON input"
- Cannot add contact API route
- Vercel detects wrong framework

### The Solution
- Create new repo: `leeha-haywooduniversal-com-v2`
- Contains ONLY Next.js app (from `next-app/`)
- Clean structure, no conflicts
- Deploys successfully to Vercel

---

## Which Script Should I Use?

| Script | When to Use | Pros | Cons |
|--------|-------------|------|------|
| **MIGRATE_TO_CLEAN_REPO.sh** | You want git history | Preserves commits affecting next-app/ | Requires brew install |
| **MIGRATE_SIMPLE.sh** | You want quick & easy | No dependencies, fast | Starts fresh (no history) |

---

## Full Documentation

📖 See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for complete instructions

---

## After Migration

1. ✅ New repo created at: `/Users/dame/management-git/leeha-haywooduniversal-com-v2`
2. ✅ Pushed to GitHub: `DaBigHomie/leeha-haywooduniversal-com-v2`
3. ☁️ Deploy to Vercel: https://vercel.com/new
4. 🧪 Test all pages work
5. ✅ Add contact API route (see guide)

---

**Questions?** Read [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
