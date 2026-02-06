# Clean Repository Migration Guide

## 🎯 Goal

Extract `next-app/` to a new clean repository: **leeha-haywooduniversal-com-v2**

Deploy to Vercel without the webpack errors caused by the two-project structure.

---

## 📊 Current Situation

### Repository Structure (PROBLEM)
```
leeha-haywooduniversal.com/
├── next-app/              ← Production Next.js app (WANT)
├── components/            ← Vite dev environment (DON'T WANT)
├── pages/                 ← Vite dev environment (DON'T WANT)
├── src/                   ← Vite dev environment (DON'T WANT)
├── package.json           ← Vite config (DON'T WANT)
└── vercel.json            ← Conflicts with next-app/vercel.json
```

### Issues
- ❌ Webpack error: "Unexpected end of JSON input"
- ❌ Two package.json files confusing Next.js workspace detection
- ❌ Vite files interfering with Next.js build
- ❌ Vercel detecting wrong framework
- ❌ Cannot add contact API route without build failure

---

## ✅ Solution: Two Migration Options

### Option 1: Full History Preservation (RECOMMENDED)
**Script**: `MIGRATE_TO_CLEAN_REPO.sh`
**Requires**: `git-filter-repo` (install: `brew install git-filter-repo`)
**Preserves**: Only git commits affecting `next-app/`
**Result**: Clean repository with relevant history

### Option 2: Simple Fresh Start
**Script**: `MIGRATE_SIMPLE.sh`
**Requires**: Only standard git
**Preserves**: No history (fresh start)
**Result**: Clean repository with all current files

---

## 🚀 Migration Steps

### Pre-Migration Checklist

- [ ] Backup current repository
- [ ] Ensure `gh` CLI is authenticated: `gh auth status`
- [ ] Verify build works locally: `cd next-app && npm run build`
- [ ] Note any uncommitted changes: `git status`

---

### Option 1: Full History (Recommended)

#### Step 1: Install git-filter-repo
```bash
brew install git-filter-repo
```

#### Step 2: Run Migration Script
```bash
cd /Users/dame/management-git/leeha-haywooduniversal.com
chmod +x MIGRATE_TO_CLEAN_REPO.sh
./MIGRATE_TO_CLEAN_REPO.sh
```

#### What It Does:
1. ✅ Clones original repository
2. ✅ Extracts `next-app/` with git history using `filter-repo`
3. ✅ Moves contents to repository root
4. ✅ Creates GitHub repository: `leeha-haywooduniversal-com-v2`
5. ✅ Pushes to GitHub
6. ✅ Provides Vercel setup instructions

---

### Option 2: Simple Fresh Start

#### Run Simple Migration
```bash
cd /Users/dame/management-git/leeha-haywooduniversal.com
chmod +x MIGRATE_SIMPLE.sh
./MIGRATE_SIMPLE.sh
```

#### What It Does:
1. ✅ Copies `next-app/*` to new directory
2. ✅ Initializes fresh Git repository
3. ✅ Creates initial commit
4. ✅ Creates GitHub repository
5. ✅ Pushes to GitHub

---

## ☁️ Vercel Deployment Setup

### After Migration Script Completes

1. **Go to Vercel**: https://vercel.com/new

2. **Import Repository**:
   - Select: `DaBigHomie/leeha-haywooduniversal-com-v2`

3. **Configure Project**:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Environment Variables** (Optional):
   ```
   RESEND_API_KEY=xxx  # For email functionality
   ```

5. **Deploy**: Click "Deploy"

6. **Custom Domain** (Optional):
   - After deployment succeeds
   - Go to Project Settings → Domains
   - Add: `haywooduniversal.com` or custom domain

---

## 🧪 Post-Migration Testing

### 1. Local Build Test
```bash
cd /Users/dame/management-git/leeha-haywooduniversal-com-v2
npm install
npm run build
npm run start
```

Visit: http://localhost:3000

### 2. Verify All Pages Load
- [ ] Home: `/`
- [ ] Services: `/services`
- [ ] Gallery: `/gallery`
- [ ] Contact: `/contact`
- [ ] Project Management: `/project-management`
- [ ] Rooms for Rent: `/rooms-for-rent`

