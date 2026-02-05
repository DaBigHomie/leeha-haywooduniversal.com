export interface MembershipTier {
  id: 'bronze' | 'silver' | 'gold';
  name: string;
  price: number;
  originalValue: number;
  interval: 'month' | 'year';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  popular?: boolean;
  features: {
    included: string[];
    excluded?: string[];
  };
  bonuses?: string[];
}

export interface MembershipTestimonial {
  name: string;
  photo: string;
  quote: string;
  tier: string;
}

export interface CourseModule {
  id: number;
  title: string;
  lessons: number;
  duration: string;
  isLocked?: boolean;
}

export interface CourseIncludes {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
}

export interface DigitalCourse {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  previewVideoUrl?: string;
  instructor: {
    name: string;
    photo: string;
    credentials: string;
  };
  modules: CourseModule[];
  includes: CourseIncludes[];
  rating?: number;
  totalStudents?: number;
  totalLessons: number;
  totalDuration: string;
  certificate?: boolean;
}

export interface TangibleBenefit {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  badge?: string;
}

export interface LegalGuide {
  id: string;
  title: string;
  description: string;
  category: 'divorce' | 'immigration' | 'business' | 'estate' | 'criminal';
  price: number;
  pages: number;
  downloadUrl?: string;
  previewUrl?: string;
  thumbnail: string;
  includes: string[];
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  formats: string[];
  thumbnail: string;
  previewUrl?: string;
  customizable: boolean;
  includes: string[];
}

export interface DigitalProductsConfig {
  membershipTiers?: MembershipTier[];
  membershipTestimonials?: MembershipTestimonial[];
  courses?: DigitalCourse[];
  tangibleBenefits?: TangibleBenefit[];
  legalGuides?: LegalGuide[];
  documentTemplates?: DocumentTemplate[];
}
