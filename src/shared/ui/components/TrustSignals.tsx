import { Shield, Award, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrustSignal {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  badge?: string;
}

interface TrustSignalsProps {
  signals?: TrustSignal[];
  variant?: 'law' | 'fitness' | 'medical' | 'default';
}

const defaultLawSignals: TrustSignal[] = [
  {
    id: 'bar-certified',
    icon: Shield,
    title: 'Bar Certified',
    description: 'Licensed attorneys in good standing with the State Bar',
    badge: 'Verified'
  },
  {
    id: 'case-results',
    icon: Award,
    title: '$10M+ Recovered',
    description: 'Successfully recovered for our clients',
    badge: '500+ Cases'
  },
  {
    id: 'client-reviews',
    icon: Star,
    title: '4.9/5 Rating',
    description: 'Based on 200+ verified client reviews',
    badge: 'Top Rated'
  },
  {
    id: 'free-consultation',
    icon: CheckCircle,
    title: 'Free Consultation',
    description: 'No obligation, no upfront costs',
    badge: 'No Risk'
  }
];

export function TrustSignals({ 
  signals = defaultLawSignals
}: TrustSignalsProps) {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            Why Clients Trust Us
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We're committed to excellence in legal representation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    {signal.badge && (
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        {signal.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {signal.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {signal.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
