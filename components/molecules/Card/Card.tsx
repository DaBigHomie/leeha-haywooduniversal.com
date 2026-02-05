import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  buttonText,
  onButtonClick,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        <Text variant="h3" className="mb-3">
          {title}
        </Text>
        
        <Text variant="body" color="text-gray-600" className="mb-4">
          {description}
        </Text>
        
        {buttonText && (
          <Button
            variant="outline"
            size="sm"
            onClick={onButtonClick}
            className="w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
