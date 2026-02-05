# HAYWOOD UNIVERSAL - COMPONENTS PROMPT
## Homepage Sections & Reusable Components

---

## HOMEPAGE COMPONENTS (Continued)

### File: `src/components/home/ServicesGrid.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calculator, Home, Car, Truck, GraduationCap, FolderKanban } from 'lucide-react'

const services = [
  {
    id: 'tax-preparation',
    icon: Calculator,
    title: 'Tax Preparation',
    description: 'Expert tax filing services to maximize your refund and minimize stress. Individual, business, and specialized returns.',
    features: ['Individual Returns', 'Business Taxes', 'Quarterly Estimates', 'Audit Support'],
    color: 'primary',
    href: '/services/tax-preparation'
  },
  {
    id: 'property-management',
    icon: Home,
    title: 'Property Management',
    description: 'Full-service property management for houses and rooms. Tenant screening, rent collection, and maintenance coordination.',
    features: ['Tenant Screening', 'Rent Collection', 'Maintenance', '24/7 Support'],
    color: 'secondary',
    href: '/services/property-management'
  },
  {
    id: 'vehicle-rentals',
    icon: Car,
    title: 'Vehicle Rentals',
    description: 'Flexible car rental options for personal and business needs. Daily, weekly, and monthly rates available.',
    features: ['Cars & SUVs', 'Flexible Terms', 'Insurance Options', 'Airport Pickup'],
    color: 'accent',
    href: '/services/vehicle-rentals'
  },
  {
    id: 'truck-driving',
    icon: Truck,
    title: 'Truck Driving Services',
    description: 'Professional truck driving services and CDL driver placement. Competitive pay and benefits.',
    features: ['CDL Jobs', 'Load Matching', 'Weekly Pay', 'Benefits'],
    color: 'success',
    href: '/services/truck-driving'
  },
  {
    id: 'real-estate-education',
    icon: GraduationCap,
    title: 'Real Estate Education',
    description: 'Learn to invest in real estate through our seminars, workshops, and courses. Build generational wealth.',
    features: ['Live Seminars', 'Online Courses', 'Networking', 'Mentorship'],
    color: 'info',
    href: '/services/real-estate-education'
  },
  {
    id: 'project-management',
    icon: FolderKanban,
    title: 'Project Management',
    description: 'Professional project management services for renovations, flips, and new construction projects.',
    features: ['Planning', 'Budgeting', 'Vendor Mgmt', 'Completion'],
    color: 'warning',
    href: '/services/project-management'
  }
]

const ServicesGrid = () => {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Comprehensive Services for <span className="text-gradient">Your Success</span>
          </h2>
          <p className="text-xl text-neutral-600">
            From taxes to real estate, we provide all the services you need to build and manage wealth in Metro Atlanta.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <div className="card group cursor-pointer h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-${service.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-neutral-700">
                        <svg className={`w-4 h-4 mr-2 text-${service.color}-600`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-neutral-600 mb-6">
            Not sure which service you need? We can help.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Schedule a Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesGrid
```

### File: `src/components/home/FeaturedProperties.tsx`

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react'
import { featuredProperties } from '@/data/properties'

const FeaturedProperties = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-2">
              Featured Properties
            </h2>
            <p className="text-xl text-neutral-600">
              Quality rentals in Metro Atlanta's best neighborhoods
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/properties" className="btn btn-outline btn-md group">
              View All Properties
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.slice(0, 6).map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/properties/${property.id}`}>
                <div className="card overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-secondary-900">
                        {property.status}
                      </span>
                    </div>
                    {/* Price */}
                    <div className="absolute bottom-4 left-4">
                      <div className="px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm">
                        <span className="text-2xl font-bold text-secondary-900">
                          ${property.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-neutral-600">/month</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-neutral-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-sm text-neutral-700 pb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {property.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-neutral-100 rounded-md">
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-md">
                          +{property.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
```

### File: `src/components/home/WhyChooseUs.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, Users, Award, Clock, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Trusted Expertise',
    description: 'Over 10 years serving Metro Atlanta with licensed professionals and proven results.',
    color: 'primary'
  },
  {
    icon: Heart,
    title: 'Community Focused',
    description: 'We understand the unique needs of Atlanta's African American community and tailor our services accordingly.',
    color: 'secondary'
  },
  {
    icon: Users,
    title: 'One-Stop Solution',
    description: 'All your financial, property, and business needs under one roof. Save time and simplify your life.',
    color: 'accent'
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    description: 'A+ BBB rating and 98% customer satisfaction. We deliver excellence in everything we do.',
    color: 'success'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for urgent matters. We're here when you need us.',
    color: 'info'
  },
  {
    icon: TrendingUp,
    title: 'Growth Partners',
    description: 'We don't just provide services—we help you build long-term wealth and success.',
    color: 'warning'
  }
]

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Why Metro Atlanta <span className="text-gradient">Chooses Us</span>
          </h2>
          <p className="text-xl text-neutral-300">
            More than just services—we're your partners in building a successful future.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className={`w-14 h-14 rounded-xl bg-${benefit.color}-500/20 flex items-center justify-center mb-6`}>
                <benefit.icon className={`w-7 h-7 text-${benefit.color}-400`} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">
                {benefit.title}
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-neutral-300 mb-6">
            Ready to experience the difference?
          </p>
          <button className="btn btn-primary btn-lg glow-primary">
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
```

### File: `src/components/home/Testimonials.tsx`

```typescript
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = testimonials.length - 1
      if (nextIndex >= testimonials.length) nextIndex = 0
      return nextIndex
    })
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-neutral-600">
            Real stories from real people who've achieved success with us.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary-600" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary-500 text-primary-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-xl md:text-2xl text-neutral-700 text-center mb-8 leading-relaxed font-medium">
                  "{currentTestimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-heading font-bold text-xl text-secondary-900">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-neutral-600">
                      {currentTestimonial.title}
                    </div>
                    <div className="text-sm text-neutral-500 mt-1">
                      {currentTestimonial.service}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary-500'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
