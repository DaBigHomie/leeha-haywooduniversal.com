import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Text } from '../../components/atoms/Text/Text';

export const ProjectManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/project-management" />
      <main className="flex-1">
        <Hero title="Project Management" description="Professional project management services." />
        <section className="py-16 container mx-auto px-4">
          <Text variant="h2" className="mb-8 text-center">Our Process</Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Text variant="h3" className="mb-4">1. Consultation</Text>
              <Text variant="body">Initial project assessment and planning.</Text>
            </div>
            <div className="text-center">
              <Text variant="h3" className="mb-4">2. Execution</Text>
              <Text variant="body">Professional implementation of your project.</Text>
            </div>
            <div className="text-center">
              <Text variant="h3" className="mb-4">3. Completion</Text>
              <Text variant="body">Final walkthrough and quality assurance.</Text>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
