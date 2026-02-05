import React from 'react';
import { Card, type CardProps } from '../molecules/Card/Card';

export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  action?: CardProps['action'];
}

export interface ServiceGridProps {
  services: Service[];
  columns?: 1 | 2 | 3 | 4;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  columns = 3,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {services.map((service) => (
        <Card
          key={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
          action={service.action}
        />
      ))}
    </div>
  );
};
