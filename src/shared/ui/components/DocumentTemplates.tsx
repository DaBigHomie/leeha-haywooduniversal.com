import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle, Wand2 } from 'lucide-react';
import type { DocumentTemplate } from '../../types/digital-products';

interface DocumentTemplatesProps {
  templates: DocumentTemplate[];
  onPurchase: (template: DocumentTemplate) => void;
  onPreview?: (template: DocumentTemplate) => void;
}

export function DocumentTemplates({ templates, onPurchase, onPreview }: DocumentTemplatesProps) {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Document Templates</h2>
        <p className="text-lg text-gray-600">
          Professional legal templates that you can customize to fit your needs.
          Created by attorneys, approved for use, and ready to download.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-full h-full object-cover"
              />
              {template.customizable && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white rounded-full flex items-center space-x-1">
                  <Wand2 size={14} />
                  <span className="text-xs font-semibold">Customizable</span>
                </div>
              )}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                <span className="text-xs font-semibold text-gray-900">{template.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 flex-1">{template.title}</h3>
                <FileText size={24} className="text-gray-400 ml-2" />
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {template.description}
              </p>

              {/* Formats */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.formats.map((format, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded"
                  >
                    {format}
                  </span>
                ))}
              </div>

              {/* Includes */}
              <div className="space-y-2 mb-4">
                {template.includes.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-bold text-gray-900">${template.price}</span>
                  {template.previewUrl && onPreview && (
                    <button
                      onClick={() => onPreview(template)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      <Eye size={16} />
                      <span>Preview</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => onPurchase(template)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Purchase Template</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Customization Info */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-yellow-500 rounded-lg">
            <Wand2 size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Easy Customization Wizard
            </h3>
            <p className="text-gray-700 mb-4">
              All templates marked as "Customizable" come with our step-by-step wizard.
              Just answer a few questions, and we'll fill in the template for you.
              No legal expertise required!
            </p>
            <ul className="space-y-2">
              {[
                'Fill-in-the-blank guided questions',
                'Automatic formatting and clause selection',
                'Download in multiple formats (PDF, Word, Google Docs)',
                'Attorney-reviewed for accuracy'
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
