/**
 * Agent 6: Atomic Component Developer
 * Build foundational components using design tokens
 */

import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AtomicComponentDeveloper {
  private outputDir: string;

  constructor() {
    const projectRoot = path.resolve(__dirname, '../../..');
    this.outputDir = path.join(projectRoot, 'components', 'atoms');
  }

  async develop(): Promise<void> {
    await fs.ensureDir(this.outputDir);

    console.log('⚛️  Building atomic components...\n');

    // Create all atomic components
    await this.createButton();
    await this.createInput();
    await this.createElement();
    await this.createIcon();
    await this.createIndex();

    console.log('\n✅ Atomic components complete!\n');
    console.log(`📁 Output saved to: ${this.outputDir}`);
  }

  private async createButton(): Promise<void> {
    const buttonDir = path.join(this.outputDir, 'Button');
    await fs.ensureDir(buttonDir);

    // Button.tsx
    const buttonComponent = `import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={\`\${baseStyles} \${variantStyles[variant]} \${sizeStyles[size]} \${className}\`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
`;

    await fs.writeFile(path.join(buttonDir, 'Button.tsx'), buttonComponent);
    console.log('  ✅ Button component created');
  }

  private async createInput(): Promise<void> {
    const inputDir = path.join(this.outputDir, 'Input');
    await fs.ensureDir(inputDir);

    // Input.tsx
    const inputComponent = `import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1';
    const normalStyles = 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500';
    const errorStyles = 'border-error-500 focus:border-error-500 focus:ring-error-500';

    return (
      <input
        ref={ref}
        className={\`\${baseStyles} \${error ? errorStyles : normalStyles} \${className}\`}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
`;

    await fs.writeFile(path.join(inputDir, 'Input.tsx'), inputComponent);
    console.log('  ✅ Input component created');
  }

  private async createElement(): Promise<void> {
    const textDir = path.join(this.outputDir, 'Text');
    await fs.ensureDir(textDir);

    // Text.tsx
    const textComponent = `import React from 'react';

export interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small';
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  weight = 'normal',
  className = '',
  children
}) => {
  const variantStyles = {
    h1: 'text-5xl font-bold leading-tight',
    h2: 'text-4xl font-bold leading-tight',
    h3: 'text-3xl font-semibold leading-snug',
    h4: 'text-2xl font-semibold leading-snug',
    body: 'text-base leading-relaxed',
    caption: 'text-sm leading-normal',
    small: 'text-xs leading-tight'
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const Component = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';
  const colorClass = color ? \`text-\${color}\` : '';

  return React.createElement(
    Component,
    {
      className: \`\${variantStyles[variant]} \${alignStyles[align]} \${weightStyles[weight]} \${colorClass} \${className}\`.trim()
    },
    children
  );
};
`;

    await fs.writeFile(path.join(textDir, 'Text.tsx'), textComponent);
    console.log('  ✅ Text component created');
  }

  private async createIcon(): Promise<void> {
    const iconDir = path.join(this.outputDir, 'Icon');
    await fs.ensureDir(iconDir);

    // Icon.tsx
    const iconComponent = `import React from 'react';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

// Simple icon system using SVG paths
const icons: Record<string, string> = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 18L18 6M6 6l12 12',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  chevronDown: 'M19 9l-7 7-7-7',
  chevronUp: 'M5 15l7-7 7 7',
  chevronRight: 'M9 5l7 7-7 7',
  check: 'M5 13l4 4L19 7',
  facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  instagram: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z',
  twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = ''
}) => {
  const iconPath = icons[name];

  if (!iconPath) {
    console.warn(\`Icon "\${name}" not found\`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={iconPath} />
    </svg>
  );
};
`;

    await fs.writeFile(path.join(iconDir, 'Icon.tsx'), iconComponent);
    console.log('  ✅ Icon component created');
  }

  private async createIndex(): Promise<void> {
    const indexContent = `// Atomic Components
export { Button, type ButtonProps } from './Button/Button';
export { Input, type InputProps } from './Input/Input';
export { Text, type TextProps } from './Text/Text';
export { Icon, type IconProps } from './Icon/Icon';
`;

    await fs.writeFile(path.join(this.outputDir, 'index.ts'), indexContent);
    console.log('  ✅ Index file created');
  }
}

// Main execution
async function main() {
  const developer = new AtomicComponentDeveloper();

  try {
    await developer.develop();
  } catch (error) {
    console.error('❌ Atomic component development failed:', error);
    process.exit(1);
  }
}

export { AtomicComponentDeveloper };

main();
