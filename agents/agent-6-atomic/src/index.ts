/**
 * Agent 6: Atomic Component Developer
 * Build foundational components: Button, Input, Text, Icon
 */

import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentTemplate {
  name: string;
  code: string;
  test?: string;
  story?: string;
}

class AtomicComponentBuilder {
  private outputDir: string;
  private componentsDir: string;

  constructor() {
    const projectRoot = path.resolve(__dirname, '../../..');
    this.outputDir = path.join(projectRoot, 'output', 'components');
    this.componentsDir = path.join(this.outputDir, 'atoms');
  }

  async build(): Promise<void> {
    await fs.ensureDir(this.componentsDir);

    console.log('⚛️  Building atomic components...\n');

    const components: ComponentTemplate[] = [
      this.buildButton(),
      this.buildInput(),
      this.buildText(),
      this.buildIcon(),
    ];

    // Create component files
    for (const component of components) {
      await this.createComponent(component);
    }

    // Create index file
    await this.createIndexFile(components);

    // Create README
    await this.createReadme(components);

    console.log('\n✅ Atomic components built!\n');
    console.log(`📁 Output saved to: ${this.componentsDir}`);
  }

  private buildButton(): ComponentTemplate {
    const code = `import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  const classes = \`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`;

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
`;

    const story = `import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
`;

    return { name: 'Button', code, story };
  }

  private buildInput(): ComponentTemplate {
    const code = `import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\\s+/g, '-');

  const baseStyles = 'px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';
  const errorStyles = error ? 'border-error-500' : 'border-neutral-300';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const classes = \`\${baseStyles} \${errorStyles} \${widthStyles} \${className}\`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={classes}
        aria-invalid={!!error}
        aria-describedby={error ? \`\${inputId}-error\` : undefined}
        {...props}
      />
      {error && (
        <p id={\`\${inputId}-error\`} className="mt-1 text-sm text-error-600">
          {error}
        </p>
      )}
    </div>
  );
};
`;

    const story = `import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    fullWidth: true,
  },
};
`;

    return { name: 'Input', code, story };
  }

  private buildText(): ComponentTemplate {
    const code = `import React from 'react';

export interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  className = '',
  children,
}) => {
  const variantStyles = {
    h1: 'text-5xl font-bold leading-tight',
    h2: 'text-4xl font-bold leading-tight',
    h3: 'text-3xl font-semibold leading-snug',
    h4: 'text-2xl font-semibold leading-snug',
    h5: 'text-xl font-medium leading-normal',
    h6: 'text-lg font-medium leading-normal',
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-neutral-600 leading-normal',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const colorStyle = color ? { color } : {};
  const classes = \`\${variantStyles[variant]} \${alignStyles[align]} \${className}\`;

  const HeadingTag = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) 
    ? variant 
    : 'p') as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={classes} style={colorStyle}>
      {children}
    </HeadingTag>
  );
};
`;

    const story = `import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text with normal styling.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is a caption with smaller, muted text.',
  },
};

export const CenterAligned: Story = {
  args: {
    variant: 'h2',
    align: 'center',
    children: 'Center Aligned Text',
  },
};

export const CustomColor: Story = {
  args: {
    variant: 'h3',
    color: '#2563eb',
    children: 'Custom Colored Text',
  },
};
`;

    return { name: 'Text', code, story };
  }

  private buildIcon(): ComponentTemplate {
    const code = `import React from 'react';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

// Common SVG icons
const icons: Record<string, React.FC<{ size: number; color: string; className: string }>> = {
  check: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  x: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  menu: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  chevronDown: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  chevronRight: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  mail: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  home: ({ size, color, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(\`Icon "\${name}" not found\`);
    return null;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

// Export available icon names
export const iconNames = Object.keys(icons);
`;

    const story = `import type { Meta, StoryObj } from '@storybook/react';
import { Icon, iconNames } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    size: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Check: Story = {
  args: {
    name: 'check',
    size: 24,
  },
};

export const Menu: Story = {
  args: {
    name: 'menu',
    size: 24,
  },
};

export const Mail: Story = {
  args: {
    name: 'mail',
    size: 24,
  },
};

export const Phone: Story = {
  args: {
    name: 'phone',
    size: 24,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {iconNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon name={name} size={32} />
          <span className="text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
};
`;

    return { name: 'Icon', code, story };
  }

  private async createComponent(component: ComponentTemplate): Promise<void> {
    const componentDir = path.join(this.componentsDir, component.name);
    await fs.ensureDir(componentDir);

    // Write component file
    await fs.writeFile(
      path.join(componentDir, `${component.name}.tsx`),
      component.code
    );

    // Write story file if provided
    if (component.story) {
      await fs.writeFile(
        path.join(componentDir, `${component.name}.stories.tsx`),
        component.story
      );
    }

    console.log(`✅ Created ${component.name}`);
  }

  private async createIndexFile(components: ComponentTemplate[]): Promise<void> {
    const exports = components
      .map(c => `export * from './${c.name}/${c.name}';`)
      .join('\n');

    await fs.writeFile(
      path.join(this.componentsDir, 'index.ts'),
      exports
    );
  }

  private async createReadme(components: ComponentTemplate[]): Promise<void> {
    const readme = `# Atomic Components

**Generated**: ${new Date().toISOString()}

## Components

${components.map(c => `- **${c.name}**: Foundational UI element`).join('\n')}

## Usage

\`\`\`tsx
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
\`\`\`

## Storybook

Each component has Storybook stories for visual testing:

\`\`\`bash
npm run storybook
\`\`\`

## Testing

Run component tests:

\`\`\`bash
npm test
\`\`\`
`;

    await fs.writeFile(
      path.join(this.componentsDir, 'README.md'),
      readme
    );
  }
}

// Main execution
async function main() {
  const builder = new AtomicComponentBuilder();

  try {
    await builder.build();
  } catch (error) {
    console.error('❌ Atomic component build failed:', error);
    process.exit(1);
  }
}

export { AtomicComponentBuilder };

main();
