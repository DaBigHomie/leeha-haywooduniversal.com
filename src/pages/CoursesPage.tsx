import { DigitalCourseCard } from '../shared/ui/components/DigitalCourseCard';
import { ProductTangibility } from '../shared/ui/components/ProductTangibility';
import type { SiteConfig } from '../shared/types/config';

interface CoursesPageProps {
  config: SiteConfig;
}

export function CoursesPage({ config }: CoursesPageProps) {
  if (!config.digitalProducts?.courses) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600">Online courses will be available soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 space-y-16">
      {config.digitalProducts.courses.map((course, index) => (
        <div key={index} className="container mx-auto px-4">
          <DigitalCourseCard
            {...course}
            onEnroll={() => {
              // Navigate to checkout or handle course enrollment
              console.log('Enroll in course:', course.id);
              // In production, this would navigate to payment/checkout
              // navigate(`/checkout/course/${course.id}`);
            }}
          />
        </div>
      ))}

      {config.digitalProducts.tangibleBenefits && (
        <ProductTangibility benefits={config.digitalProducts.tangibleBenefits} />
      )}
    </div>
  );
}
