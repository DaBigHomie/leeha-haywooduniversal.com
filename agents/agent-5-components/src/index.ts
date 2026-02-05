/**
 * Agent 5: Component Architect
 * Define component hierarchy and specifications
 */

import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentSpec {
  name: string;
  type: 'atom' | 'molecule' | 'organism' | 'template' | 'page';
  description: string;
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  variants?: string[];
  dependencies?: string[];
  usage: string[];
}

class ComponentArchitect {
  private contentDataDir: string;
  private outputDir: string;
  private components: ComponentSpec[] = [];

  constructor() {
    const projectRoot = path.resolve(__dirname, '../../..');
    this.contentDataDir = path.join(projectRoot, 'output', 'content-data');
    this.outputDir = path.join(projectRoot, 'output', 'component-architecture');
  }

  async architect(): Promise<void> {
    await fs.ensureDir(this.outputDir);

    console.log('🏗️  Architecting component structure...\n');

    // Define atomic components
    this.defineAtoms();
    
    // Define molecules
    this.defineMolecules();
    
    // Define organisms
    this.defineOrganisms();
    
    // Define templates
    this.defineTemplates();

    // Save outputs
    await this.saveComponentSpecs();
    await this.generateTypeScriptInterfaces();
    await this.generateComponentIndex();
    await this.generateDocumentation();

    console.log('\n✅ Component architecture complete!\n');
    console.log(`📁 Output saved to: ${this.outputDir}`);
  }

