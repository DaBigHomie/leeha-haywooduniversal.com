# Phase 3: Luxury Booking Experience & Social Proof Implementation

**Agent Type**: Luxury UX Designer + Social Proof Engineer  
**Estimated Effort**: 4 business days  
**Priority**: HIGH  
**Target Demographic**: High-net-worth clients seeking premium professional services  
**Dependencies**: Phase 1 (variant system) & Phase 2 (conversion triggers)

---

## Objective: Premium Positioning Through Experience Design

Transform booking from transactional to experiential through:
- **SalonVibeGallery** (luxury environment showcase)
- **BookingPolicy** (concierge-level respect language)
- **MeltTestimonials** (authentic social proof)

**Key Insight**: Premium clients pay for:
1. **Respect** (their time, preferences, boundaries)
2. **Trust** (verified social proof, professional credentials)
3. **Exclusivity** (limited availability, selective clientele)
4. **Experience** (every interaction reflects value)

---

## Task 1: SalonVibeGallery Component

### Cultural Context
**Environment = Brand Promise** for professional services:
- Law office photos → Credibility (degrees, awards, modern space)
- Fitness studio → Motivation (equipment, transformations, community)
- Medical practice → Trust (clean facilities, technology, staff)
- Real estate → Aspirational (listings, luxury properties)

6-8 high-quality photos with category filters:
- "Office Tour" (reception, consultation rooms, team spaces)
- "Meet the Team" (professional headshots, candid moments)
- "Client Results" (before/after, success stories)
- "Community Events" (workshops, networking, giving back)

### Implementation

**Create File**: `src/shared/ui/components/SalonVibeGallery.tsx`

