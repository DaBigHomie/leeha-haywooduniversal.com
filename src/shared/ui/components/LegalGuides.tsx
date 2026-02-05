import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle } from 'lucide-react';
import type { LegalGuide } from '../../types/digital-products';

interface LegalGuidesProps {
  guides: LegalGuide[];
  onPurchase: (guide: LegalGuide) => void;
  onPreview?: (guide: LegalGuide) => void;
}

export function LegalGuides({ guides, onPurchase, onPreview }: LegalGuidesProps) {
  const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
    divorce: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
    immigration: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    business: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
    estate: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
    criminal: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Legal Guides</h2>
        <p className="text-lg text-gray-600">
          Comprehensive, easy-to-understand guides written by experienced attorneys.
          Download instantly and start understanding your legal rights today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => {
          const colors = categoryColors[guide.category] || categoryColors.business;
          
          return (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.thumbnail}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 ${colors.bg} ${colors.border} border rounded-full`}>
                  <span className={`text-xs font-semibold ${colors.text} capitalize`}>
                    {guide.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">{guide.title}</h3>
                  <FileText size={24} className="text-gray-400 ml-2" />
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {guide.description}
                </p>

                {/* Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>{guide.pages} pages</span>
                  <span className="font-semibold">PDF Download</span>
                </div>

                {/* Includes */}
                <div className="space-y-2 mb-4">
                  {guide.includes.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-bold text-gray-900">${guide.price}</span>
                    {guide.previewUrl && onPreview && (
                      <button
                        onClick={() => onPreview(guide)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-semibold"
                      >
                        <Eye size={16} />
                        <span>Preview</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onPurchase(guide)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <Download size={20} />
                    <span>Purchase & Download</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
