## Description

<!-- Provide a clear and concise description of your changes -->

**Type of Change:**
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 Style/UI update (no functional changes)
- [ ] ♻️ Refactoring (no functional changes, no API changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Configuration change
- [ ] 🤖 Agent implementation/update

## Related Issues

Closes #[issue-number]
Fixes #[issue-number]
Related to #[issue-number]

## Changes Made

<!-- List the main changes in this PR -->

- 
- 
- 

## Agent Context (if applicable)

**Agent Number:** [1-10]
**Agent Name:** [e.g., Site Crawler]
**Phase:** [Data Collection/Design System/Development/Quality]

## Technical Details

### Code Changes
<!-- Describe the technical implementation -->

### Database Changes
- [ ] Schema migration required
- [ ] Seed data updated
- [ ] No database changes

```prisma
// Paste schema changes if applicable
```

### API Changes
- [ ] New endpoints added
- [ ] Existing endpoints modified
- [ ] Breaking API changes
- [ ] No API changes

```typescript
// Document API changes if applicable
```

### Frontend Changes
- [ ] New components added
- [ ] Existing components modified
- [ ] Styling changes
- [ ] No frontend changes

## Testing

### Testing Checklist
- [ ] Unit tests written/updated
- [ ] Integration tests written/updated
- [ ] E2E tests written/updated
- [ ] Manual testing completed
- [ ] All tests passing locally

### Test Coverage
**Current coverage:** [XX]%
**Target coverage:** 80%+

### Manual Testing Steps
1. 
2. 
3. 

### Screenshots/Videos

<!-- Add screenshots or videos demonstrating the changes -->

## Performance Impact

- [ ] No performance impact
- [ ] Performance improvement: [describe]
- [ ] Potential performance concern: [describe]

**Benchmarks (if applicable):**
- Before: [metrics]
- After: [metrics]

## Security Considerations

- [ ] No security implications
- [ ] Security review required
- [ ] Secrets/credentials properly handled
- [ ] Input validation added/updated
- [ ] Authorization checks implemented

## Breaking Changes

- [ ] No breaking changes
- [ ] Breaking changes documented below

<!-- If breaking changes, describe migration path -->

## Documentation

- [ ] README updated
- [ ] API documentation updated
- [ ] Code comments added/updated
- [ ] CHANGELOG.md updated
- [ ] Migration guide added (if breaking changes)
- [ ] No documentation needed

## Deployment Considerations

- [ ] No special deployment steps
- [ ] Environment variables added/changed (document in `.env.example`)
- [ ] Database migration required
- [ ] Third-party service configuration needed
- [ ] Infrastructure changes required

### Deployment Steps
<!-- List any special deployment steps -->

1. 
2. 

## Checklist

### Code Quality
- [ ] Code follows project style guidelines
- [ ] Code is self-documenting or well-commented
- [ ] No console.log or debug statements left
- [ ] No commented-out code
- [ ] TypeScript types properly defined
- [ ] ESLint passes with no errors
- [ ] Prettier formatting applied

### Testing
- [ ] All existing tests still pass
- [ ] New tests added for new functionality
- [ ] Edge cases considered and tested
- [ ] Error scenarios tested

### Documentation
- [ ] User-facing changes documented
- [ ] API changes documented
- [ ] README updated if needed
- [ ] Inline code comments added where complex

### Review
- [ ] Self-reviewed all code changes
- [ ] Tested on local environment
- [ ] Tested on staging (if available)
- [ ] No merge conflicts
- [ ] Ready for review

## Reviewer Notes

<!-- Any specific areas you'd like reviewers to focus on? -->

**Focus Areas:**
- 
- 

**Questions for Reviewers:**
- 
- 

## Post-Merge Tasks

- [ ] Monitor error rates in Sentry
- [ ] Check performance metrics
- [ ] Verify deployment successful
- [ ] Update project board
- [ ] Notify relevant stakeholders

## Additional Context

<!-- Add any other context about the PR here -->

---

## Review Guidelines for Reviewers

**What to look for:**
1. ✅ Code correctness and logic
2. 🎨 Code style and readability
3. 🔒 Security implications
4. ⚡ Performance considerations
5. 📝 Documentation completeness
6. ✅ Test coverage adequacy
7. 🐛 Edge cases handling
8. ♻️ Code reusability and maintainability

**Approval Checklist:**
- [ ] Code changes make sense
- [ ] Tests are adequate
- [ ] Documentation is clear
- [ ] No obvious security issues
- [ ] No performance red flags
- [ ] Ready to merge
