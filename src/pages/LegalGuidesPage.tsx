import { LegalGuides } from '../shared/ui/components/LegalGuides';
import type { SiteConfig } from '../shared/types/config';

interface LegalGuidesPageProps {
  config: SiteConfig;
}

export function LegalGuidesPage({ config }: LegalGuidesPageProps) {
  if (!config.digitalProducts?.legalGuides) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600">Legal guides will be available soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <LegalGuides
          guides={config.digitalProducts.legalGuides}
          onPurchase={(guide) => {
            console.log('Purchase guide:', guide.id);
            // In production, this would navigate to payment/checkout
            // navigate(`/checkout/guide/${guide.id}`);
          }}
          onPreview={(guide) => {
            console.log('Preview guide:', guide.id);
            // In production, this would show a preview modal or PDF viewer
          }}
        />
      </div>
    </div>
  );
}

export default LegalGuidesPage;
