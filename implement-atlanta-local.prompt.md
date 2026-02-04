# Phase 5: Atlanta Hyper-Local Geographic Advantage

**Agent Type**: Hyper-Local Marketing Engineer + Referral System Developer  
**Estimated Effort**: 3 business days  
**Priority**: MEDIUM  
**Target Demographic**: Metro Atlanta residents (Buckhead, Midtown, Old Fourth Ward)  
**Dependencies**: Phase 1-4 (brand trust established)

---

## Objective: Leverage Atlanta Geographic Conversion Edge

Maximize local advantage through:
- **AtlantaEventsCalendar** (The Gathering Spot, Ponce City Market)
- **CelebrityLookbook** (Atlanta influencers, reality TV stars)
- **ReferralProgram** (Bronze/Silver/Gold tiers, social sharing)

**Key Insight**: Atlanta residents respond to:
1. **Hyper-local references** (neighborhoods, events, landmarks)
2. **Social validation** (who else is using this service)
3. **Community connection** (supporting Black-owned, Atlanta-based)
4. **Referral incentives** (word-of-mouth culture)

---

## Task 1: AtlantaEventsCalendar Component

### Cultural Context
**Atlanta = Events City** for professional networking:
- The Gathering Spot (exclusive social club)
- Ponce City Market rooftop (summer events)
- Tyler Perry Studios tours (media industry)
- Atlanta Tech Village (startup ecosystem)
- Mercedes-Benz Stadium (major events)

Event types:
- **Networking** (mixers, happy hours, conferences)
- **Professional Development** (workshops, seminars)
- **Community** (charity galas, fundraisers)
- **Entertainment** (concerts, comedy shows, sports)

### Implementation

**Create File**: `src/shared/ui/components/AtlantaEventsCalendar.tsx`

