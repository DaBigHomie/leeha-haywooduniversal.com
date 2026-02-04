import { motion } from 'framer-motion';
import type { TangibleBenefit } from '../../types/digital-products';

interface ProductTangibilityProps {
  benefits: TangibleBenefit[];
  title?: string;
  subtitle?: string;
}

export function ProductTangibility({
  benefits,
  title = 'Why This Is Different',
  subtitle = 'We go beyond digital. You get real, tangible tools for success.'
}: ProductTangibilityProps) {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                {benefit.badge && (
                  <span className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full rotate-12">
                    {benefit.badge}
                  </span>
                )}

                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={28} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
