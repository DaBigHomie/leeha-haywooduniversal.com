import React from 'react';

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
  const classes = `${variantStyles[variant]} ${alignStyles[align]} ${className}`;

  const HeadingTag = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) 
    ? variant 
    : 'p') as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={classes} style={colorStyle}>
      {children}
    </HeadingTag>
  );
};
