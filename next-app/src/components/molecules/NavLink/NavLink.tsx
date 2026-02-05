import React from 'react';

export interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  active = false,
  children,
  className = '',
}) => {
  const baseStyles = 'px-4 py-2 text-base font-medium transition-colors rounded-md';
  const activeStyles = active
    ? 'text-primary-600 bg-primary-50'
    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50';

  return (
    <a
      href={href}
      className={`${baseStyles} ${activeStyles} ${className}`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </a>
  );
};
