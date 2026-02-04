# GitHub Workflows & Templates

This directory contains all GitHub Actions workflows, issue templates, and pull request templates for the Haywood Universal V2 project.

## 📂 Directory Structure

```
.github/
├── workflows/                    # GitHub Actions workflows
│   ├── ci.yml                   # Continuous Integration
│   ├── cd.yml                   # Continuous Deployment
│   └── agent-pipeline.yml       # Agent execution workflow
│
├── ISSUE_TEMPLATE/              # Issue templates
│   ├── agent-implementation.md  # For agent development
│   ├── bug-report.md           # For bug reports
│   ├── feature-request.md      # For feature requests
│   ├── documentation-update.md # For docs updates
│   └── config.yml              # Template configuration
│
└── PULL_REQUEST_TEMPLATE/      # PR templates
    ├── pull_request_template.md # Standard PR template
    └── agent-implementation.md  # Agent-specific PR template
```

---

## 🔄 GitHub Actions Workflows

### 1. CI Pipeline (`ci.yml`)

**Trigger:** Push to `main`/`develop`, Pull Requests

**Jobs:**
- **Lint & Type Check** - ESLint, Prettier, TypeScript
- **Unit Tests** - Vitest with coverage
- **Build Verification** - Next.js build + bundle size check
- **E2E Tests** - Playwright tests
- **Agent Tests** - Test all agents
- **Security Scan** - npm audit + Snyk
- **Accessibility** - Pa11y tests
- **Lighthouse** - Performance audits
- **Database Tests** - Prisma integration tests

**Usage:**
```bash
# Automatically runs on push and PR
# View results in GitHub Actions tab
```

**Success Criteria:**
- All linting passes
- Test coverage > 80%
- Build succeeds
- Bundle size < 150MB
- No security vulnerabilities
- Lighthouse score > 90

---

### 2. CD Pipeline (`cd.yml`)

**Trigger:** Push to `main`, Manual workflow dispatch

**Jobs:**
- **Pre-deployment Checks** - Verify all tests pass
- **Deploy to Staging** - Vercel staging deployment
- **Smoke Tests (Staging)** - Health checks and smoke tests
- **Deploy to Production** - Vercel production deployment
- **Smoke Tests (Production)** - Production verification
- **Database Migration** - Run Prisma migrations
- **Post-deployment Monitoring** - Check metrics and errors

**Manual Trigger:**
```bash
# Go to Actions tab > CD Pipeline > Run workflow
# Select environment: staging or production
```

**Automatic Trigger:**
```bash
# Automatically deploys on push to main branch
```

**Environments:**
- **Staging:** `https://staging.haywooduniversal.com`
- **Production:** `https://haywooduniversal.com`

**Required Secrets:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `DATABASE_URL`
- `SLACK_WEBHOOK_URL` (optional)

---

### 3. Agent Pipeline (`agent-pipeline.yml`)

**Trigger:** Manual workflow dispatch

**Jobs:**
- **Agent 1: Site Crawler** - Crawl target website
- **Agent 2: Content Extractor** - Extract content from crawled data
- **Agent 3: Asset Manager** - Download and optimize assets
- **Validation** - Verify all outputs
- **Notification** - Send results to Slack

**Usage:**
```bash
# Go to Actions tab > Agent Pipeline Execution > Run workflow

# Options:
# - agent_number: 1, 2, 3, or 'all'
# - target_url: Website to crawl (default: haywooduniversal.com)
```

**Example Scenarios:**

1. **Run Single Agent:**
   - Select agent_number: `1`
   - Runs only Agent 1 (Site Crawler)

2. **Run All Agents:**
   - Select agent_number: `all`
   - Runs Agents 1, 2, and 3 in sequence

3. **Custom Target:**
   - agent_number: `1`
   - target_url: `https://example.com`

**Output Artifacts:**
- `agent-1-output/` - Site structure, screenshots
- `agent-2-output/` - Content inventory
- `agent-3-output/` - Optimized assets

---

## 📝 Issue Templates

### 1. Agent Implementation (`agent-implementation.md`)

**Use when:** Implementing or enhancing one of the 10 agents

**Includes:**
- Agent objectives and specifications
- Acceptance criteria
- Implementation checklist
- Testing strategy
- Documentation requirements

**Label:** `agent-implementation`, `enhancement`

---

### 2. Bug Report (`bug-report.md`)

**Use when:** Reporting a bug or unexpected behavior

