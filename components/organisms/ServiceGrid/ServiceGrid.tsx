import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Card } from '../../molecules/Card/Card';

export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export interface ServiceGridProps {
  title?: string;
  subtitle?: string;
  services: Service[];
  columns?: 2 | 3 | 4;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  title = 'Our Services',
  subtitle,
  services,
  columns = 3,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          {subtitle && (
            <Text variant="body" weight="semibold" color="text-blue-600" className="mb-2">
              {subtitle}
            </Text>
          )}
          <Text variant="h2" weight="bold" className="mb-4">
            {title}
          </Text>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              imageAlt={service.imageAlt}
              buttonText={service.buttonText}
              onButtonClick={service.onButtonClick}
            />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <Text variant="body" color="text-gray-500">
              No services available at the moment.
            </Text>
          </div>
        )}
      </div>
    </section>
  );
};
