import React from 'react';
import { Text } from '../atoms/Text/Text';
import { Button, type ButtonProps } from '../atoms/Button/Button';

export interface CardProps {
  image?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
  };
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 ${className}`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <Text variant="h4" className="mb-2">
          {title}
        </Text>
        {description && (
          <Text variant="body" className="text-neutral-600 mb-4">
            {description}
          </Text>
        )}
        {action && (
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};
