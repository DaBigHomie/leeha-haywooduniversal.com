import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, DollarSign, Info } from 'lucide-react';

interface PaymentOptionsProps {
  totalPrice: number;
  businessName: string;
  onPaymentMethodSelect: (method: 'full' | 'afterpay' | 'klarna') => void;
}

interface PaymentPlan {
  id: 'full' | 'afterpay' | 'klarna';
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  installments?: number;
  perPayment?: number;
  badge?: string;
  popular?: boolean;
}

export function PaymentOptions({
  totalPrice,
  businessName,
  onPaymentMethodSelect
}: PaymentOptionsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const afterpayAmount = totalPrice / 4;
  const klarnaAmount = totalPrice / 4;

  const paymentPlans: PaymentPlan[] = [
    {
      id: 'full',
      name: 'Pay in Full',
      icon: DollarSign,
      description: 'Complete payment today',
      badge: 'Best Value'
    },
    {
      id: 'afterpay',
      name: 'Afterpay',
      icon: Calendar,
      description: `4 interest-free payments of $${afterpayAmount.toFixed(2)}`,
      installments: 4,
      perPayment: afterpayAmount,
      popular: true
    },
    {
      id: 'klarna',
      name: 'Klarna',
      icon: CreditCard,
      description: `4 interest-free payments of $${klarnaAmount.toFixed(2)}`,
      installments: 4,
      perPayment: klarnaAmount
    }
  ];

  const handleSelect = (method: 'full' | 'afterpay' | 'klarna') => {
    setSelectedMethod(method);
    onPaymentMethodSelect(method);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Payment Options
        </h3>
        <span className="text-sm text-gray-500">
          for {businessName}
        </span>
      </div>

      <div className="space-y-3">
        {paymentPlans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedMethod === plan.id;

          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <button
                onClick={() => handleSelect(plan.id)}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all
                  ${isSelected 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon size={20} className={isSelected ? 'text-blue-600' : 'text-gray-600'} />
                      <span className="font-semibold text-gray-900">{plan.name}</span>
                      {plan.badge && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {plan.badge}
                        </span>
                      )}
                      {plan.popular && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(showDetails === plan.id ? null : plan.id);
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                    aria-label="Show payment details"
                  >
                    <Info size={16} />
                  </button>
                </div>

                <AnimatePresence>
                  {showDetails === plan.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-gray-200"
                    >
                      {plan.id === 'full' ? (
                        <p className="text-sm text-gray-600">
                          Pay ${totalPrice.toFixed(2)} today. No additional fees or interest.
                        </p>
                      ) : (
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <strong>How it works:</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Pay ${plan.perPayment?.toFixed(2)} today</li>
                            <li>3 more payments of ${plan.perPayment?.toFixed(2)} every 2 weeks</li>
                            <li>0% interest, no hidden fees</li>
                            <li>Automatic payments from your card</li>
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>

      {selectedMethod && selectedMethod !== 'full' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-sm text-blue-900">
            <strong>Good news!</strong> You'll only pay ${paymentPlans.find(p => p.id === selectedMethod)?.perPayment?.toFixed(2)} today.
            The rest is automatically split into 3 payments.
          </p>
        </motion.div>
      )}
    </div>
  );
}