```typescript
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink, Filter, Clock, DollarSign } from 'lucide-react';
import { format, parseISO, isSameDay, isAfter, isBefore, addDays } from 'date-fns';

interface AtlantaEvent {
  id: string;
  title: string;
  date: string; // ISO format
  startTime: string;
  endTime?: string;
  venue: {
    name: string;
    address: string;
    neighborhood: string; // Buckhead, Midtown, etc.
  };
  category: 'networking' | 'professional' | 'community' | 'entertainment';
  description: string;
  attendees?: number;
  ticketPrice?: number;
  isFree?: boolean;
  registrationUrl?: string;
  imageUrl: string;
  sponsored?: boolean;
}

interface AtlantaEventsCalendarProps {
  events: AtlantaEvent[];
  title?: string;
  subtitle?: string;
  onRegister?: (event: AtlantaEvent) => void;
}

export function AtlantaEventsCalendar({
  events,
  title = 'Atlanta Events & Networking',
  subtitle = 'See where we\'ll be. Come meet the team.',
  onRegister
}: AtlantaEventsCalendarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'upcoming' | 'this-week' | 'this-month'>('upcoming');

  // Extract unique categories and neighborhoods
  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category));
    return Array.from(cats);
  }, [events]);

  const neighborhoods = useMemo(() => {
    const hoods = new Set(events.map(e => e.venue.neighborhood));
    return Array.from(hoods);
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    const now = new Date();
    const weekFromNow = addDays(now, 7);
    const monthFromNow = addDays(now, 30);

    return events.filter(event => {
      const eventDate = parseISO(event.date);

      // Category filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }

      // Neighborhood filter
      if (selectedNeighborhood !== 'all' && event.venue.neighborhood !== selectedNeighborhood) {
        return false;
      }

      // Date range filter
      if (dateRange === 'this-week') {
        return isAfter(eventDate, now) && isBefore(eventDate, weekFromNow);
      } else if (dateRange === 'this-month') {
        return isAfter(eventDate, now) && isBefore(eventDate, monthFromNow);
      } else {
        return isAfter(eventDate, now);
      }
    }).sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  }, [events, selectedCategory, selectedNeighborhood, dateRange]);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'networking':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'professional':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'community':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'entertainment':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <span className="font-semibold text-gray-900">Filter Events</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Neighborhood Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Neighborhood
            </label>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Neighborhoods</option>
              {neighborhoods.map(hood => (
                <option key={hood} value={hood}>{hood}</option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="upcoming">All Upcoming</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        </div>

        {/* Active Filters Count */}
        {(selectedCategory !== 'all' || selectedNeighborhood !== 'all' || dateRange !== 'upcoming') && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedNeighborhood('all');
                setDateRange('upcoming');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Events Grid */}
      <AnimatePresence mode="popLayout">
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No events match your filters</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search criteria</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => {
              const eventDate = parseISO(event.date);
              const formattedDate = format(eventDate, 'EEEE, MMMM d');

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Sponsored Badge */}
                    {event.sponsored && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">
                        Sponsored
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className={`
                      absolute top-3 left-3 px-3 py-1 border rounded-full text-xs font-semibold backdrop-blur-sm
                      ${getCategoryBadgeColor(event.category)}
                    `}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-start space-x-2">
                      <Calendar size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900">{formattedDate}</p>
                        <p className="text-gray-600">
                          {event.startTime}
                          {event.endTime && ` - ${event.endTime}`}
                        </p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start space-x-2">
                      <MapPin size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900">{event.venue.name}</p>
                        <p className="text-gray-600">{event.venue.neighborhood}</p>
                      </div>
                    </div>

                    {/* Attendees & Price */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      {event.attendees && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Users size={16} />
                          <span>{event.attendees} going</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-1">
                        {event.isFree ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                            Free
                          </span>
                        ) : event.ticketPrice ? (
                          <div className="flex items-center space-x-1 text-sm font-semibold text-gray-900">
                            <DollarSign size={16} />
                            <span>${event.ticketPrice}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Register Button */}
                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onRegister?.(event)}
                        className="block w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Register</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Google Calendar CTA */}
      {filteredEvents.length > 0 && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Never miss an event. Subscribe to our calendar.
          </p>
          <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center space-x-2">
            <Calendar size={20} />
            <span>Add to Google Calendar</span>
          </button>
        </div>
      )}
    </div>
  );
}
```

**Usage Example**:

```typescript
import { AtlantaEventsCalendar } from '@/shared/ui/components/AtlantaEventsCalendar';

const ATLANTA_EVENTS: AtlantaEvent[] = [
  {
    id: '1',
    title: 'Legal Tech Networking Mixer',
    date: '2025-02-15',
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    venue: {
      name: 'The Gathering Spot',
      address: '384 Northyards Blvd NW',
      neighborhood: 'West Midtown'
    },
    category: 'networking',
    description: 'Connect with Atlanta legal professionals and tech innovators. Complimentary drinks and hors d\'oeuvres.',
    attendees: 85,
    isFree: true,
    registrationUrl: 'https://eventbrite.com/legal-tech-mixer',
    imageUrl: '/images/events/gathering-spot.jpg',
    sponsored: false
  },
  {
    id: '2',
    title: 'Estate Planning Workshop',
    date: '2025-02-20',
    startTime: '2:00 PM',
    endTime: '4:30 PM',
    venue: {
      name: 'Ponce City Market',
      address: '675 Ponce De Leon Ave NE',
      neighborhood: 'Old Fourth Ward'
    },
    category: 'professional',
    description: 'Free workshop covering wills, trusts, and protecting your family\'s future. Lunch included.',
    attendees: 42,
    isFree: true,
    registrationUrl: 'https://eventbrite.com/estate-planning-workshop',
    imageUrl: '/images/events/ponce-city-market.jpg',
    sponsored: true
  },
  {
    id: '3',
    title: 'Black Professionals Gala',
    date: '2025-03-01',
    startTime: '7:00 PM',
    endTime: '11:00 PM',
    venue: {
      name: 'Mercedes-Benz Stadium',
      address: '1 AMB Drive NW',
      neighborhood: 'Downtown'
    },
    category: 'community',
    description: 'Annual fundraiser supporting Atlanta HBCU scholarships. Black-tie optional.',
    attendees: 350,
    ticketPrice: 150,
    registrationUrl: 'https://eventbrite.com/black-professionals-gala',
    imageUrl: '/images/events/gala.jpg',
    sponsored: false
  }
];

<AtlantaEventsCalendar
  events={ATLANTA_EVENTS}
  onRegister={(event) => {
    trackEvent('event_registration_clicked', {
      event_id: event.id,
      event_title: event.title,
      variant: config.id
    });
  }}
/>
```

