import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    onClick: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  overlay?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  overlay = true,
}) => {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          )}
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {subtitle && (
          <Text
            variant="body"
            weight="semibold"
            color={backgroundImage ? 'text-blue-400' : 'text-blue-600'}
            className="mb-4"
          >
            {subtitle}
          </Text>
        )}

        <Text
          variant="h1"
          weight="bold"
          color={backgroundImage ? 'text-white' : 'text-gray-900'}
          className="mb-6 max-w-4xl mx-auto"
        >
          {title}
        </Text>

        {description && (
          <Text
            variant="body"
            color={backgroundImage ? 'text-gray-200' : 'text-gray-600'}
            className="mb-8 max-w-2xl mx-auto text-lg"
          >
            {description}
          </Text>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCta && (
            <Button
              onClick={primaryCta.onClick}
              size="lg"
              className="w-full sm:w-auto"
            >
              {primaryCta.text}
            </Button>
          )}
          {secondaryCta && (
            <Button
              variant="outline"
              onClick={secondaryCta.onClick}
              size="lg"
              className="w-full sm:w-auto"
            >
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
