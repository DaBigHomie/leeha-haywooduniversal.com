import { InnerCircleMembership } from '../shared/ui/components/InnerCircleMembership';
import type { SiteConfig } from '../shared/types/config';

interface MembershipPageProps {
  config: SiteConfig;
}

export function MembershipPage({ config }: MembershipPageProps) {
  if (!config.digitalProducts?.membershipTiers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600">Membership options will be available soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <InnerCircleMembership
          tiers={config.digitalProducts.membershipTiers}
          onSelectTier={(tier) => {
            // Navigate to checkout or handle membership selection
            console.log('Selected tier:', tier);
            // In production, this would navigate to payment/checkout
            // navigate(`/checkout/membership/${tier.id}`);
          }}
          testimonials={config.digitalProducts.membershipTestimonials}
        />
      </div>
    </div>
  );
}
