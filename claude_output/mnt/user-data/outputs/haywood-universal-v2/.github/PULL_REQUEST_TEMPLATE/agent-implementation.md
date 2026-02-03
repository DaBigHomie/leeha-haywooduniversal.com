## Agent Implementation PR

**Agent Number:** [1-10]
**Agent Name:** [e.g., Site Crawler, Content Extractor]

## Implementation Summary

<!-- Brief description of what this agent does -->

## Agent Specifications

### Input Requirements
```typescript
interface AgentInput {
  // Document input structure
}
```

### Output Format
```typescript
interface AgentOutput {
  // Document output structure
}
```

### Dependencies
**Required Agents:**
- [ ] Agent #X - [Name] (must complete first)

**External Dependencies:**
- [ ] [Library name] - [Version]

## Implementation Checklist

### Core Functionality
- [ ] Main agent logic implemented
- [ ] Input validation
- [ ] Error handling with retries
- [ ] Progress logging
- [ ] Output formatting
- [ ] Data persistence

### Configuration
- [ ] Configuration file created
- [ ] Environment variables documented
- [ ] Default values set appropriately

### Error Handling
- [ ] Network errors handled
- [ ] Invalid input handled
- [ ] Timeout handling
- [ ] Graceful degradation
- [ ] Error logging

### Performance
- [ ] Meets execution time target: [Target]
- [ ] Memory usage within limits: [Limit]
- [ ] Handles large datasets
- [ ] Implements caching where beneficial

## Testing

### Unit Tests
```bash
npm run test:unit
```
- [ ] All core functions tested
- [ ] Coverage > 80%
- [ ] Edge cases covered
- [ ] Error scenarios tested

### Integration Tests
```bash
npm run test:integration
```
- [ ] End-to-end flow tested
- [ ] Integration with dependent agents tested
- [ ] Output format validated

### Manual Testing
**Test Cases Executed:**
1. [ ] Basic functionality test
2. [ ] Large dataset test
3. [ ] Error recovery test
4. [ ] Performance test

**Test Results:**
- Execution time: [X hours/minutes]
- Memory usage: [X GB]
- Success rate: [X%]
- Errors encountered: [List]

## Output Validation

### Sample Output
```json
{
  // Paste sample output
}
```

### Output Verification
- [ ] Output matches specification
- [ ] All required fields present
- [ ] Data types correct
- [ ] Values within expected ranges
- [ ] No data corruption

## Documentation

- [ ] Agent README created/updated
- [ ] Usage examples provided
- [ ] API documentation complete
- [ ] Troubleshooting guide added
- [ ] Output format documented
- [ ] AGENT_PROMPTS.md updated

### Usage Example
```typescript
import { AgentName } from './agents/agent-X';

// Example usage
const agent = new AgentName(config);
const result = await agent.execute(input);
console.log(result);
```

## Performance Metrics

**Benchmarks:**
- Average execution time: [X minutes]
- Peak memory usage: [X GB]
- Success rate: [X%]
- Pages/items processed: [X]

**Comparison to Target:**
- [ ] Execution time meets target
- [ ] Memory usage within limits
- [ ] Success rate acceptable

## Integration Points

### Upstream Dependencies
**Data consumed from:**
- [ ] Agent #X output: [Description]

### Downstream Consumers
**Data provided to:**
- [ ] Agent #Y: [Description]

### File System
**Input directories:**
- `/input/path`

**Output directories:**
- `/output/path`

## Configuration

### Environment Variables
```bash
# Required
AGENT_X_API_KEY=xxx
AGENT_X_BASE_URL=xxx

# Optional
AGENT_X_TIMEOUT=30000
AGENT_X_MAX_RETRIES=3
```

### Configuration File
```json
{
  "timeout": 30000,
  "maxRetries": 3,
  "concurrency": 3
}
```

## Known Issues & Limitations

**Known Issues:**
- [ ] Issue #1: [Description]

**Limitations:**
- Limitation #1: [Description]
- Limitation #2: [Description]

**Future Improvements:**
- Enhancement #1: [Description]
- Enhancement #2: [Description]

## Deployment Considerations

- [ ] No special deployment steps
- [ ] Environment variables configured
- [ ] Output directories created
- [ ] Cron jobs scheduled (if applicable)

## Success Criteria Verification

- [ ] Agent executes without errors
- [ ] Output format matches specification
- [ ] Performance targets met
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Integration with pipeline works

## Reviewer Focus Areas

**Please pay special attention to:**
1. Error handling logic
2. Memory usage patterns
3. Output format consistency
4. Edge case handling
5. Performance optimization opportunities

**Specific questions:**
- 
- 

## Related PRs

- Depends on: #[PR-number]
- Related to: #[PR-number]

## Post-Merge Verification

- [ ] Run agent on staging data
- [ ] Verify output with downstream agents
- [ ] Monitor execution time
- [ ] Check error logs
- [ ] Update project board

---

## Agent Pipeline Status

**Overall Progress:** [X/10 agents complete]

| Agent | Status | Assignee |
|-------|--------|----------|
| Agent 1 | ✅ Complete | @user |
| Agent 2 | 🚧 In Progress | @user |
| Agent 3 | ⏳ Pending | - |
| ... | ... | ... |
