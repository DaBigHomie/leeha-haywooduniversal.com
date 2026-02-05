import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Card } from '../../components/molecules/Card/Card';

export const RoomsForRentPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/rooms-for-rent" />
      <main className="flex-1">
        <Hero title="Rooms for Rent" description="Quality rooms in safe neighborhoods." />
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              title="Master Bedroom" 
              description="Spacious room with private bathroom. $800/month."
            />
            <Card 
              title="Single Room" 
              description="Comfortable single room. $550/month."
            />
            <Card 
              title="Studio Apartment" 
              description="Fully furnished studio. $950/month."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
