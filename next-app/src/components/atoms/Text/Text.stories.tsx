import type { Meta, StoryObj } from '@storybook/react';
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
