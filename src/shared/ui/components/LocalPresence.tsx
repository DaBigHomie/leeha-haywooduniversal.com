import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Building2, ExternalLink } from 'lucide-react';
import type { LocalPresenceInfo } from '../../types/config';

interface LocalPresenceProps {
  localPresence: LocalPresenceInfo;
  title?: string;
  subtitle?: string;
}

export function LocalPresence({
  localPresence,
  title = 'Our Atlanta Presence',
  subtitle = 'Serving the Metro Atlanta community with convenient locations'
}: LocalPresenceProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100 rounded-full mb-4">
          <MapPin size={18} className="text-red-800" />
          <span className="text-sm font-semibold text-red-900">
            Local & Accessible
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Office Locations */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Office Locations
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {localPresence.offices.map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 size={24} className="text-blue-600" />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {office.name}
                    </h4>
                    <p className="text-sm text-gray-500">{office.neighborhood}</p>
                  </div>

                  <div className="space-y-2">
                    {/* Address */}
                    <div className="flex items-start space-x-2">
                      <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{office.address}</p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-2">
                      <Phone size={18} className="text-gray-400 flex-shrink-0" />
                      <a 
                        href={`tel:${office.phone}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {office.phone}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{office.hours}</p>
                    </div>
                  </div>

                  {/* Map Link */}
                  {office.mapUrl && (
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-3"
                    >
                      <span>Get Directions</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Court Information */}
      {localPresence.courtInfo && localPresence.courtInfo.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Courts We Serve
          </h3>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              {localPresence.courtInfo.map((court, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded">
                      <Building2 size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{court.name}</h4>
                      <p className="text-sm text-gray-500">{court.jurisdiction}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{court.description}</p>

                  <div className="flex items-start space-x-2 text-sm text-gray-700">
                    <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <p>{court.address}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Experienced in navigating local court procedures and building relationships with court personnel
            </p>
          </div>
        </div>
      )}

      {/* Local Expertise CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">
          Why Local Matters
        </h3>
        <p className="text-lg mb-6 text-blue-100">
          Our deep knowledge of Atlanta's legal landscape gives you a home-court advantage
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-left">
          {[
            {
              title: 'Local Relationships',
              description: 'Established connections with judges, clerks, and opposing counsel'
            },
            {
              title: 'Court Familiarity',
              description: 'Expert knowledge of local court procedures and preferences'
            },
            {
              title: 'Community Insight',
              description: 'Understanding of Atlanta neighborhoods, culture, and values'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-blue-100">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
