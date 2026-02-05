import type { Meta, StoryObj } from '@storybook/react';
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
