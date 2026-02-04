import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Calendar, BookOpen, Video, Award, CheckCircle, Sparkles } from 'lucide-react';
import type { MembershipTier, MembershipTestimonial } from '../../types/digital-products';

interface InnerCircleMembershipProps {
  tiers: MembershipTier[];
  onSelectTier: (tier: MembershipTier) => void;
  testimonials?: MembershipTestimonial[];
}

export function InnerCircleMembership({
  tiers,
  onSelectTier,
  testimonials = []
}: InnerCircleMembershipProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  const handleSelectTier = (tier: MembershipTier) => {
    setSelectedTier(tier.id);
    onSelectTier(tier);
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-4"
        >
          <Sparkles size={20} className="text-orange-600" />
          <span className="text-sm font-semibold text-orange-900">
            Join Legal Professionals Nationwide
          </span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          The Inner Circle
        </h2>
        <p className="text-xl text-gray-600">
          Exclusive community, monthly masterclasses, and resources to elevate your legal knowledge.
          <br />
          <strong className="text-gray-900">$317/month value for as low as $49/month</strong>
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setBillingInterval('month')}
            className={`
              px-6 py-2 rounded-md font-semibold transition-all
              ${billingInterval === 'month'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={`
              px-6 py-2 rounded-md font-semibold transition-all relative
              ${billingInterval === 'year'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            Yearly
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id;
          const displayPrice = billingInterval === 'year' ? tier.price * 12 * 0.8 : tier.price;

          return (
            <motion.div
              key={tier.id}
              whileHover={{ scale: 1.03, y: -10 }}
              className={`
                relative rounded-2xl overflow-hidden shadow-xl
                ${tier.popular ? 'ring-4 ring-blue-600' : ''}
              `}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold">
                  🔥 Most Popular
                </div>
              )}

              <div className={`
                p-8 ${tier.popular ? 'pt-16' : ''}
                ${tier.bgColor} border-2 ${tier.borderColor}
              `}>
                {/* Tier Icon & Name */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-lg ${tier.color}`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                    <p className="text-sm text-gray-600">Inner Circle</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${displayPrice}
                    </span>
                    <span className="text-gray-600">
                      /{billingInterval === 'year' ? 'year' : 'mo'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-gray-500 line-through">
                      ${tier.originalValue}/mo value
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {Math.round((1 - tier.price / tier.originalValue) * 100)}% off
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tier.features.included.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {tier.features.excluded?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 opacity-40">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500 line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Bonuses */}
                {tier.bonuses && tier.bonuses.length > 0 && (
                  <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-900 mb-2">
                      🎁 Bonus Included:
                    </p>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {tier.bonuses.map((bonus, index) => (
                        <li key={index}>• {bonus}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectTier(tier)}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg transition-all
                    ${tier.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                      : `${tier.color} text-white hover:opacity-90`
                    }
                  `}
                >
                  {isSelected ? '✓ Selected' : 'Join Now'}
                </button>

                {billingInterval === 'year' && (
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Billed annually at ${(displayPrice).toFixed(2)}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Value Breakdown */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          What You Get (Worth $317/mo)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Video, title: 'Monthly Masterclass', value: '$97' },
            { icon: Users, title: 'Private Community', value: '$49' },
            { icon: BookOpen, title: 'Resource Library', value: '$39' },
            { icon: Calendar, title: 'Office Hours Access', value: '$79' },
            { icon: Award, title: 'Templates & Tools', value: '$29' },
            { icon: Crown, title: 'Exclusive Events', value: '$24' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-lg">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">Value: {item.value}/mo</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What Members Are Saying
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.tier} Member</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[
            {
              q: 'Do I get access to past masterclasses?',
              a: 'Absolutely! All Bronze+ members get lifetime access to our masterclass library (40+ hours of content).'
            },
            {
              q: 'Can I upgrade my tier later?',
              a: 'Yes! Upgrade anytime and only pay the difference. Your billing date stays the same.'
            },
            {
              q: 'Is there a free trial?',
              a: 'We offer a 7-day money-back guarantee instead. Try it risk-free for a week.'
            }
          ].map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="p-4 text-gray-700 border-x border-b border-gray-200 rounded-b-lg bg-white">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
