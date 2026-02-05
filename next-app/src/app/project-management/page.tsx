import ProjectManagementPage from '@/components/pages/ProjectManagementPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Construction Project Management | Haywood Universal',
  description: 'Professional construction project management services for residential and commercial projects in Metro Atlanta. Expert oversight from planning to completion.',
  keywords: 'construction project management atlanta, building project manager, construction oversight atlanta, residential construction management, commercial construction atlanta',
  openGraph: {
    title: 'Construction Project Management | Haywood Universal',
    description: 'Professional construction project management services in Metro Atlanta',
    type: 'website',
  },
};

export default function ProjectManagement() {
  return <ProjectManagementPage />;
}
