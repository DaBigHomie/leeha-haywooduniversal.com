# Phase 2: High-Intent Conversion Triggers Implementation

**Agent Type**: Conversion Optimization Engineer + UX Psychologist  
**Estimated Effort**: 3 business days  
**Priority**: HIGH  
**Target Demographic**: Professional services clients (law, fitness, medical, real estate)  
**Dependencies**: Phase 1 completed (base variant system)

---

## Objective: Psychological Conversion Optimization

Transform passive browsers into high-intent leads through:
- **Investment Options** (Afterpay/Klarna psychology)
- **Hover Video Previews** (6-second product/service demos)
- **Urgency Timers** (delivery/appointment cutoffs)
- **Educational Modals** (build trust through expertise)

**Key Insight**: Professional service buyers need:
1. **Proof of value** before committing
2. **Payment flexibility** to justify premium pricing
3. **Time pressure** to overcome decision paralysis
4. **Education** to feel confident in their choice

---

## Task 1: InvestmentOptions Component

### Cultural Context
Modern professionals (25-45) expect:
- "Buy now, pay later" for services $200+
- Transparent pricing without surprises
- Premium positioning (not "cheap")
- Financial flexibility = accessibility

### Implementation

**Create File**: `src/shared/ui/components/InvestmentOptions.tsx`

```typescript
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, DollarSign, Info } from 'lucide-react';

interface InvestmentOptionsProps {
  totalPrice: number;
  serviceName: string;
  onPaymentMethodSelect: (method: 'full' | 'afterpay' | 'klarna') => void;
}

interface PaymentPlan {
  id: 'full' | 'afterpay' | 'klarna';
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  description: string;
  installments?: number;
  perPayment?: number;
  badge?: string;
  popular?: boolean;
}

export function InvestmentOptions({
  totalPrice,
  serviceName,
  onPaymentMethodSelect
}: InvestmentOptionsProps) {
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
          Investment Options
        </h3>
        <span className="text-sm text-gray-500">
          for {serviceName}
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
```

**Usage Example** (in ContactPage or ServiceDetailPage):

```typescript
import { InvestmentOptions } from '@/shared/ui/components/InvestmentOptions';

// Inside your component
const [paymentMethod, setPaymentMethod] = useState<'full' | 'afterpay' | 'klarna'>('full');

<InvestmentOptions
  totalPrice={599}
  serviceName="Legal Consultation"
  onPaymentMethodSelect={setPaymentMethod}
/>
```

### Success Criteria
- ✅ 60%+ users select Afterpay/Klarna (not full payment)
- ✅ Info tooltips reduce payment anxiety
- ✅ Visual feedback on selection (border color change)
- ✅ Mobile-optimized touch targets (min 44px)

---

## Task 2: HoverVideoCard Component

### Cultural Context
**Video > Static Images** for trust building:
- 6-second "proof" videos (before/after, office tour, meet the team)
- Auto-play on hover (desktop) or tap (mobile)
- Muted by default (respectful UX)
- Loop seamlessly

### Implementation

**Create File**: `src/shared/ui/components/HoverVideoCard.tsx`

```typescript
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface HoverVideoCardProps {
  title: string;
  description: string;
  posterImage: string;
  videoUrl: string;
  ctaText?: string;
  onCtaClick?: () => void;
  autoPlayOnHover?: boolean;
}

export function HoverVideoCard({
  title,
  description,
  posterImage,
  videoUrl,
  ctaText = 'Learn More',
  onCtaClick,
  autoPlayOnHover = true
}: HoverVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (autoPlayOnHover && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlayOnHover && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setShowPlayButton(true);
    }
  };

  const handleClick = () => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-64 object-cover"
        poster={posterImage}
        loop
        muted={isMuted}
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Play Button Overlay */}
      {showPlayButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
            <Play size={32} className="text-gray-900 ml-1" />
          </div>
        </motion.div>
      )}

      {/* Mute Toggle (shows when playing) */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-200 mb-4">{description}</p>
        {onCtaClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCtaClick();
            }}
            className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </button>
        )}
      </div>

      {/* Duration indicator */}
      <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-xs font-medium">
        6s preview
      </div>
    </motion.div>
  );
}
```