### Success Criteria
- ✅ 80%+ say events are relevant to them
- ✅ 30%+ register for at least one event
- ✅ Category filters reduce cognitive load
- ✅ Mobile-friendly grid layout
- ✅ Google Calendar integration works

---

## Task 2: CelebrityLookbook Component

### Cultural Context
**Atlanta = Influencer Capital** for social proof:
- Real Housewives of Atlanta cast
- Love & Hip Hop Atlanta stars
- Atlanta-based rappers, athletes
- Local business influencers
- Neighborhood celebrities

Social proof types:
- "Served by our firm" (legal/real estate)
- "Trained at our gym" (fitness)
- "Styled by our team" (beauty)
- "Trusted by" (professional services)

### Implementation

**Create File**: `src/shared/ui/components/CelebrityLookbook.tsx`

```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, ExternalLink, Check } from 'lucide-react';

interface Celebrity {
  id: string;
  name: string;
  photo: string;
  category: 'reality-tv' | 'music' | 'sports' | 'business' | 'influencer';
  credentials: string; // e.g., "Real Housewives of Atlanta"
  testimonialQuote?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
  };
  serviceName?: string; // Which service they used
}

interface CelebrityLookbookProps {
  celebrities: Celebrity[];
  title?: string;
  subtitle?: string;
  variant?: 'grid' | 'carousel';
}

export function CelebrityLookbook({
  celebrities,
  title = 'Trusted by Atlanta\'s Best',
  subtitle = 'See who we\'ve had the privilege to serve',
  variant = 'grid'
}: CelebrityLookbookProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'reality-tv':
        return { color: 'bg-pink-100 text-pink-800', label: 'Reality TV' };
      case 'music':
        return { color: 'bg-purple-100 text-purple-800', label: 'Music' };
      case 'sports':
        return { color: 'bg-blue-100 text-blue-800', label: 'Sports' };
      case 'business':
        return { color: 'bg-green-100 text-green-800', label: 'Business' };
      case 'influencer':
        return { color: 'bg-orange-100 text-orange-800', label: 'Influencer' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Celebrity' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-100 rounded-full mb-4">
          <Check size={18} className="text-yellow-800" />
          <span className="text-sm font-semibold text-yellow-900">
            As Seen In Atlanta
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Celebrity Grid */}
      <div className={`
        grid gap-6
        ${variant === 'grid' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2'}
      `}>
        {celebrities.map((celebrity) => {
          const badge = getCategoryBadge(celebrity.category);
          const isHovered = hoveredId === celebrity.id;

          return (
            <motion.div
              key={celebrity.id}
              whileHover={{ scale: 1.05, y: -10 }}
              onHoverStart={() => setHoveredId(celebrity.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative group"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4]">
                {/* Photo */}
                <img
                  src={celebrity.photo}
                  alt={celebrity.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Category Badge */}
                <div className={`
                  absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
                  ${badge.color}
                `}>
                  {badge.label}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{celebrity.name}</h3>
                  <p className="text-sm text-gray-300 mb-3">{celebrity.credentials}</p>

                  {celebrity.serviceName && (
                    <div className="flex items-center space-x-2 mb-3">
                      <Check size={16} className="text-green-400" />
                      <span className="text-sm">{celebrity.serviceName}</span>
                    </div>
                  )}

                  {/* Testimonial Quote (shows on hover) */}
                  {celebrity.testimonialQuote && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm italic text-gray-200 border-l-2 border-yellow-400 pl-3">
                        "{celebrity.testimonialQuote}"
                      </p>
                    </motion.div>
                  )}

                  {/* Social Media Links */}
                  {celebrity.socialMedia && (
                    <div className="flex items-center space-x-3 mt-4">
                      {celebrity.socialMedia.instagram && (
                        <a
                          href={celebrity.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram size={18} />
                        </a>
                      )}
                      {celebrity.socialMedia.twitter && (
                        <a
                          href={celebrity.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Badge */}
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          We respect our clients' privacy. All featured with permission.
        </p>
      </div>
    </div>
  );
}
```

**Usage Example**:

```typescript
import { CelebrityLookbook } from '@/shared/ui/components/CelebrityLookbook';

const ATLANTA_CELEBRITIES: Celebrity[] = [
  {
    id: '1',
    name: 'Kenya Moore',
    photo: '/images/celebrities/kenya-moore.jpg',
    category: 'reality-tv',
    credentials: 'Real Housewives of Atlanta, Former Miss USA',
    testimonialQuote: 'Professionalism and results. They handled my case with care and got me the outcome I deserved.',
    socialMedia: {
      instagram: 'https://instagram.com/thekenyamoore',
      twitter: 'https://twitter.com/KenyaMoore'
    },
    serviceName: 'Family Law Consultation'
  },
  {
    id: '2',
    name: 'Jermaine Dupri',
    photo: '/images/celebrities/jermaine-dupri.jpg',
    category: 'music',
    credentials: 'Legendary Producer, So So Def Recordings',
    testimonialQuote: 'Been knowing them for years. They always come through when I need legal work done.',
    socialMedia: {
      instagram: 'https://instagram.com/jermainedupri'
    },
    serviceName: 'Business Contract Review'
  },
  {
    id: '3',
    name: 'Rasheeda Frost',
    photo: '/images/celebrities/rasheeda.jpg',
    category: 'business',
    credentials: 'Love & Hip Hop ATL, Pressed Boutique Owner',
    testimonialQuote: 'They helped me with my boutique lease and trademark. Atlanta\'s best!',
    socialMedia: {
      instagram: 'https://instagram.com/rasheeda'
    },
    serviceName: 'Business Formation & Trademark'
  },
  {
    id: '4',
    name: 'Julio Jones',
    photo: '/images/celebrities/julio-jones.jpg',
    category: 'sports',
    credentials: 'NFL Wide Receiver, Former Atlanta Falcon',
    socialMedia: {
      instagram: 'https://instagram.com/juliojones_11'
    },
    serviceName: 'Contract Negotiation'
  }
];

<CelebrityLookbook
  celebrities={ATLANTA_CELEBRITIES}
  title="Atlanta Legends Trust Us"
  subtitle="Join the roster of satisfied clients"
  variant="grid"
/>
```

### Success Criteria
- ✅ 8+ Atlanta celebrities/influencers featured
- ✅ Testimonial quotes from 50%+ of featured
- ✅ Social media links increase verification trust
- ✅ Permission obtained for all featured individuals
- ✅ Mobile-optimized grid (2 columns)

---

## Task 3: ReferralProgram Component

### Cultural Context
**Word-of-Mouth = Atlanta Culture**:
- Family recommends family
- Church community connections
- College alumni networks (Spelman, Morehouse, Clark Atlanta)
- Social club referrals (The Gathering Spot, Jack & Jill)

Referral incentives:
- **Bronze** (1-2 referrals): $50 service credit
- **Silver** (3-5 referrals): $150 credit + priority booking
- **Gold** (6+ referrals): $500 credit + VIP perks

### Implementation

**Create File**: `src/shared/ui/components/ReferralProgram.tsx`

```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Users, Copy, Check, Share2, Award, Crown } from 'lucide-react';

interface ReferralTier {
  id: 'bronze' | 'silver' | 'gold';
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  referralsNeeded: number;
  rewards: string[];
  currentUserCount?: number;
}

interface ReferralProgramProps {
  referralCode: string;
  referralLink: string;
  currentReferrals: number;
  tiers: ReferralTier[];
  onShare?: (platform: 'facebook' | 'twitter' | 'instagram' | 'email') => void;
}

export function ReferralProgram({
  referralCode,
  referralLink,
  currentReferrals,
  tiers,
  onShare
}: ReferralProgramProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentTier = tiers.find(tier => 
    currentReferrals >= tier.referralsNeeded
  ) || tiers[0];

  const nextTier = tiers.find(tier => 
    currentReferrals < tier.referralsNeeded
  );

  const progressPercentage = nextTier
    ? (currentReferrals / nextTier.referralsNeeded) * 100
    : 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4"
        >
          <Gift size={20} className="text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            Referral Rewards Program
          </span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Earn Rewards for Spreading the Word
        </h2>
        <p className="text-lg text-gray-600">
          Refer friends, family, and colleagues. Everyone wins.
        </p>
      </div>

      {/* Current Status Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Your Current Tier</p>
            <div className="flex items-center space-x-3">
              <currentTier.icon size={32} className="text-white" />
              <h3 className="text-3xl font-bold">{currentTier.name}</h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Total Referrals</p>
            <p className="text-5xl font-bold">{currentReferrals}</p>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentReferrals} referred</span>
              <span>{nextTier.referralsNeeded - currentReferrals} more to {nextTier.name}</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        )}

        {/* Referral Code */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <p className="text-sm text-blue-100 mb-2">Your Referral Code</p>
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-2xl font-mono font-bold tracking-wider">
              {referralCode}
            </code>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tier Breakdown */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Referral Tiers & Rewards
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isCurrentTier = currentTier.id === tier.id;
            const isAchieved = currentReferrals >= tier.referralsNeeded;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all
                  ${isCurrentTier 
                    ? `${tier.color} ${tier.bgColor} shadow-xl scale-105` 
                    : isAchieved
                      ? 'bg-gray-50 border-gray-300'
                      : 'bg-white border-gray-200'
                  }
                `}
              >
                {isCurrentTier && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                    Current Tier
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3
                    ${isCurrentTier ? 'bg-white' : tier.bgColor}
                  `}>
                    <Icon 
                      size={32} 
                      className={isCurrentTier ? tier.color.replace('border-', 'text-') : 'text-gray-400'} 
                    />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {tier.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {tier.referralsNeeded} referral{tier.referralsNeeded !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="space-y-2">
                  {tier.rewards.map((reward, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{reward}</span>
                    </div>
                  ))}
                </div>

                {tier.currentUserCount && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      {tier.currentUserCount.toLocaleString()} members in this tier
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Share Buttons */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Share Your Referral Link
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { platform: 'facebook' as const, label: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
            { platform: 'twitter' as const, label: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600' },
            { platform: 'instagram' as const, label: 'Instagram', color: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600' },
            { platform: 'email' as const, label: 'Email', color: 'bg-gray-700 hover:bg-gray-800' }
          ].map(({ platform, label, color }) => (
            <button
              key={platform}
              onClick={() => onShare?.(platform)}
              className={`
                px-4 py-3 rounded-lg text-white font-semibold transition-colors
                flex items-center justify-center space-x-2 ${color}
              `}
            >
              <Share2 size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Share Your Code',
              description: 'Send your unique referral code or link to friends and family'
            },
            {
              step: '2',
              title: 'They Book a Service',
              description: 'When they schedule using your code, you both get rewarded'
            },
            {
              step: '3',
              title: 'Unlock Rewards',
              description: 'Earn credits, priority booking, and VIP perks as you refer more'
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Usage Example**:

```typescript
import { ReferralProgram } from '@/shared/ui/components/ReferralProgram';

const REFERRAL_TIERS: ReferralTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    icon: Gift,
    color: 'border-orange-400',
    bgColor: 'bg-orange-50',
    referralsNeeded: 1,
    rewards: [
      '$50 service credit',
      'Thank you card',
      'Referral badge on profile'
    ],
    currentUserCount: 420
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: Award,
    color: 'border-gray-400',
    bgColor: 'bg-gray-50',
    referralsNeeded: 3,
    rewards: [
      '$150 service credit',
      'Priority booking access',
      'Exclusive monthly newsletter',
      'Early access to new services'
    ],
    currentUserCount: 125
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: Crown,
    color: 'border-yellow-400',
    bgColor: 'bg-yellow-50',
    referralsNeeded: 6,
    rewards: [
      '$500 service credit',
      'VIP concierge service',
      'Free annual service ($300 value)',
      'Exclusive event invitations',
      'Personal account manager'
    ],
    currentUserCount: 32
  }
];

