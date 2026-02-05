import { DocumentTemplates } from '../shared/ui/components/DocumentTemplates';
import type { SiteConfig } from '../shared/types/config';

interface TemplatesPageProps {
  config: SiteConfig;
}

export function TemplatesPage({ config }: TemplatesPageProps) {
  if (!config.digitalProducts?.documentTemplates) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600">Document templates will be available soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <DocumentTemplates
          templates={config.digitalProducts.documentTemplates}
          onPurchase={(template) => {
            console.log('Purchase template:', template.id);
            // In production, this would navigate to payment/checkout
            // navigate(`/checkout/template/${template.id}`);
          }}
          onPreview={(template) => {
            console.log('Preview template:', template.id);
            // In production, this would show a preview modal
          }}
        />
      </div>
    </div>
  );
}

export default TemplatesPage;
