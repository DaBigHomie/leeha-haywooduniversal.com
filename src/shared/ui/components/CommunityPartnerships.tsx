import { motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import type { CommunityPartnership } from '../../types/config';

interface CommunityPartnershipsProps {
  partnerships: CommunityPartnership[];
  title?: string;
  subtitle?: string;
}

export function CommunityPartnerships({
  partnerships,
  title = 'Trusted Community Partners',
  subtitle = 'Working together to serve Atlanta'
}: CommunityPartnershipsProps) {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'church':
        return { color: 'bg-purple-100 text-purple-800', label: 'Church' };
      case 'nonprofit':
        return { color: 'bg-green-100 text-green-800', label: 'Nonprofit' };
      case 'business':
        return { color: 'bg-blue-100 text-blue-800', label: 'Business' };
      case 'civic':
        return { color: 'bg-orange-100 text-orange-800', label: 'Civic' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Partner' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
          <Check size={18} className="text-blue-800" />
          <span className="text-sm font-semibold text-blue-900">
            Community First
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Partnerships Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnerships.map((partnership, index) => {
          const badge = getCategoryBadge(partnership.category);

          return (
            <motion.div
              key={partnership.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
            >
              {/* Logo Section */}
              <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <img
                  src={partnership.logo}
                  alt={partnership.name}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Category Badge */}
                <div className={`
                  absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
                  ${badge.color}
                `}>
                  {badge.label}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {partnership.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {partnership.description}
                  </p>
                </div>

                {/* Location */}
                {partnership.location && (
                  <p className="text-sm text-gray-500">
                    📍 {partnership.location}
                  </p>
                )}

                {/* Partner Since */}
                {partnership.partnerSince && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-600" />
                    <span>Partner since {partnership.partnerSince}</span>
                  </div>
                )}

                {/* Testimonial Quote */}
                {partnership.testimonialQuote && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm italic text-gray-700 border-l-2 border-blue-400 pl-3">
                      "{partnership.testimonialQuote}"
                    </p>
                  </div>
                )}

                {/* Website Link */}
                {partnership.website && (
                  <a
                    href={partnership.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <span>Visit Website</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Partnership CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Want to Partner With Us?
        </h3>
        <p className="text-gray-600 mb-6">
          We're always looking for community organizations to collaborate with.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Contact Us About Partnerships
        </button>
      </div>
    </div>
  );
}