<ReferralProgram
  referralCode="ATLANTA2025"
  referralLink="https://lawfirm.com/ref/ATLANTA2025"
  currentReferrals={4}
  tiers={REFERRAL_TIERS}
  onShare={(platform) => {
    // Track share event
    trackEvent('referral_shared', {
      platform,
      referralCode: 'ATLANTA2025',
      variant: config.id
    });

    // Open share dialog for platform
    if (platform === 'facebook') {
      window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`);
    }
    // ... other platforms
  }}
/>
```

### Success Criteria
- ✅ 70%+ share their referral code
- ✅ 25%+ signup rate from referred users
- ✅ Copy button increases sharing by 40%
- ✅ Tier progression motivates continued referrals
- ✅ Mobile-friendly social share buttons

---

## Integration Checklist

### 1. Add to Variant Configurations

```typescript
export interface SiteConfig {
  // ... existing fields
  atlantaLocal?: {
    events?: AtlantaEvent[];
    celebrities?: Celebrity[];
    referralTiers?: ReferralTier[];
    userReferralCode?: string;
    userReferralCount?: number;
  };
}

const lawFirmConfig: SiteConfig = {
  // ... existing config
  atlantaLocal: {
    events: ATLANTA_EVENTS,
    celebrities: ATLANTA_CELEBRITIES,
    referralTiers: REFERRAL_TIERS,
    userReferralCode: 'ATLANTA2025',
    userReferralCount: 0
  }
};
```

### 2. Create Events Page

```typescript
// src/pages/EventsPage.tsx
import { AtlantaEventsCalendar } from '@/shared/ui/components/AtlantaEventsCalendar';

export function EventsPage() {
  const { config } = useVariant();

  if (!config.atlantaLocal?.events) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <AtlantaEventsCalendar
          events={config.atlantaLocal.events}
          onRegister={(event) => {
            // Track event registration
          }}
        />
      </div>
    </div>
  );
}
```

### 3. Add Celebrity Section to About Page

```typescript
// In AboutPage.tsx
import { CelebrityLookbook } from '@/shared/ui/components/CelebrityLookbook';

{config.atlantaLocal?.celebrities && (
  <section className="py-16">
    <CelebrityLookbook celebrities={config.atlantaLocal.celebrities} />
  </section>
)}
```

### 4. Create Referral Page

```typescript
// src/pages/ReferralPage.tsx
import { ReferralProgram } from '@/shared/ui/components/ReferralProgram';

export function ReferralPage() {
  const { config } = useVariant();

  if (!config.atlantaLocal?.referralTiers) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <ReferralProgram
          referralCode={config.atlantaLocal.userReferralCode || 'DEFAULT'}
          referralLink={`https://${window.location.host}/ref/${config.atlantaLocal.userReferralCode}`}
          currentReferrals={config.atlantaLocal.userReferralCount || 0}
          tiers={config.atlantaLocal.referralTiers}
        />
      </div>
    </div>
  );
}
```

### 5. Analytics Events

```typescript
// Events Calendar
trackEvent('event_viewed', {
  event_id: event.id,
  event_category: event.category,
  variant: config.id
});

trackEvent('event_filtered', {
  filter_type: 'category',
  filter_value: selectedCategory,
  variant: config.id
});

// Celebrity Lookbook
trackEvent('celebrity_viewed', {
  celebrity_id: celebrity.id,
  celebrity_category: celebrity.category,
  variant: config.id
});

// Referral Program
trackEvent('referral_code_copied', {
  referral_code: referralCode,
  variant: config.id
});

trackEvent('referral_tier_achieved', {
  tier: tier.id,
  referrals_count: currentReferrals,
  variant: config.id
});
```

---

## Testing Checklist

### Functional Testing
- [ ] AtlantaEventsCalendar: Filters work (category, neighborhood, date)
- [ ] AtlantaEventsCalendar: Registration links open in new tab
- [ ] AtlantaEventsCalendar: Google Calendar button works
- [ ] CelebrityLookbook: Testimonial quotes show on hover
- [ ] CelebrityLookbook: Social media links work
- [ ] ReferralProgram: Copy button copies referral link
- [ ] ReferralProgram: Progress bar animates correctly
- [ ] ReferralProgram: Share buttons open platform dialogs

### Accessibility Testing
- [ ] Event cards keyboard navigable
- [ ] Celebrity cards accessible via keyboard
- [ ] Referral tiers have ARIA labels
- [ ] Screen reader announces tier progress
- [ ] Focus indicators visible on all buttons

### Performance Testing
- [ ] Event images lazy load
- [ ] Celebrity photos optimize on load
- [ ] Animations smooth (60fps)
- [ ] First Contentful Paint < 1.5s

---

## Success Metrics (Phase 5 Goals)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Events Perceived as Relevant | 80%+ | Post-view survey |
| Event Registration Rate | 30%+ | Click-through on registration buttons |
| Referral Code Share Rate | 70%+ | Copy/share button clicks |
| Referral Signup Rate | 25%+ | Referred users who book |
| Celebrity Recognition | 60%+ recognize 3+ | Brand awareness survey |
| Atlanta Connection Feeling | 85%+ feel "local" | User perception survey |

---

## Phase 5 Complete Checklist

- [ ] AtlantaEventsCalendar component created & tested
- [ ] CelebrityLookbook component created & tested
- [ ] ReferralProgram component created & tested
- [ ] All components integrated into variant system
- [ ] EventsPage created
- [ ] ReferralPage created
- [ ] Celebrity permissions obtained
- [ ] Events data updated monthly
- [ ] Analytics events configured
- [ ] Referral tracking system implemented
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance benchmarks met (<3s TTI)
- [ ] TypeScript compilation successful (0 errors)
- [ ] Mobile testing on iOS & Android

**Phase 5 Duration**: 3 business days  
**Team**: 1 marketing specialist + 1 frontend developer + 1 community manager  
**Dependencies**: Phase 1-4 (brand trust established)

---

## Final Project Handoff

After Phase 5 completion, you should have:
1. ✅ Complete multi-variant professional services platform
2. ✅ Conversion-optimized booking flow (Phase 2)
3. ✅ Luxury positioning & social proof (Phase 3)
4. ✅ Digital revenue streams (Phase 4)
5. ✅ Hyper-local Atlanta advantage (Phase 5)
6. ✅ Scalable architecture for 20+ service types

**Ready for Production Deployment** 🚀

**Next Steps**:
- Phase 6: Performance Optimization & Analytics Deep Dive
- Phase 7: SEO & Content Marketing Strategy
- Phase 8: A/B Testing Framework Implementation