**Usage Example** (in ServicesPage or GalleryPage):

```typescript
import { HoverVideoCard } from '@/shared/ui/components/HoverVideoCard';

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <HoverVideoCard
    title="Law Firm Office Tour"
    description="See our downtown Atlanta office & meet the team"
    posterImage="/images/office-poster.jpg"
    videoUrl="/videos/office-tour-6s.mp4"
    ctaText="Schedule Consultation"
    onCtaClick={() => navigate('/contact')}
  />
  
  <HoverVideoCard
    title="Before & After: PI Case"
    description="Client testimonial from recent settlement"
    posterImage="/images/testimonial-poster.jpg"
    videoUrl="/videos/testimonial-6s.mp4"
    ctaText="View Case Studies"
    onCtaClick={() => navigate('/results')}
  />
</div>
```

### Success Criteria
- ✅ Auto-plays on hover within 200ms
- ✅ Loops seamlessly (no flash/jump)
- ✅ Muted by default (user can unmute)
- ✅ Mobile tap to play/pause
- ✅ 6-second max duration (attention span optimization)

---

## Task 3: DeliveryCountdown Component

### Cultural Context
**Urgency = Action** for high-intent buyers:
- "Order by 2PM for same-day consultation callback"
- "Book by EOD for this week's availability"
- Real-time countdown (not fake scarcity)
- Respectful language (not aggressive)

### Implementation

**Create File**: `src/shared/ui/components/DeliveryCountdown.tsx`

```typescript
import { useState, useEffect } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeliveryCountdownProps {
  cutoffHour: number; // 24-hour format (e.g., 14 for 2PM)
  cutoffMinute?: number;
  timezone?: string;
  message: string;
  completedMessage: string;
  variant?: 'default' | 'urgent' | 'success';
}

export function DeliveryCountdown({
  cutoffHour,
  cutoffMinute = 0,
  timezone = 'America/New_York', // Atlanta timezone
  message,
  completedMessage,
  variant = 'default'
}: DeliveryCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isPastCutoff, setIsPastCutoff] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(cutoffHour, cutoffMinute, 0, 0);

      // If past cutoff, set for tomorrow
      if (now > cutoff) {
        setIsPastCutoff(true);
        cutoff.setDate(cutoff.getDate() + 1);
      } else {
        setIsPastCutoff(false);
      }

      const diff = cutoff.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [cutoffHour, cutoffMinute]);

  const variantStyles = {
    default: 'bg-blue-50 border-blue-200 text-blue-900',
    urgent: 'bg-orange-50 border-orange-200 text-orange-900',
    success: 'bg-green-50 border-green-200 text-green-900'
  };

  if (isPastCutoff) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border ${variantStyles.success}`}
      >
        <div className="flex items-center space-x-3">
          <CheckCircle size={24} className="text-green-600" />
          <p className="text-sm font-medium">{completedMessage}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${variantStyles[variant]}`}
    >
      <div className="flex items-start space-x-3">
        <Clock size={24} className={variant === 'urgent' ? 'text-orange-600' : 'text-blue-600'} />
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">{message}</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tabular-nums">{timeRemaining}</span>
            <span className="text-xs text-gray-600">remaining</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

**Usage Example** (in ContactPage, ServicesPage):

```typescript
import { DeliveryCountdown } from '@/shared/ui/components/DeliveryCountdown';

// Same-day consultation callback
<DeliveryCountdown
  cutoffHour={14} // 2PM
  message="Order by 2PM ET for same-day consultation callback"
  completedMessage="Consultations booked after 2PM will be scheduled for tomorrow"
  variant="urgent"
/>