### 3. Check Deployed Site
Once Vercel deployment completes:
- [ ] All pages load
- [ ] Images display
- [ ] Navigation works
- [ ] Contact form works (if re-added)
- [ ] Mobile responsive
- [ ] No console errors

---

## 📝 Add Contact API Route (After Migration)

Once new repo deploys successfully, add contact route:

```bash
cd /Users/dame/management-git/leeha-haywooduniversal-com-v2

# Create API route directory
mkdir -p src/app/api/contact

# Create route file
cat > src/app/api/contact/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    
    console.log('Contact form:', validatedData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message!' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 400 }
    );
  }
}
EOF

# Test locally
npm run build
npm run start

# If successful, commit and push
git add src/app/api/contact/
git commit -m "feat: Add contact form API route"
git push origin main
```

---

## 🗑️ Clean Up Old Repository (Optional)

After verifying new deployment works:

### Option A: Archive Old Repo
```bash
cd /Users/dame/management-git/leeha-haywooduniversal.com
mkdir archived-$(date +%Y%m%d)
mv * archived-$(date +%Y%m%d)/ 2>/dev/null || true
echo "Archived. New repo: leeha-haywooduniversal-com-v2" > README.md
```

### Option B: Delete GitHub Repo
```bash
# Archive on GitHub (Settings → Archive this repository)
# Or delete:
gh repo delete DaBigHomie/leeha-haywooduniversal.com --yes
```

---

## 🎯 Success Criteria

- [ ] New repository created: `leeha-haywooduniversal-com-v2`
- [ ] All Next.js files present in root
- [ ] No Vite files in new repo
- [ ] Single package.json
- [ ] Build succeeds locally: `npm run build` ✅
- [ ] Deployed to Vercel successfully
- [ ] All 6 pages load on production
- [ ] Framework detected correctly: Next.js
- [ ] No webpack errors
- [ ] Contact API route works (if added)

---

## 📊 Comparison: Before vs After

| Aspect | Before (Old Repo) | After (New Repo) |
|--------|-------------------|------------------|
| **Structure** | Two projects (Vite + Next.js) | Single Next.js project |
| **package.json** | 2 files | 1 file |
| **Framework** | Confused (Vite vs Next.js) | Clear (Next.js only) |
| **Build** | Fails with webpack error | ✅ Succeeds |
| **Vercel** | Detects Vite | ✅ Detects Next.js |
| **API Routes** | Cannot add | ✅ Can add freely |
| **Deployments** | 404 errors | ✅ Works |

---

## ❓ Troubleshooting

### Migration Script Fails

**Error**: `git-filter-repo not found`
- **Fix**: `brew install git-filter-repo`

**Error**: `gh: not authenticated`
- **Fix**: `gh auth login`

**Error**: `Repository already exists`
- **Fix**: Delete or rename: `gh repo delete DaBigHomie/leeha-haywooduniversal-com-v2`

### Build Fails After Migration

**Check**:
```bash
cd /Users/dame/management-git/leeha-haywooduniversal-com-v2
npm install
npx tsc --noEmit  # TypeScript check
npm run lint      # ESLint check
npm run build     # Full build
```

### Vercel Deployment Fails

**Common Issues**:
- Root Directory wrong: Should be `./`
- Framework wrong: Should be Next.js
- Missing dependencies: Check `package.json`

---

## 📞 Support

**Issues**: https://github.com/DaBigHomie/leeha-haywooduniversal-com-v2/issues

**Original Repo**: https://github.com/DaBigHomie/leeha-haywooduniversal.com

---

## 📅 Migration Timeline

**Estimated Time**: 15-20 minutes

1. ✅ Run migration script (5 min)
2. ✅ Set up Vercel (3 min)
3. ✅ Verify deployment (5 min)
4. ✅ Test all pages (5 min)
5. ✅ Add contact route (2 min)

---

**Ready to migrate?** Run one of the migration scripts above! 🚀
