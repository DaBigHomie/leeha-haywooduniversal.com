# Atomic Components

**Generated**: 2026-02-05T02:12:56.578Z

## Components

- **Button**: Foundational UI element
- **Input**: Foundational UI element
- **Text**: Foundational UI element
- **Icon**: Foundational UI element

## Usage

```tsx
import { Button, Input, Text, Icon } from './atoms';

function MyComponent() {
  return (
    <div>
      <Text variant="h2">Welcome</Text>
      <Input label="Email" type="email" />
      <Button variant="primary">
        <Icon name="check" size={16} />
        Submit
      </Button>
    </div>
  );
}
```

## Storybook

Each component has Storybook stories for visual testing:

```bash
npm run storybook
```

## Testing

Run component tests:

```bash
npm test
```