// This week's availability
<DeliveryCountdown
  cutoffHour={17} // 5PM Friday
  message="Book by 5PM Friday to secure this week's availability"
  completedMessage="Booking for next week's appointments"
  variant="default"
/>
```

### Success Criteria
- ✅ Real-time updates (every second)
- ✅ Automatically switches to "past cutoff" message
- ✅ Timezone-aware (Atlanta ET)
- ✅ Mobile-friendly layout (stacks vertically)
- ✅ Accessible (screen reader announces time remaining)

---

## Task 4: TextureGuideModal Component

### Cultural Context
**Education = Trust** for professional services:
- Interactive quiz/guide builds confidence
- Shows expertise without being sales-y
- Multi-step journey (3-5 screens)
- Shareable results (social proof)

### Implementation

**Create File**: `src/shared/ui/components/TextureGuideModal.tsx`

```typescript
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Share2, Download } from 'lucide-react';

interface GuideStep {
  id: number;
  title: string;
  question: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
  multiSelect?: boolean;
}

interface TextureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideTitle: string;
  steps: GuideStep[];
  onComplete: (answers: Record<number, string | string[]>) => void;
}

export function TextureGuideModal({
  isOpen,
  onClose,
  guideTitle,
  steps,
  onComplete
}: TextureGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const currentGuideStep = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleAnswer = (value: string) => {
    if (currentGuideStep.multiSelect) {
      const current = (answers[currentStep] as string[]) || [];
      const newAnswers = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [currentStep]: newAnswers });
    } else {
      setAnswers({ ...answers, [currentStep]: value });
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      setShowResults(true);
      onComplete(answers);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = answers[currentStep] !== undefined && 
    (currentGuideStep.multiSelect ? (answers[currentStep] as string[]).length > 0 : true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{guideTitle}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {!showResults ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentGuideStep.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{currentGuideStep.question}</p>

                  <div className="space-y-3">
                    {currentGuideStep.options.map((option) => {
                      const isSelected = currentGuideStep.multiSelect
                        ? ((answers[currentStep] as string[]) || []).includes(option.value)
                        : answers[currentStep] === option.value;

                      return (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option.value)}
                          className={`
                            w-full p-4 rounded-lg border-2 text-left transition-all
                            ${isSelected 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                            }
                          `}
                        >
                          <div className="flex items-start">
                            <div className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                              ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}
                            `}>
                              {isSelected && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="font-semibold text-gray-900">{option.label}</p>
                              {option.description && (
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {currentGuideStep.multiSelect && (
                    <p className="text-sm text-gray-500 mt-4">
                      Select all that apply
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Guide Complete!
                </h3>
                <p className="text-gray-600 mb-6">
                  Based on your answers, we've prepared personalized recommendations.
                </p>

                <div className="flex gap-3 justify-center">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Download size={20} />
                    <span>Download Results</span>
                  </button>
                  <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {!showResults && (
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>{isLastStep ? 'See Results' : 'Next'}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

**Usage Example** (trigger from CTA button):

```typescript
import { useState } from 'react';
import { TextureGuideModal } from '@/shared/ui/components/TextureGuideModal';

const LEGAL_GUIDE_STEPS = [
  {
    id: 1,
    title: 'What type of legal help do you need?',
    question: 'Select the area that best matches your situation',
    options: [
      { value: 'personal-injury', label: 'Personal Injury', description: 'Car accidents, slip & fall, medical malpractice' },
      { value: 'family-law', label: 'Family Law', description: 'Divorce, custody, child support' },
      { value: 'estate', label: 'Estate Planning', description: 'Wills, trusts, probate' },
      { value: 'business', label: 'Business Law', description: 'Contracts, disputes, formation' }
    ]
  },
  {
    id: 2,
    title: 'How urgent is your situation?',
    question: 'This helps us prioritize your consultation',
    options: [
      { value: 'immediate', label: 'Immediate (within 48 hours)', description: 'Court date soon, statute of limitations' },
      { value: 'soon', label: 'Soon (within 1-2 weeks)' },
      { value: 'planning', label: 'Planning ahead (no rush)' }
    ]
  },
  {
    id: 3,
    title: 'What obstacles are preventing you from getting help?',
    question: 'Select all that apply - we want to help remove these barriers',
    options: [
      { value: 'cost', label: 'Concerned about cost' },
      { value: 'time', label: 'Don\'t have time for long meetings' },
      { value: 'trust', label: 'Not sure who to trust' },
      { value: 'understanding', label: 'Don\'t understand legal process' }
    ],
    multiSelect: true
  }
];

function ServicesPage() {
  const [showGuide, setShowGuide] = useState(false);

  const handleGuideComplete = (answers: Record<number, string | string[]>) => {
    console.log('Guide answers:', answers);
    // Send to analytics
    // Show personalized results
    // Pre-fill contact form with context
  };

  return (
    <>
      <button
        onClick={() => setShowGuide(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Not sure where to start? Take our 2-minute guide
      </button>

      <TextureGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        guideTitle="Find the Right Legal Help"
        steps={LEGAL_GUIDE_STEPS}
        onComplete={handleGuideComplete}
      />
    </>
  );
}
```

### Success Criteria
- ✅ 5+ minutes average time spent in guide
- ✅ 70%+ completion rate (users finish all steps)
- ✅ Results shareable via social media
- ✅ Personalized recommendations based on answers
- ✅ Analytics tracking for each step

---

## Integration Checklist

### 1. Add to Variant Configurations
Update `src/shared/config/variants.config.ts` to include conversion triggers:

```typescript
export interface SiteConfig {
  // ... existing fields
  conversionTriggers?: {
    showInvestmentOptions: boolean;
    showVideoCards: boolean;
    deliveryCutoffHour?: number;
    showTextureGuide: boolean;
    guideSteps?: GuideStep[];
  };
}

// Example for law firm variant
const lawFirmConfig: SiteConfig = {
  // ... existing config
  conversionTriggers: {
    showInvestmentOptions: true,
    showVideoCards: true,
    deliveryCutoffHour: 17, // 5PM cutoff for same-day callback
    showTextureGuide: true,
    guideSteps: LEGAL_GUIDE_STEPS
  }
};
```

### 2. Update Contact Page
Add components to `src/pages/ContactPage.tsx`:

```typescript
import { InvestmentOptions } from '@/shared/ui/components/InvestmentOptions';
import { DeliveryCountdown } from '@/shared/ui/components/DeliveryCountdown';
import { TextureGuideModal } from '@/shared/ui/components/TextureGuideModal';

// Inside ContactPage component, before the form:
{config.conversionTriggers?.showInvestmentOptions && (
  <InvestmentOptions
    totalPrice={estimatedPrice}
    serviceName={config.name}
    onPaymentMethodSelect={setPaymentMethod}
  />
)}

{config.conversionTriggers?.deliveryCutoffHour && (
  <DeliveryCountdown
    cutoffHour={config.conversionTriggers.deliveryCutoffHour}
    message="Schedule by 5PM ET for callback today"
    completedMessage="We'll call you back first thing tomorrow morning"
    variant="urgent"
  />
)}
```

### 3. Update Services Page
Add video cards to `src/pages/ServicesPage.tsx`:

```typescript
import { HoverVideoCard } from '@/shared/ui/components/HoverVideoCard';

// Create service preview videos (6 seconds each)
const SERVICE_VIDEOS = [
  {
    title: 'Meet Our Team',
    description: 'Your consultation starts here',
    poster: '/images/team-poster.jpg',
    video: '/videos/team-intro-6s.mp4'
  },
  {
    title: 'Our Process',
    description: 'How we handle your case',
    poster: '/images/process-poster.jpg',
    video: '/videos/process-6s.mp4'
  }
];

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {SERVICE_VIDEOS.map((video, index) => (
    <HoverVideoCard
      key={index}
      {...video}
      ctaText="Schedule Free Consultation"
      onCtaClick={() => navigate('/contact')}
    />
  ))}
</div>
```

### 4. Analytics Events
Track conversion trigger interactions:

```typescript
// In each component, add analytics
import { trackEvent } from '@/lib/analytics';

// InvestmentOptions
trackEvent('payment_method_selected', {
  method: selectedMethod,
  total_price: totalPrice,
  variant: config.id
});

// HoverVideoCard
trackEvent('video_card_played', {
  video_title: title,
  time_watched: watchedSeconds,
  variant: config.id
});

// DeliveryCountdown
trackEvent('countdown_viewed', {
  time_remaining: timeRemaining,
  cutoff_hour: cutoffHour,
  variant: config.id
});

// TextureGuideModal
trackEvent('guide_step_completed', {
  step: currentStep,
  answer: selectedAnswer,
  variant: config.id
});
```

---

## Testing Checklist

### Functional Testing
- [ ] InvestmentOptions: All 3 payment methods selectable
- [ ] InvestmentOptions: Info tooltips display correctly
- [ ] InvestmentOptions: Payment calculations accurate
- [ ] HoverVideoCard: Auto-plays on hover (desktop)
- [ ] HoverVideoCard: Tap to play/pause (mobile)
- [ ] HoverVideoCard: Mute toggle works
- [ ] HoverVideoCard: Video loops seamlessly
- [ ] DeliveryCountdown: Real-time updates every second
- [ ] DeliveryCountdown: Switches to "past cutoff" message
- [ ] DeliveryCountdown: Timezone correct (Atlanta ET)
- [ ] TextureGuideModal: Multi-step navigation works
- [ ] TextureGuideModal: Progress bar accurate
- [ ] TextureGuideModal: Results screen displays
- [ ] TextureGuideModal: Share/download buttons functional

### Accessibility Testing
- [ ] All buttons have min 44px touch targets
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces all state changes
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Focus indicators visible on all interactive elements
- [ ] ARIA labels present on icon buttons

### Performance Testing
- [ ] Videos lazy load (not all at once)
- [ ] Countdown updates don't cause layout shift
- [ ] Modal animations smooth (60fps)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (iOS)
- [ ] Firefox
- [ ] Edge

---

## Success Metrics (Phase 2 Goals)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Add-to-Cart Rate | 15%+ | GA4 event tracking |
| Payment Method Selection | 60%+ Afterpay/Klarna | InvestmentOptions analytics |
| Video Card Engagement | 40%+ play rate | HoverVideoCard analytics |
| Guide Completion Rate | 70%+ | TextureGuideModal funnel |
| Average Time in Guide | 5+ minutes | Session duration tracking |
| Same-Day Urgency Conversions | 20%+ | DeliveryCountdown attribution |

---

## Phase 2 Complete Checklist

- [ ] InvestmentOptions component created & tested
- [ ] HoverVideoCard component created & tested
- [ ] DeliveryCountdown component created & tested
- [ ] TextureGuideModal component created & tested
- [ ] All components integrated into variant system
- [ ] ContactPage updated with conversion triggers
- [ ] ServicesPage updated with video cards
- [ ] Analytics events configured
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance benchmarks met (<3s TTI)
- [ ] Cross-browser testing complete
- [ ] TypeScript compilation successful (0 errors)
- [ ] Mobile testing on iOS & Android
- [ ] Success metrics tracking configured

**Phase 2 Duration**: 3 business days  
**Team**: 1 conversion engineer + 1 frontend developer  
**Dependencies**: Phase 1 variant system must be complete

---

## Handoff to Phase 3

After Phase 2 completion, you should have:
1. ✅ 4 new conversion-optimized components
2. ✅ Analytics tracking for all user interactions
3. ✅ Variant-specific payment options
4. ✅ Video preview infrastructure
5. ✅ Educational guide framework
6. ✅ Urgency timers for multiple use cases

**Next Phase**: Booking Experience (luxury positioning, social proof, testimonials)
