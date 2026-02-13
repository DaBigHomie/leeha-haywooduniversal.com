# Quick Action Plan - Next Agent

**Read Full Audit**: [REPOSITORY_AUDIT_AND_HANDOFF.md](./REPOSITORY_AUDIT_AND_HANDOFF.md)

---

## 🚨 CRITICAL ISSUE SUMMARY

**Problem**: Repository deployed **Vite dev environment** instead of **Next.js production app**

**Why**: PR #16 (wrong) merged, PR #17 (correct) left in draft

**Impact**: 
- ❌ Phase 2-6 components added to `/src` (Vite root) instead of `/next-app/src` (Next.js app)
- ❌ V2 copied the broken state
- ❌ Production site broken

---

## ⚡ IMMEDIATE ACTIONS (Hour 1)

### 1. Merge PR #17 to Fix Deployment
```bash
cd /Users/dame/management-git/leeha-haywooduniversal.com
git checkout main
git pull origin main
git merge origin/copilot/revert-last-commit-fix
git push origin main
```

**This fixes**: Vercel will deploy `next-app/` instead of Vite root

---

### 2. Verify Components Exist in `/src`
```bash
# Check Phase 2-6 components
find ./src -name "*.tsx" | grep -E "(Payment|Urgency|Trust|Social|Gallery|Booking|Testimonial|Bio|Membership|Course|Template|Guide|Events|Partnership|Referral|Local|Story|Chatbot|Loading)"
```

**Expected**: ~21 component files  
**If found**: Proceed to Step 3  
**If missing**: Components lost, need to rebuild from PR descriptions

---

### 3. Port Components to next-app/
```bash
# Copy components
cp -r ./src/shared/ui/components/* ./next-app/src/components/

# Verify copy
ls -la ./next-app/src/components/ | wc -l
```

**Expected**: 21+ files copied

---

## 📋 STEP-BY-STEP WORKFLOW

### Phase A: Fix Original Repository