  private defineAtoms(): void {
    const atoms: ComponentSpec[] = [
      {
        name: 'Button',
        type: 'atom',
        description: 'Basic button component with variants',
        props: [
          { name: 'variant', type: "'primary' | 'secondary' | 'outline'", required: false, description: 'Visual style variant' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Button size' },
          { name: 'disabled', type: 'boolean', required: false, description: 'Disabled state' },
          { name: 'onClick', type: '() => void', required: false, description: 'Click handler' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Button content' },
        ],
        variants: ['primary', 'secondary', 'outline'],
        usage: ['CTAs', 'Form submissions', 'Navigation'],
      },
      {
        name: 'Input',
        type: 'atom',
        description: 'Text input field',
        props: [
          { name: 'type', type: "'text' | 'email' | 'password' | 'tel'", required: false, description: 'Input type' },
          { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
          { name: 'value', type: 'string', required: false, description: 'Controlled value' },
          { name: 'onChange', type: '(value: string) => void', required: false, description: 'Change handler' },
          { name: 'required', type: 'boolean', required: false, description: 'Required field' },
        ],
        usage: ['Forms', 'Search', 'User input'],
      },
      {
        name: 'Text',
        type: 'atom',
        description: 'Typography component',
        props: [
          { name: 'variant', type: "'h1' | 'h2' | 'h3' | 'body' | 'caption'", required: false, description: 'Text style' },
          { name: 'color', type: 'string', required: false, description: 'Text color' },
          { name: 'align', type: "'left' | 'center' | 'right'", required: false, description: 'Text alignment' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Text content' },
        ],
        variants: ['h1', 'h2', 'h3', 'body', 'caption'],
        usage: ['Headings', 'Body text', 'Labels'],
      },
      {
        name: 'Icon',
        type: 'atom',
        description: 'SVG icon component',
        props: [
          { name: 'name', type: 'string', required: true, description: 'Icon identifier' },
          { name: 'size', type: 'number', required: false, description: 'Icon size in pixels' },
          { name: 'color', type: 'string', required: false, description: 'Icon color' },
        ],
        usage: ['Navigation', 'Actions', 'Status indicators'],
      },
    ];

    this.components.push(...atoms);
  }

  private defineMolecules(): void {
    const molecules: ComponentSpec[] = [
      {
        name: 'FormField',
        type: 'molecule',
        description: 'Input with label and validation',
        props: [
          { name: 'label', type: 'string', required: true, description: 'Field label' },
          { name: 'error', type: 'string', required: false, description: 'Validation error message' },
          { name: 'required', type: 'boolean', required: false, description: 'Required field' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Input element' },
        ],
        dependencies: ['Text', 'Input'],
        usage: ['Contact forms', 'User registration'],
      },
      {
        name: 'Card',
        type: 'molecule',
        description: 'Content card with image and text',
        props: [
          { name: 'image', type: 'string', required: false, description: 'Card image URL' },
          { name: 'title', type: 'string', required: true, description: 'Card title' },
          { name: 'description', type: 'string', required: false, description: 'Card description' },
          { name: 'action', type: 'React.ReactNode', required: false, description: 'CTA button' },
        ],
        dependencies: ['Text', 'Button'],
        usage: ['Service cards', 'Project cards', 'Team members'],
      },
      {
        name: 'NavLink',
        type: 'molecule',
        description: 'Navigation link with active state',
        props: [
          { name: 'href', type: 'string', required: true, description: 'Link destination' },
          { name: 'active', type: 'boolean', required: false, description: 'Active state' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Link text' },
        ],
        dependencies: ['Text'],
        usage: ['Main navigation', 'Footer links'],
      },
    ];

    this.components.push(...molecules);
  }

  private defineOrganisms(): void {
    const organisms: ComponentSpec[] = [
      {
        name: 'Header',
        type: 'organism',
        description: 'Site header with navigation',
        props: [
          { name: 'logo', type: 'string', required: false, description: 'Logo image URL' },
          { name: 'navigation', type: 'NavItem[]', required: true, description: 'Navigation items' },
          { name: 'actions', type: 'React.ReactNode', required: false, description: 'Header actions' },
        ],
        dependencies: ['NavLink', 'Button'],
        usage: ['Site header'],
      },
      {
        name: 'Footer',
        type: 'organism',
        description: 'Site footer with links and info',
        props: [
          { name: 'links', type: 'NavItem[]', required: true, description: 'Footer links' },
          { name: 'social', type: 'SocialLink[]', required: false, description: 'Social media links' },
          { name: 'copyright', type: 'string', required: false, description: 'Copyright text' },
        ],
        dependencies: ['NavLink', 'Icon'],
        usage: ['Site footer'],
      },
      {
        name: 'Hero',
        type: 'organism',
        description: 'Hero section with CTA',
        props: [
          { name: 'title', type: 'string', required: true, description: 'Hero title' },
          { name: 'subtitle', type: 'string', required: false, description: 'Hero subtitle' },
          { name: 'image', type: 'string', required: false, description: 'Background image' },
          { name: 'cta', type: 'React.ReactNode', required: false, description: 'Call to action' },
        ],
        dependencies: ['Text', 'Button'],
        usage: ['Homepage', 'Landing pages'],
      },
      {
        name: 'ContactForm',
        type: 'organism',
        description: 'Multi-field contact form',
        props: [
          { name: 'onSubmit', type: '(data: ContactData) => void', required: true, description: 'Form submission handler' },
          { name: 'loading', type: 'boolean', required: false, description: 'Loading state' },
        ],
        dependencies: ['FormField', 'Button'],
        usage: ['Contact page', 'Quote requests'],
      },
      {
        name: 'ServiceGrid',
        type: 'organism',
        description: 'Grid of service cards',
        props: [
          { name: 'services', type: 'Service[]', required: true, description: 'Services to display' },
          { name: 'columns', type: 'number', required: false, description: 'Grid columns' },
        ],
        dependencies: ['Card'],
        usage: ['Services page'],
      },
    ];

    this.components.push(...organisms);
  }

  private defineTemplates(): void {
    const templates: ComponentSpec[] = [
      {
        name: 'PageLayout',
        type: 'template',
        description: 'Base page template',
        props: [
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Page content' },
          { name: 'title', type: 'string', required: false, description: 'Page title' },
        ],
        dependencies: ['Header', 'Footer'],
        usage: ['All pages'],
      },
      {
        name: 'ServicePage',
        type: 'template',
        description: 'Service detail page template',
        props: [
          { name: 'service', type: 'Service', required: true, description: 'Service data' },
        ],
        dependencies: ['PageLayout', 'Hero', 'ServiceGrid'],
        usage: ['Individual service pages'],
      },
    ];

    this.components.push(...templates);
  }

  private async saveComponentSpecs(): Promise<void> {
    await fs.writeJson(
      path.join(this.outputDir, 'component-specs.json'),
      this.components,
      { spaces: 2 }
    );
  }

  private async generateTypeScriptInterfaces(): Promise<void> {
    let types = `// Generated Component Types
// DO NOT EDIT MANUALLY

import { ReactNode } from 'react';

`;

    this.components.forEach(component => {
      types += `export interface ${component.name}Props {\n`;
      component.props.forEach(prop => {
        const required = prop.required ? '' : '?';
        types += `  /** ${prop.description} */\n`;
        types += `  ${prop.name}${required}: ${prop.type};\n`;
      });
      types += `}\n\n`;
    });

    await fs.writeFile(
      path.join(this.outputDir, 'component-types.ts'),
      types
    );
  }

  private async generateComponentIndex(): Promise<void> {
    const index = `// Component Hierarchy

## Atoms (${this.components.filter(c => c.type === 'atom').length})
${this.components.filter(c => c.type === 'atom').map(c => `- ${c.name}`).join('\n')}

## Molecules (${this.components.filter(c => c.type === 'molecule').length})
${this.components.filter(c => c.type === 'molecule').map(c => `- ${c.name}`).join('\n')}

## Organisms (${this.components.filter(c => c.type === 'organism').length})
${this.components.filter(c => c.type === 'organism').map(c => `- ${c.name}`).join('\n')}

## Templates (${this.components.filter(c => c.type === 'template').length})
${this.components.filter(c => c.type === 'template').map(c => `- ${c.name}`).join('\n')}
`;

    await fs.writeFile(
      path.join(this.outputDir, 'COMPONENT_INDEX.md'),
      index
    );
  }

  private async generateDocumentation(): Promise<void> {
    let docs = `# Component Architecture

**Generated**: ${new Date().toISOString()}

This document defines the component hierarchy using Atomic Design principles.

## Component Structure

`;

    const types = ['atom', 'molecule', 'organism', 'template'] as const;
    
    types.forEach(type => {
      const components = this.components.filter(c => c.type === type);
      docs += `\n## ${type.charAt(0).toUpperCase() + type.slice(1)}s\n\n`;
      
      components.forEach(component => {
        docs += `### ${component.name}\n\n`;
        docs += `${component.description}\n\n`;
        docs += `**Props:**\n`;
        component.props.forEach(prop => {
          const req = prop.required ? '(required)' : '(optional)';
          docs += `- \`${prop.name}\` ${req}: ${prop.description}\n`;
        });
        
        if (component.variants && component.variants.length > 0) {
          docs += `\n**Variants:** ${component.variants.join(', ')}\n`;
        }
        
        if (component.dependencies && component.dependencies.length > 0) {
          docs += `\n**Dependencies:** ${component.dependencies.join(', ')}\n`;
        }
        
        docs += `\n**Usage:** ${component.usage.join(', ')}\n\n`;
        docs += `---\n\n`;
      });
    });

    await fs.writeFile(
      path.join(this.outputDir, 'COMPONENT_ARCHITECTURE.md'),
      docs
    );
  }
}

// Main execution
async function main() {
  const architect = new ComponentArchitect();

  try {
    await architect.architect();
  } catch (error) {
    console.error('❌ Component architecture failed:', error);
    process.exit(1);
  }
}

export { ComponentArchitect };

main();
