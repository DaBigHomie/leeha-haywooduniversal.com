import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

interface PolicySection {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  content: string;
  highlight?: string;
  variant?: 'default' | 'success' | 'warning';
}

interface BookingPolicyProps {
  /** Deposit amount in dollars. If not provided, shows 'calculated at booking' */
  depositAmount?: number;
  /** Deposit percentage (default: 50) */
  depositPercentage?: number;
  /** Cancellation window in hours (default: 48) */
  cancellationWindow?: number;
  /** Reschedule window in hours (default: 24) */
  rescheduleWindow?: number;
  /** Name of the service being booked */
  serviceName: string;
  /** Display variant: 'modal' for full page overlay, 'inline' for collapsible section */
  variant?: 'modal' | 'inline';
  /** Callback when user accepts the policy (modal variant only) */
  onAccept?: () => void;
}

export function BookingPolicy({
  depositAmount,
  depositPercentage = 50,
  cancellationWindow = 48,
  rescheduleWindow = 24,
  serviceName,
  variant = 'inline',
  onAccept
}: BookingPolicyProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  const policySections: PolicySection[] = [
    {
      icon: CreditCard,
      title: 'Appointment Investment',
      content: `We require ${depositPercentage}% deposit (${depositAmount ? `$${depositAmount}` : 'calculated at booking'}) to secure your ${serviceName} appointment. This investment ensures mutual commitment and reserves exclusive time for your needs.`,
      highlight: 'Applied to your final service total',
      variant: 'success'
    },
    {
      icon: Calendar,
      title: 'Rescheduling Flexibility',
      content: `Life happens. You may reschedule your appointment up to ${rescheduleWindow} hours in advance at no charge. We'll work with your schedule to find a new time that works for both of us.`,
      highlight: 'No fees for rescheduling with notice',
      variant: 'default'
    },
    {
      icon: Clock,
      title: 'Cancellation Policy',
      content: `If you need to cancel with ${cancellationWindow}+ hours notice, your deposit will be fully refunded or credited toward a future appointment. Cancellations within ${cancellationWindow} hours forfeit the deposit to compensate our reserved time.`,
      highlight: `${cancellationWindow}+ hours = full refund`,
      variant: 'warning'
    },
    {
      icon: Shield,
      title: 'Appointment Integrity Fee',
      content: `No-shows result in forfeiture of the full deposit. This policy ensures we can serve our committed clients and maintain the exclusive experience you expect. We'll send reminders 48 hours and 24 hours before your appointment.`,
      highlight: 'Automatic reminders included',
      variant: 'default'
    }
  ];

  const handleAccept = () => {
    setHasAccepted(true);
    onAccept?.();
  };

  const variantColors = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-orange-50 border-orange-200',
    default: 'bg-blue-50 border-blue-200'
  };

  if (variant === 'modal') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Appointment Policy
          </h2>
          <p className="text-gray-600">
            Ensuring excellence through mutual respect and commitment
          </p>
        </div>

        <div className="space-y-4">
          {policySections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-6 rounded-xl border-2
                  ${section.variant ? variantColors[section.variant] : variantColors.default}
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    p-3 rounded-lg
                    ${section.variant === 'success' ? 'bg-green-100' : ''}
                    ${section.variant === 'warning' ? 'bg-orange-100' : ''}
                    ${section.variant === 'default' ? 'bg-blue-100' : ''}
                  `}>
                    <Icon size={24} className={`
                      ${section.variant === 'success' ? 'text-green-600' : ''}
                      ${section.variant === 'warning' ? 'text-orange-600' : ''}
                      ${section.variant === 'default' ? 'text-blue-600' : ''}
                    `} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {section.content}
                    </p>
                    {section.highlight && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          {section.highlight}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {onAccept && (
          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 pt-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasAccepted}
                onChange={(e) => setHasAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                I understand and agree to the appointment policy. I commit to honoring my scheduled time or providing appropriate notice for changes.
              </span>
            </label>

            <button
              onClick={handleAccept}
              disabled={!hasAccepted}
              className="w-full mt-4 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              I Agree - Proceed to Book
            </button>
          </div>
        )}
      </div>
    );
  }

  // Inline variant (collapsible)
  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Shield size={24} className="text-blue-600" />
          <div className="text-left">
            <h3 className="font-bold text-gray-900">Appointment Policy</h3>
            <p className="text-sm text-gray-600">Click to review before booking</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <AlertCircle size={20} className="text-gray-400" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 space-y-4 border-t border-gray-200">
          {policySections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <Icon size={20} className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{section.title}</h4>
                  <p className="text-sm text-gray-700">{section.content}</p>
                  {section.highlight && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      ✓ {section.highlight}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
