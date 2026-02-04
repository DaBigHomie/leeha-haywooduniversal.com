# Contributing to Haywood Universal V2

Thank you for your interest in contributing to the Haywood Universal V2 project! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Agent Implementation](#agent-implementation)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

**Expected Behavior:**
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

- **Node.js:** >= 20.0.0
- **npm:** >= 10.0.0
- **Git:** Latest version
- **PostgreSQL:** 15+ (for database work)

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/leeha-haywooduniversal.com.git
   cd leeha-haywooduniversal.com
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/DaBigHomie/leeha-haywooduniversal.com.git
   ```

4. **Install dependencies**
   ```bash
   # For Next.js app
   cd nextjs-app
   npm install

   # For agents
   cd ../agents/agent-1-crawler
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

6. **Initialize database**
   ```bash
   cd nextjs-app
   npx prisma generate
   npx prisma db push
   ```

7. **Run development server**
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branch Strategy

We follow a **Git Flow** branching model:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes
- `agent/*` - Agent implementations

### Creating a Feature Branch

```bash
# Update your local develop branch
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Work on your feature...

# Commit changes
git add .
git commit -m "feat: add feature description"

# Push to your fork
git push origin feature/your-feature-name
```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples:**
```bash
feat(agent-1): add retry logic for failed requests
fix(booking): resolve date validation error
docs(readme): update installation instructions
test(api): add integration tests for booking endpoint
```

---

## Agent Implementation

### Agent Implementation Checklist

When implementing an agent, follow this checklist:

#### Phase 1: Setup (1 hour)
- [ ] Read agent specification in `docs/AGENT_PROMPTS.md`
- [ ] Create agent directory structure
- [ ] Set up package.json with dependencies
- [ ] Configure TypeScript
- [ ] Create basic file structure

#### Phase 2: Core Logic (4-8 hours)
- [ ] Implement main agent function
- [ ] Add input validation
- [ ] Implement error handling with retries
- [ ] Add progress logging
- [ ] Implement data processing logic

#### Phase 3: Testing (2-4 hours)
- [ ] Write unit tests (80%+ coverage)
- [ ] Write integration tests
- [ ] Test error scenarios
- [ ] Test with real data
- [ ] Performance testing

#### Phase 4: Documentation (1-2 hours)
- [ ] Update README with usage examples
- [ ] Add inline code comments
- [ ] Document output structure
- [ ] Create troubleshooting guide
- [ ] Update AGENT_PROMPTS.md if needed

### Agent Code Structure

```typescript
// agents/agent-X-name/src/index.ts

import { Config } from './types';

export class AgentName {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async execute(input: Input): Promise<Output> {
    // 1. Validate input
    this.validateInput(input);

    // 2. Main processing logic
    const result = await this.process(input);

    // 3. Format output
    return this.formatOutput(result);
  }

  private validateInput(input: Input): void {
    // Validation logic
  }

  private async process(input: Input): Promise<ProcessedData> {
    // Core processing
  }

  private formatOutput(data: ProcessedData): Output {
    // Output formatting
  }
}
```

### Agent Testing Requirements

Every agent must have:

1. **Unit Tests** (80%+ coverage)
   ```typescript
   // agents/agent-X-name/tests/unit/agent.test.ts
   import { describe, it, expect } from 'vitest';
   import { AgentName } from '../src';

   describe('AgentName', () => {
     it('should validate input', () => {
       // Test
     });

     it('should handle errors', () => {
       // Test
     });
   });
   ```

2. **Integration Tests**
   ```typescript
   // agents/agent-X-name/tests/integration/pipeline.test.ts
   describe('Agent Pipeline Integration', () => {
     it('should process real data', async () => {
       // Test
     });
   });
   ```

3. **Performance Tests**
   ```typescript
   describe('Performance', () => {
     it('should complete within time limit', async () => {
       // Test
     });
   });
   ```

---

## Coding Standards

### TypeScript

- **Strict mode enabled** - No `any` types
- **Explicit return types** for all functions
- **Interfaces over types** for object shapes
- **Async/await** over promises

**Good:**
```typescript
interface User {
  id: string;
  email: string;
  name: string | null;
}

async function getUser(id: string): Promise<User> {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  return user;
}
```

**Bad:**
```typescript
async function getUser(id: any) {
  return db.user.findUnique({ where: { id } });
}
```

### React/Next.js

- **Server Components by default** - Use Client Components only when needed
- **TypeScript for all components**
- **Props interfaces** for all components
- **Error boundaries** for error handling

**Good:**
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn('btn', `btn-${variant}`)}
    >
      {children}
    </button>
  );
}
```

### Code Organization

```
component/
├── ComponentName.tsx       # Component implementation
├── ComponentName.test.tsx  # Tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts               # Export
```

### Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Interfaces:** PascalCase with 'I' prefix optional (`UserData` or `IUserData`)
- **Types:** PascalCase (`UserRole`)

---

## Testing Requirements

### Coverage Requirements

- **Minimum coverage:** 80%
- **Critical paths:** 100%
- **All error scenarios:** Covered

### Test Structure

```typescript
describe('Feature Name', () => {
  describe('Scenario 1', () => {
    it('should do something', () => {
      // Arrange
      const input = createInput();

      // Act
      const result = doSomething(input);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid input', () => {
      expect(() => doSomething(null)).toThrow();
    });
  });
});
```

### Running Tests

```bash
# Unit tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Specific test file
npm test path/to/test.ts
```

---

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout your-branch
   git rebase develop
   ```