**Includes:**
- Bug description
- Affected component selection
- Reproduction steps
- Expected vs. actual behavior
- Environment details
- Screenshots

**Label:** `bug`, `needs-triage`

---

### 3. Feature Request (`feature-request.md`)

**Use when:** Suggesting new features or enhancements

**Includes:**
- Feature description
- Problem statement and user story
- Proposed solution
- Technical considerations
- Success metrics
- Timeline estimate

**Label:** `enhancement`, `needs-discussion`

---

### 4. Documentation Update (`documentation-update.md`)

**Use when:** Improving or fixing documentation

**Includes:**
- Documentation location
- Problem description
- Proposed changes
- Impact assessment
- Type of change

**Label:** `documentation`

---

## 🔀 Pull Request Templates

### 1. Standard PR (`pull_request_template.md`)

**Use for:** Regular pull requests

**Includes:**
- Description of changes
- Type of change selection
- Related issues
- Technical details
- Testing checklist
- Performance impact
- Security considerations
- Documentation updates
- Deployment considerations

**Auto-fills when:** Creating any PR

---

### 2. Agent Implementation PR (`agent-implementation.md`)

**Use for:** Agent-specific pull requests

**Includes:**
- Agent specifications
- Implementation checklist
- Core functionality verification
- Error handling details
- Performance metrics
- Integration points
- Output validation
- Known issues

**How to use:**
```markdown
Add to PR description:
?template=agent-implementation.md
```

---

## 🎯 Workflow Examples

### Example 1: New Feature Development

```bash
# 1. Create feature issue using feature-request.md template
# 2. Create feature branch: git checkout -b feature/new-feature
# 3. Implement feature
# 4. Create PR using standard template
# 5. CI runs automatically
# 6. After approval, merge to develop
# 7. CD deploys to staging
# 8. After verification, merge to main
# 9. CD deploys to production
```

### Example 2: Agent Implementation

```bash
# 1. Create agent issue using agent-implementation.md
# 2. Create agent branch: git checkout -b agent/agent-4-design
# 3. Implement agent
# 4. Run agent workflow: Actions > Agent Pipeline > agent_number: 4
# 5. Create PR using agent-implementation.md template
# 6. CI runs agent tests
# 7. After approval, merge
```

### Example 3: Bug Fix

```bash
# 1. Create bug report using bug-report.md
# 2. Create bugfix branch: git checkout -b bugfix/fix-booking
# 3. Fix bug
# 4. Add tests
# 5. Create PR using standard template
# 6. CI runs all tests
# 7. After approval, merge
# 8. Hotfix deployed if urgent
```

---

## 🔐 Required Secrets

Configure these in **Settings > Secrets and variables > Actions**:

### Vercel Deployment
```bash
VERCEL_TOKEN          # Vercel API token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
```

### Database
```bash
DATABASE_URL          # PostgreSQL connection string
```

### External Services
```bash
SNYK_TOKEN           # Snyk security scanning
SLACK_WEBHOOK_URL    # Slack notifications (optional)
SENTRY_DSN          # Error tracking
STRIPE_SECRET_KEY    # Payment processing
RESEND_API_KEY      # Email service
```

### Authentication
```bash
NEXTAUTH_SECRET      # NextAuth.js secret
GOOGLE_CLIENT_ID     # Google OAuth
GOOGLE_CLIENT_SECRET # Google OAuth secret
```

---

## 📊 Monitoring & Notifications

### Slack Notifications

The workflows send notifications to Slack on:
- ✅ Successful deployments
- ❌ Failed deployments
- 🔄 Agent pipeline completion

**Setup:**
1. Create Slack webhook: https://api.slack.com/messaging/webhooks
2. Add `SLACK_WEBHOOK_URL` to secrets
3. Notifications automatically sent

### GitHub Notifications

- **PR comments** for staging deployments
- **Commit comments** for production deployments
- **Step summaries** for pipeline results

---

## 🛠️ Customization

### Adding New Workflow

1. Create `.github/workflows/your-workflow.yml`
2. Define triggers and jobs
3. Add required secrets
4. Test with manual trigger first
5. Document in this file

### Adding New Template

1. Create template in appropriate directory
2. Use YAML front matter for metadata
3. Test template on GitHub
4. Update this documentation

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Issue Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)
- [Vercel CLI](https://vercel.com/docs/cli)

---

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- How to use these templates
- Workflow best practices
- Development guidelines
