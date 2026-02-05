import React from 'react';

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
  const colorClass = color ? `text-${color}` : '';

  return React.createElement(
    Component,
    {
      className: `${variantStyles[variant]} ${alignStyles[align]} ${weightStyles[weight]} ${colorClass} ${className}`.trim()
    },
    children
  );
};
