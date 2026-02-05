import React from 'react';
import { Text } from '../../atoms/Text/Text';

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  active = false,
  onClick,
  className = '',
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        inline-block px-4 py-2 rounded-md transition-all duration-200
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-gray-900'}
        ${className}
      `}
      aria-current={active ? 'page' : undefined}
    >
      <Text variant="body" weight={active ? 'semibold' : 'normal'}>
        {children}
      </Text>
    </a>
  );
};
