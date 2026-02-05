import React from 'react';
import { Text } from '@/components/atoms/Text/Text';
import { Button } from '@/components/atoms/Button/Button';

export interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  cta?: {
    label: string;
    onClick: () => void;
  };
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image,
  cta,
  secondaryCta,
}) => {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Text
          variant="h1"
          color={image ? 'white' : undefined}
          className="mb-6"
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            variant="h4"
            color={image ? 'white' : undefined}
            className="mb-8 font-normal"
          >
            {subtitle}
          </Text>
        )}

        {(cta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta && (
              <Button
                variant="primary"
                size="lg"
                onClick={cta.onClick}
              >
                {cta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