```

### File: `src/components/home/UpcomingEvents.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import { upcomingEvents } from '@/data/events'

const UpcomingEvents = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-2">
              Upcoming Events
            </h2>
            <p className="text-xl text-neutral-600">
              Join our seminars and workshops to level up your financial knowledge
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/events" className="btn btn-outline btn-md group">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/events/${event.id}`}>
                <div className="card group h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white rounded-lg p-3 text-center shadow-lg">
                        <div className="text-2xl font-bold text-secondary-900">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs font-semibold text-primary-600 uppercase">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </div>
                    {/* Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 text-sm text-neutral-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary-600" />
                        <span>{event.seatsAvailable} seats available</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-200">
                      <div>
                        {event.price === 0 ? (
                          <span className="text-xl font-bold text-success-600">FREE</span>
                        ) : (
                          <div>
                            <span className="text-2xl font-bold text-secondary-900">
                              ${event.price}
                            </span>
                            <span className="text-sm text-neutral-600">/person</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                        Register
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents
```

### File: `src/components/home/InstagramFeed.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const InstagramFeed = () => {
  // In production, fetch from Instagram API
  const instagramPosts = [
    { id: 1, image: '/images/instagram/1.jpg', link: '#' },
    { id: 2, image: '/images/instagram/2.jpg', link: '#' },
    { id: 3, image: '/images/instagram/3.jpg', link: '#' },
    { id: 4, image: '/images/instagram/4.jpg', link: '#' },
    { id: 5, image: '/images/instagram/5.jpg', link: '#' },
    { id: 6, image: '/images/instagram/6.jpg', link: '#' },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-primary-600" />
            <h2 className="text-4xl font-heading font-bold">
              @notyouraveragepreneur
            </h2>
          </div>
          <p className="text-xl text-neutral-600">
            Follow us for daily inspiration, tips, and behind-the-scenes content
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/80 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/notyouraveragepreneur/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default InstagramFeed
```

### File: `src/components/home/Newsletter.tsx`

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Mail className="w-8 h-8" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get exclusive tax tips, property listings, and event invitations delivered to your inbox.
          </p>

          {/* Form */}
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <CheckCircle className="w-16 h-16 text-white" />
              <p className="text-2xl font-semibold">Thank you for subscribing!</p>
              <p className="text-white/80">Check your inbox for a confirmation email.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-secondary-900 text-white rounded-lg font-semibold hover:bg-secondary-800 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <p className="text-sm text-white/70 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
```

---

## DATA FILES

### File: `src/data/properties.ts`

```typescript
export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  neighborhood: string
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  amenities: string[]
  status: 'Available' | 'Pending' | 'Rented'
  featured: boolean
  petFriendly: boolean
  parking: string
  laundry: string
  hvac: string
  availableDate: string
}

export const featuredProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Buckhead Apartment',
    description: 'Luxurious 2-bedroom apartment in the heart of Buckhead...',
    price: 2200,
    location: 'Buckhead, Atlanta',
    neighborhood: 'Buckhead',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    images: ['/images/properties/buckhead-1.jpg'],
    amenities: ['Pool', 'Gym', 'Parking', 'Pet Friendly'],
    status: 'Available',
    featured: true,
    petFriendly: true,
    parking: 'Garage',
    laundry: 'In-Unit',
    hvac: 'Central',
    availableDate: '2026-03-01'
  },
  // Add 5 more properties...
]
```

### File: `src/data/testimonials.ts`

```typescript
export interface Testimonial {
  id: string
  name: string
  title: string
  company?: string
  service: string
  text: string
  image: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    title: 'Small Business Owner',
    service: 'Tax Preparation',
    text: 'Haywood Universal saved me over $15,000 on my business taxes this year. Their expertise and attention to detail is unmatched!',
    image: '/images/testimonials/marcus.jpg',
    rating: 5
  },
  // Add more testimonials...
]
```

### File: `src/data/events.ts`

```typescript
export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'Seminar' | 'Workshop' | 'Webinar' | 'Networking'
  price: number
  seatsTotal: number
  seatsAvailable: number
  image: string
  featured: boolean
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Real Estate Investing 101: Building Wealth in Atlanta',
    description: 'Learn the fundamentals of real estate investing...',
    date: '2026-03-15',
    time: '6:00 PM - 8:00 PM',
    location: 'Downtown Atlanta Conference Center',
    type: 'Seminar',
    price: 49,
    seatsTotal: 100,
    seatsAvailable: 23,
    image: '/images/events/investing-101.jpg',
    featured: true
  },
  // Add more events...
]
```

---

This prompt file contains all homepage sections. Next prompt file will include page templates and layouts. Ready to continue?