**A1. Update Imports in next-app/** (2-3 hours)
- Search for all `@/shared/ui/components/` imports
- Replace with `@/components/`
- Update component paths in pages

**A2. Test Build** (30 min)
```bash
cd next-app
npm run build
npx tsc --noEmit
npm run lint
```

**A3. Fix Type Errors** (1-2 hours)
- Resolve import path errors
- Fix Next.js 15 App Router compatibility
- Update TypeScript configs

**A4. Deploy & Verify** (30 min)
```bash
vercel --prod
# Test all 11 pages + new component pages
```

---

### Phase B: Sync V2 Repository

**B1. Copy Missing Directories** (30 min)
```bash
cd /Users/dame/management-git

# Copy infrastructure
cp -r leeha-haywooduniversal.com/agents leeha-haywooduniversal-com-v2/
cp -r leeha-haywooduniversal.com/docs leeha-haywooduniversal-com-v2/

# Copy output subdirectories
cp -r leeha-haywooduniversal.com/output/asset-data leeha-haywooduniversal-com-v2/output/
cp -r leeha-haywooduniversal.com/output/component-architecture leeha-haywooduniversal-com-v2/output/
cp -r leeha-haywooduniversal.com/output/components leeha-haywooduniversal-com-v2/output/
cp -r leeha-haywooduniversal.com/output/content-data leeha-haywooduniversal-com-v2/output/
```

**B2. Copy Fixed Components from Original** (30 min)
```bash
# After original next-app/ is working
cp -r leeha-haywooduniversal.com/next-app/src/components/* leeha-haywooduniversal-com-v2/src/components/
```

**B3. Test V2 Build** (30 min)
```bash
cd leeha-haywooduniversal-com-v2
npm run build
npx tsc --noEmit
```

**B4. Deploy V2** (30 min)
```bash
vercel --prod
# Verify production site
```

---

## 🎯 SUCCESS CRITERIA

### Original Repository
- ✅ PR #17 merged
- ✅ Vercel deploys `next-app/` (not root)
- ✅ All 21 Phase 2-6 components in `next-app/src/components/`
- ✅ Build succeeds: 0 TypeScript errors
- ✅ Production site shows Next.js app with all features

### V2 Repository
- ✅ Has `agents/` directory
- ✅ Has `docs/` directory
- ✅ Has complete `output/` directory
- ✅ Has all Phase 2-6 components
- ✅ Build succeeds
- ✅ Production site mirrors original

---

## 📊 COMPONENT CHECKLIST

### Phase 2: Conversion (4 components)
- [ ] `PaymentOptions.tsx`
- [ ] `UrgencyTimer.tsx`
- [ ] `TrustSignals.tsx`
- [ ] `SocialProof.tsx`

### Phase 3: Booking (4 components)
- [ ] `SalonVibeGallery.tsx`
- [ ] `BookingPolicy.tsx`
- [ ] `MeltTestimonials.tsx`
- [ ] `AttorneyBio.tsx`

### Phase 4: Digital Products (5 components + 5 pages)
- [ ] `InnerCircleMembership.tsx`
- [ ] `DigitalCourseCard.tsx`
- [ ] `ProductTangibility.tsx`
- [ ] `LegalGuides.tsx`
- [ ] `DocumentTemplates.tsx`

### Phase 5: Atlanta Local (4 components)
- [ ] `AtlantaEventsCalendar.tsx`
- [ ] `CommunityPartnerships.tsx`
- [ ] `ReferralProgram.tsx`
- [ ] `LocalPresence.tsx`

### Phase 6: Technical Polish (3 components)
- [ ] `StoryNavigation.tsx`
- [ ] `ConciergeChatbot.tsx`
- [ ] `LoadingSpinner.tsx`

---

## ⚠️ POTENTIAL BLOCKERS

### Blocker 1: Components Don't Exist in `/src`
**Symptom**: `find ./src -name "*.tsx"` returns <21 files  
**Cause**: PRs may have been reverted or never actually committed  
**Solution**: Checkout PR branches individually, extract components

### Blocker 2: Next.js App Router Compatibility
**Symptom**: TypeScript errors like "use client missing" or server component errors  
**Cause**: Components built for Vite, not Next.js 15  
**Solution**: Add `"use client"` directive, refactor server-side logic

### Blocker 3: Import Path Hell
**Symptom**: Hundreds of import errors in next-app/  
**Cause**: Components reference Vite-specific paths  
**Solution**: Batch find-replace `@/shared/ui/` → `@/`, update `tsconfig.json`

---

## 🛠️ TOOLS & COMMANDS

### Find All Component Imports
```bash
cd next-app
grep -r "@/shared/ui/components" src/
```

### Batch Replace Imports (macOS)
```bash
find src/ -name "*.tsx" -exec sed -i '' 's|@/shared/ui/components|@/components|g' {} +
```

### Count TypeScript Errors
```bash
npx tsc --noEmit 2>&1 | grep "error TS" | wc -l
```

### Test Specific Page
```bash
npm run dev
# Open http://localhost:3000/[page-route]
```

---

## 📞 ESCALATION POINTS

**If components missing**: Check PR branch `copilot/phase-[2-6]` for original code

**If imports unfixable**: Consider refactoring components to Next.js best practices

**If build never succeeds**: May need to rebuild components from scratch using PR descriptions

**If v2 sync fails**: Prioritize original repo, v2 can be re-created from working state

---

## ⏱️ ESTIMATED TIME

| Phase | Task | Time |
|-------|------|------|
| **A** | Fix original repo | 6-8 hours |
| **B** | Sync v2 repo | 2-3 hours |
| **Testing** | E2E validation | 2-3 hours |
| **Total** | | **10-14 hours** |

---

**Next Agent**: Start with "Merge PR #17" then follow handoff document.

**Questions**: Reference [REPOSITORY_AUDIT_AND_HANDOFF.md](./REPOSITORY_AUDIT_AND_HANDOFF.md)

**Last Updated**: February 5, 2026