2. **Run all checks**
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```

3. **Update documentation**
   - Update README if needed
   - Add/update code comments
   - Update CHANGELOG.md

### PR Template

Use the appropriate PR template:
- **Standard PR:** `.github/PULL_REQUEST_TEMPLATE/pull_request_template.md`
- **Agent PR:** `.github/PULL_REQUEST_TEMPLATE/agent-implementation.md`

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** from at least one maintainer
3. **Testing verification** by reviewer
4. **Documentation review**
5. **Approval** and merge

### Merge Requirements

- [ ] All CI checks passing
- [ ] Code review approved
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] Branch up to date with develop

---

## Issue Guidelines

### Creating Issues

Use the appropriate issue template:
- **Agent Implementation:** `.github/ISSUE_TEMPLATE/agent-implementation.md`
- **Bug Report:** `.github/ISSUE_TEMPLATE/bug-report.md`
- **Feature Request:** `.github/ISSUE_TEMPLATE/feature-request.md`
- **Documentation:** `.github/ISSUE_TEMPLATE/documentation-update.md`

### Issue Labels

- `agent-implementation` - Agent-related work
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - High priority
- `priority: medium` - Medium priority
- `priority: low` - Low priority

### Working on Issues

1. **Comment on the issue** to let others know you're working on it
2. **Reference the issue** in your PR (e.g., "Closes #123")
3. **Update the issue** with progress or blockers

---

## Development Tips

### Debugging

```typescript
// Use proper logging
import { logger } from '@/lib/logger';

logger.info('Processing user', { userId });
logger.error('Failed to process', { error });
```

### Environment Variables

```bash
# Never commit .env files
# Always use .env.example as template
# Document all new environment variables
```

### Performance

- Use `React.memo` for expensive components
- Implement proper caching strategies
- Lazy load heavy components
- Optimize images with next/image

---

## Getting Help

### Resources

- **Documentation:** `/docs` directory
- **Agent Specs:** `docs/AGENT_PROMPTS.md`
- **Implementation Plan:** `docs/IMPLEMENTATION_PLAN.md`
- **GitHub Discussions:** For questions and discussions
- **Issue Tracker:** For bugs and feature requests

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** Questions and general discussion
- **Pull Request Comments:** Code-specific discussions

---

## Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributors page (coming soon)

Thank you for contributing! 🎉
