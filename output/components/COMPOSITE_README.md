# Composite Components

**Generated**: 2026-02-05T02:42:32.880Z

## Molecules (3)

- **FormField**: Combination of atomic elements
- **Card**: Combination of atomic elements
- **NavLink**: Combination of atomic elements

## Organisms (5)

- **Header**: Complex UI section
- **Footer**: Complex UI section
- **Hero**: Complex UI section
- **ContactForm**: Complex UI section
- **ServiceGrid**: Complex UI section

## Usage

```tsx
import { Header, Hero, ServiceGrid, ContactForm } from './organisms';
import { Card, FormField } from './molecules';

function HomePage() {
  return (
    <>
      <Header
        navigation={[
          { label: 'Home', href: '/', active: true },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
        ]}
        ctaLabel="Get Started"
        ctaHref="/contact"
      />
      
      <Hero
        title="Welcome to Our Site"
        subtitle="Professional services for your needs"
        cta={{ label: 'Learn More', onClick: () => {} }}
      />
      
      <ServiceGrid
        services={[
          { id: '1', title: 'Service 1', description: 'Description' },
          { id: '2', title: 'Service 2', description: 'Description' },
        ]}
      />
    </>
  );
}
```