```typescript
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  description?: string;
  aspect?: 'square' | 'portrait' | 'landscape';
}

interface SalonVibeGalleryProps {
  images: GalleryImage[];
  categories: string[];
  title?: string;
  subtitle?: string;
}

export function SalonVibeGallery({
  images,
  categories,
  title = 'Experience Our Space',
  subtitle = 'Where professionalism meets comfort'
}: SalonVibeGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
    setLightboxIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxImage(filteredImages[prevIndex]);
    setLightboxIndex(prevIndex);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`
            px-6 py-2 rounded-full font-medium transition-all
            ${selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          All ({images.length})
        </button>
        {categories.map((category) => {
          const count = images.filter(img => img.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full font-medium transition-all
                ${selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onClick={() => openLightbox(image, index)}
            >
              <div className={`
                relative overflow-hidden
                ${image.aspect === 'square' ? 'aspect-square' : ''}
                ${image.aspect === 'portrait' ? 'aspect-[3/4]' : ''}
                ${image.aspect === 'landscape' ? 'aspect-[4/3]' : ''}
                ${!image.aspect ? 'aspect-[4/3]' : ''}
              `}>
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-200">{image.description}</p>
                    )}
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <ZoomIn size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />

              {/* Image Details */}
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{lightboxImage.title}</h3>
                {lightboxImage.description && (
                  <p className="text-gray-300">{lightboxImage.description}</p>
                )}
                <p className="text-sm text-gray-400 mt-2">
                  {lightboxIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Usage Example** (in AboutPage or ServicesPage):

```typescript
import { SalonVibeGallery } from '@/shared/ui/components/SalonVibeGallery';

const LAW_FIRM_GALLERY: GalleryImage[] = [
  {
    id: '1',
    url: '/images/gallery/reception.jpg',
    category: 'Office Tour',
    title: 'Modern Reception Area',
    description: 'Welcome to our downtown Atlanta office',
    aspect: 'landscape'
  },
  {
    id: '2',
    url: '/images/gallery/conference-room.jpg',
    category: 'Office Tour',
    title: 'Executive Conference Room',
    description: 'Where we discuss your case strategy',
    aspect: 'landscape'
  },
  {
    id: '3',
    url: '/images/gallery/attorney-headshot.jpg',
    category: 'Meet the Team',
    title: 'Senior Partner, John Doe',
    description: '25+ years experience in personal injury law',
    aspect: 'portrait'
  },
  {
    id: '4',
    url: '/images/gallery/case-win.jpg',
    category: 'Client Results',
    title: '$2.3M Settlement Victory',
    description: 'Medical malpractice case, 2023',
    aspect: 'square'
  },
  {
    id: '5',
    url: '/images/gallery/community-event.jpg',
    category: 'Community Events',
    title: 'Annual Law School Scholarship',
    description: 'Supporting future Atlanta attorneys',
    aspect: 'landscape'
  },
  {
    id: '6',
    url: '/images/gallery/consultation.jpg',
    category: 'Office Tour',
    title: 'Private Consultation Room',
    description: 'Confidential, comfortable, professional',
    aspect: 'landscape'
  }
];

const CATEGORIES = ['Office Tour', 'Meet the Team', 'Client Results', 'Community Events'];

<SalonVibeGallery
  images={LAW_FIRM_GALLERY}
  categories={CATEGORIES}
  title="See Where We Work"
  subtitle="Professional excellence in every detail"
/>
```

### Success Criteria
- ✅ 6-8 high-quality images per category
- ✅ Lightbox opens within 200ms of click
- ✅ Keyboard navigation works (arrow keys, Escape)
- ✅ Images lazy load (performance optimization)
- ✅ Category filters animate smoothly (no layout shift)
- ✅ Mobile swipe gestures work in lightbox

---

## Task 2: BookingPolicy Component

### Cultural Context
**Premium Positioning Through Language**:
- "Appointment Integrity Fee" vs "Cancellation Fee"
- "Investment in your time" vs "Deposit"
- "Respect for our mutual commitment" vs "No refunds"

High-net-worth clients expect:
1. **Transparency** (clear policies upfront)
2. **Respect** (concierge-level language)
3. **Flexibility** (within boundaries)
4. **Accountability** (both parties honor commitments)

### Implementation

**Create File**: `src/shared/ui/components/BookingPolicy.tsx`

```typescript
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
  depositAmount?: number;
  depositPercentage?: number;
  cancellationWindow?: number; // hours
  rescheduleWindow?: number; // hours
  serviceName: string;
  variant?: 'modal' | 'inline';
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
```

**Usage Example** (in booking flow):

```typescript
import { BookingPolicy } from '@/shared/ui/components/BookingPolicy';

// Modal version (before payment)
<BookingPolicy
  variant="modal"
  depositAmount={299}
  depositPercentage={50}
  cancellationWindow={48}
  rescheduleWindow={24}
  serviceName="Legal Consultation"
  onAccept={() => proceedToPayment()}
/>

// Inline version (on contact page)
<BookingPolicy
  variant="inline"
  depositPercentage={50}
  cancellationWindow={48}
  rescheduleWindow={24}
  serviceName="Personal Training Session"
/>
```

### Success Criteria
- ✅ 80%+ users perceive policy as "respectful" (survey)
- ✅ Policy acceptance rate >95%
- ✅ Reduced cancellation rate by 30%
- ✅ Clear language (no legal jargon)
- ✅ Mobile-friendly layout (no horizontal scroll)

---

## Task 3: MeltTestimonials Component

### Cultural Context
**Social Proof = Trust** for skeptical buyers:
- 10+ verified testimonials (names, photos, services)
- Keyword highlighting (pain points, results, emotions)
- Video testimonials (optional but powerful)
- Atlanta-specific references (neighborhoods, events, connections)

### Implementation

**Create File**: `src/shared/ui/components/MeltTestimonials.tsx`

```typescript
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  photo: string;
  title?: string;
  location?: string;
  rating: number;
  date: string;
  content: string;
  keywords?: string[]; // Words to highlight
  videoUrl?: string;
  serviceName: string;
  verified?: boolean;
}

interface MeltTestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  autoplayInterval?: number; // milliseconds
}

export function MeltTestimonials({
  testimonials,
  title = 'What Our Clients Say',
  subtitle = 'Real stories from real people',
  autoplay = true,
  autoplayInterval = 5000
}: MeltTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentTestimonial = testimonials[currentIndex];

  useEffect(() => {
    if (!autoplay || isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoplay, isPaused, autoplayInterval]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setPlayingVideo(null);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setPlayingVideo(null);
  };

  const highlightKeywords = (text: string, keywords?: string[]) => {
    if (!keywords || keywords.length === 0) return text;

    let highlightedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
      );
    });

    return highlightedText;
  };

  const toggleVideo = () => {
    if (playingVideo === currentTestimonial.id) {
      videoRef.current?.pause();
      setPlayingVideo(null);
    } else {
      videoRef.current?.play();
      setPlayingVideo(currentTestimonial.id);
      setIsPaused(true); // Pause autoplay when watching video
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Main Testimonial Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Video/Photo */}
              <div className="relative bg-gray-100">
                {currentTestimonial.videoUrl ? (
                  <div className="relative aspect-[4/3]">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={currentTestimonial.photo}
                      onEnded={() => setPlayingVideo(null)}
                    >
                      <source src={currentTestimonial.videoUrl} type="video/mp4" />
                    </video>

                    {/* Play/Pause Button */}
                    <button
                      onClick={toggleVideo}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                      aria-label={playingVideo ? 'Pause video' : 'Play video'}
                    >
                      {playingVideo === currentTestimonial.id ? (
                        <Pause size={32} className="text-gray-900" />
                      ) : (
                        <Play size={32} className="text-gray-900 ml-1" />
                      )}
                    </button>

                    {/* Video Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                      Video Testimonial
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3]">
                    <img
                      src={currentTestimonial.photo}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Quote Icon */}
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Quote size={32} className="text-white" />
                </div>
              </div>

              {/* Right: Content */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={
                          i < currentTestimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                    {currentTestimonial.verified && (
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Verified Client
                      </span>
                    )}
                  </div>

                  {/* Testimonial Text */}
                  <div
                    className="text-lg text-gray-700 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(
                        currentTestimonial.content,
                        currentTestimonial.keywords
                      )
                    }}
                  />
                </div>

                {/* Client Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={currentTestimonial.photo}
                      alt={currentTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {currentTestimonial.name}
                      </p>
                      {currentTestimonial.title && (
                        <p className="text-sm text-gray-600">{currentTestimonial.title}</p>
                      )}
                      {currentTestimonial.location && (
                        <p className="text-sm text-gray-500">{currentTestimonial.location}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {currentTestimonial.serviceName} • {currentTestimonial.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} className="text-gray-900" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            onClick={() => {
              setCurrentIndex(index);
              setPlayingVideo(null);
            }}
            className={`
              relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-4 transition-all
              ${currentIndex === index ? 'border-blue-600 scale-110' : 'border-gray-300 opacity-50 hover:opacity-100'}
            `}
          >
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
            {testimonial.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play size={16} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>

        <div className="flex-1 max-w-xs">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ width: 0 }}
              animate={{ width: isPaused ? '0%' : '100%' }}
              transition={{ duration: autoplayInterval / 1000, ease: 'linear' }}
              className="h-full bg-blue-600"
            />
          </div>
        </div>

        <span className="text-sm text-gray-600 tabular-nums">
          {currentIndex + 1} / {testimonials.length}
        </span>
      </div>
    </div>
  );
}
```

**Usage Example** (in TestimonialsPage or HomePage):

```typescript
import { MeltTestimonials } from '@/shared/ui/components/MeltTestimonials';

const LAW_FIRM_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    photo: '/images/testimonials/marcus.jpg',
    title: 'Small Business Owner',
    location: 'Buckhead, Atlanta',
    rating: 5,
    date: 'January 2025',
    content: 'After my car accident, I was overwhelmed with medical bills and insurance companies refusing to pay. The team here fought for me like family. We settled for $450,000 - enough to cover everything and secure my kids\' future. They answered every call, explained every step, and genuinely cared.',
    keywords: ['fought for me', 'like family', 'genuinely cared', '$450,000'],
    serviceName: 'Personal Injury',
    verified: true
  },
  {
    id: '2',
    name: 'Shanice Williams',
    photo: '/images/testimonials/shanice.jpg',
    title: 'Marketing Executive',
    location: 'Midtown, Atlanta',
    rating: 5,
    date: 'December 2024',
    content: 'Going through a divorce was the hardest thing I\'ve ever done. My attorney made me feel heard, protected my interests, and kept my kids\' wellbeing as the top priority. She negotiated a fair settlement and never made me feel rushed or judged. Worth every penny.',
    keywords: ['made me feel heard', 'protected my interests', 'never made me feel rushed'],
    videoUrl: '/videos/testimonials/shanice.mp4',
    serviceName: 'Family Law',
    verified: true
  },
  {
    id: '3',
    name: 'David Chen',
    photo: '/images/testimonials/david.jpg',
    title: 'Tech Entrepreneur',
    location: 'Old Fourth Ward, Atlanta',
    rating: 5,
    date: 'November 2024',
    content: 'Estate planning felt overwhelming until I met this team. They walked me through trusts, wills, and protecting my business assets in plain English. My family is now secure, and I have peace of mind knowing everything is handled if something happens to me.',
    keywords: ['plain English', 'peace of mind', 'family is now secure'],
    serviceName: 'Estate Planning',
    verified: true
  }
];

<MeltTestimonials
  testimonials={LAW_FIRM_TESTIMONIALS}
  title="Client Success Stories"
  subtitle="Over 500 Atlanta families served since 2010"
  autoplay={true}
  autoplayInterval={6000}
/>
```

### Success Criteria
- ✅ 10+ verified testimonials with photos
- ✅ Keywords highlighted (pain points, results)
- ✅ 90%+ users perceive as "authentic" (survey)
- ✅ Video testimonials auto-pause carousel
- ✅ Mobile swipe navigation works
- ✅ Atlanta-specific locations mentioned

---

## Integration Checklist

### 1. Add to Variant Configurations
Update `src/shared/config/variants.config.ts`:

```typescript
export interface SiteConfig {
  // ... existing fields
  bookingExperience?: {
    galleryImages?: GalleryImage[];
    galleryCategories?: string[];
    depositAmount?: number;
    depositPercentage?: number;
    cancellationWindow?: number;
    rescheduleWindow?: number;
    testimonials?: Testimonial[];
  };
}

// Example for law firm variant
const lawFirmConfig: SiteConfig = {
  // ... existing config
  bookingExperience: {
    galleryImages: LAW_FIRM_GALLERY,
    galleryCategories: ['Office Tour', 'Meet the Team', 'Client Results', 'Community Events'],
    depositAmount: 299,
    depositPercentage: 50,
    cancellationWindow: 48,
    rescheduleWindow: 24,
    testimonials: LAW_FIRM_TESTIMONIALS
  }
};
```

### 2. Update About Page
Add gallery to `src/pages/AboutPage.tsx`:

```typescript
import { SalonVibeGallery } from '@/shared/ui/components/SalonVibeGallery';

{config.bookingExperience?.galleryImages && (
  <SalonVibeGallery
    images={config.bookingExperience.galleryImages}
    categories={config.bookingExperience.galleryCategories || []}
  />
)}
```

### 3. Update Contact Page
Add policy to booking flow:

```typescript
import { BookingPolicy } from '@/shared/ui/components/BookingPolicy';

// Before payment form
{config.bookingExperience && (
  <BookingPolicy
    variant="modal"
    depositAmount={config.bookingExperience.depositAmount}
    depositPercentage={config.bookingExperience.depositPercentage}
    cancellationWindow={config.bookingExperience.cancellationWindow}
    rescheduleWindow={config.bookingExperience.rescheduleWindow}
    serviceName={config.name}
    onAccept={() => setPolicyAccepted(true)}
  />
)}
```

### 4. Create Testimonials Page
New page `src/pages/TestimonialsPage.tsx`:

```typescript
import { MeltTestimonials } from '@/shared/ui/components/MeltTestimonials';

export function TestimonialsPage() {
  const { config } = useVariant();

  if (!config.bookingExperience?.testimonials) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <MeltTestimonials
          testimonials={config.bookingExperience.testimonials}
        />
      </div>
    </div>
  );
}
```

### 5. Analytics Events

```typescript
// Gallery
trackEvent('gallery_image_viewed', {
  image_id: image.id,
  category: image.category,
  variant: config.id
});

trackEvent('gallery_lightbox_opened', {
  image_id: image.id,
  variant: config.id
});

// Booking Policy
trackEvent('policy_section_expanded', {
  variant: config.id
});

trackEvent('policy_accepted', {
  deposit_amount: depositAmount,
  variant: config.id
});

// Testimonials
trackEvent('testimonial_viewed', {
  testimonial_id: testimonial.id,
  has_video: !!testimonial.videoUrl,
  variant: config.id
});

trackEvent('testimonial_video_played', {
  testimonial_id: testimonial.id,
  variant: config.id
});
```

---

## Testing Checklist

### Functional Testing
- [ ] SalonVibeGallery: Category filters work
- [ ] SalonVibeGallery: Lightbox opens/closes
- [ ] SalonVibeGallery: Keyboard navigation (arrows, Escape)
- [ ] SalonVibeGallery: Images lazy load
- [ ] BookingPolicy: Expands/collapses smoothly
- [ ] BookingPolicy: Checkbox enables "Accept" button
- [ ] BookingPolicy: All policy sections display
- [ ] MeltTestimonials: Auto-advances every 6 seconds
- [ ] MeltTestimonials: Video testimonials play/pause
- [ ] MeltTestimonials: Thumbnail navigation works
- [ ] MeltTestimonials: Progress bar animates correctly

### Accessibility Testing
- [ ] Gallery lightbox keyboard navigable
- [ ] Policy modal keyboard accessible (Tab, Enter)
- [ ] Testimonials carousel has ARIA labels
- [ ] Screen reader announces carousel position
- [ ] Focus indicators visible on all controls
- [ ] Color contrast meets WCAG AA standards

### Performance Testing
- [ ] Gallery images optimize on load (lazy loading)
- [ ] Lightbox opens within 200ms
- [ ] Carousel transitions smooth (60fps)
- [ ] Video testimonials preload poster images
- [ ] Mobile touch gestures responsive (<100ms)

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (iOS & macOS)
- [ ] Firefox
- [ ] Edge

---

## Success Metrics (Phase 3 Goals)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Policy Perceived as Respectful | 80%+ | Post-booking survey |
| Testimonial Authenticity Rating | 90%+ | User perception survey |
| Booking-to-Deposit Conversion | 35%+ | Funnel analytics |
| Gallery Engagement Rate | 60%+ view 3+ photos | GA4 event tracking |
| Video Testimonial Watch Rate | 70%+ | Video play analytics |
| Policy Acceptance Rate | 95%+ | Checkbox completion |

---

## Phase 3 Complete Checklist

- [ ] SalonVibeGallery component created & tested
- [ ] BookingPolicy component created & tested
- [ ] MeltTestimonials component created & tested
- [ ] All components integrated into variant system
- [ ] AboutPage updated with gallery
- [ ] ContactPage updated with booking policy
- [ ] TestimonialsPage created
- [ ] Analytics events configured
- [ ] 6-8 high-quality photos per category collected
- [ ] 10+ client testimonials collected (verified)
- [ ] Video testimonials recorded (optional but recommended)
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance benchmarks met (<3s TTI)
- [ ] Cross-browser testing complete
- [ ] TypeScript compilation successful (0 errors)
- [ ] Mobile testing on iOS & Android

**Phase 3 Duration**: 4 business days  
**Team**: 1 UX designer + 1 frontend developer + 1 photographer  
**Dependencies**: Phase 1 variant system, Phase 2 conversion triggers

---

## Handoff to Phase 4

After Phase 3 completion, you should have:
1. ✅ Luxury-positioned booking experience
2. ✅ Social proof infrastructure (testimonials, gallery)
3. ✅ Respectful policy language (concierge-level)
4. ✅ Visual trust signals (office photos, team headshots)
5. ✅ Video testimonial framework
6. ✅ Mobile-optimized carousel navigation

**Next Phase**: Digital Products & Memberships (additional revenue streams)
