# HAYWOOD UNIVERSAL - PAGE TEMPLATES PROMPT
## Service Pages, Property Pages, and Layout Templates

---

## LAYOUT COMPONENTS

### File: `src/components/layout/Header.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Tax Preparation', href: '/services/tax-preparation' },
      { name: 'Property Management', href: '/services/property-management' },
      { name: 'Vehicle Rentals', href: '/services/vehicle-rentals' },
      { name: 'Truck Driving', href: '/services/truck-driving' },
      { name: 'Real Estate Education', href: '/services/real-estate-education' },
      { name: 'Project Management', href: '/services/project-management' },
    ],
  },
  { name: 'Properties', href: '/properties' },
  { name: 'Events', href: '/events' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-sticky transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-4'
          : 'bg-white/95 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Haywood Universal"
              width={180}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className="flex items-center gap-1 text-neutral-900 font-medium hover:text-primary-600 transition-colors">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 py-2"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-neutral-900 font-medium hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:6782749182" className="flex items-center gap-2 text-neutral-700 hover:text-primary-600">
              <Phone className="w-4 h-4" />
              <span className="font-medium">(678) 274-9182</span>
            </a>
            <Link href="/contact" className="btn btn-primary btn-md">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className="w-full flex items-center justify-between px-4 py-3 text-neutral-900 font-medium hover:bg-neutral-100 rounded-lg"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block px-4 py-2 text-neutral-700 hover:text-primary-600"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-neutral-900 font-medium hover:bg-neutral-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-4 py-3 space-y-3 border-t border-neutral-200 mt-4 pt-4">
                  <a href="tel:6782749182" className="flex items-center gap-2 text-neutral-700">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">(678) 274-9182</span>
                  </a>
                  <Link
                    href="/contact"
                    className="btn btn-primary btn-md w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
```

### File: `src/components/layout/Footer.tsx`

```typescript
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Tax Preparation', href: '/services/tax-preparation' },
    { name: 'Property Management', href: '/services/property-management' },
    { name: 'Vehicle Rentals', href: '/services/vehicle-rentals' },
    { name: 'Truck Driving', href: '/services/truck-driving' },
    { name: 'Real Estate Education', href: '/services/real-estate-education' },
    { name: 'Project Management', href: '/services/project-management' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ],
  resources: [
    { name: 'Tax Calculator', href: '/tools/tax-calculator' },
    { name: 'Property Search', href: '/properties' },
    { name: 'Events Calendar', href: '/events' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Help Center', href: '/help' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/notyouraveragepreneur/' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-white.png"
                alt="Haywood Universal"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Your trusted partner for taxes, property management, and wealth building in Metro Atlanta.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-neutral-300">
                  3379 Peachtree Rd NE Suite 655-S40<br />
                  Atlanta, GA 30326
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a href="tel:6782749182" className="text-neutral-300 hover:text-white">
                  (678) 274-9182
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a href="mailto:info@haywooduniversal.com" className="text-neutral-300 hover:text-white">
                  info@haywooduniversal.com
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Stay Connected</h3>
            <p className="text-neutral-300 text-sm mb-4">
              Get updates on new properties, events, and tax tips.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="w-full btn btn-primary btn-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Haywood Universal LLC. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-neutral-400 text-sm">
              {footerLinks.legal.map((link, index) => (
                <span key={link.name}>
                  {index > 0 && <span className="mx-2">·</span>}
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

### File: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter, Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Haywood Universal | Tax Prep, Property Management & More in Atlanta',
  description: 'Metro Atlanta\'s trusted partner for tax preparation, property management, vehicle rentals, and real estate education. Serving the African American community for 10+ years.',
  keywords: 'tax preparation atlanta, property management atlanta, vehicle rentals atlanta, real estate seminars atlanta',
  openGraph: {
    title: 'Haywood Universal | Multi-Service Provider in Metro Atlanta',
    description: 'Comprehensive financial and property services for Metro Atlanta professionals',
    url: 'https://haywooduniversal.com',
    siteName: 'Haywood Universal',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haywood Universal',
    description: 'Metro Atlanta\'s trusted multi-service provider',
    images: ['/images/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Header />
        <main className="pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## SERVICE PAGE TEMPLATE

### File: `src/app/services/[slug]/page.tsx`

```typescript
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ArrowRight, Calendar } from 'lucide-react'
import ServiceCTA from '@/components/services/ServiceCTA'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import RelatedServices from '@/components/services/RelatedServices'

// This would come from your CMS or database
const services = {
  'tax-preparation': {
    title: 'Tax Preparation Services',
    subtitle: 'Expert Tax Filing to Maximize Your Refund',
    description: 'Professional tax preparation services for individuals, families, and businesses in Metro Atlanta. We specialize in maximizing deductions and ensuring compliance with all federal and state tax laws.',
    hero: '/images/services/tax-hero.jpg',
    icon: '📊',
    benefits: [
      'Maximize your tax refund with expert guidance',
      'Individual, business, and specialized returns',
      'Year-round tax planning and support',
      'IRS audit defense and representation',
      'Electronic filing for faster refunds',
      'Quarterly tax estimates for self-employed',
    ],
    services: [
      {
        name: 'Individual Tax Returns',
        price: 'Starting at $150',
        description: 'Complete preparation of federal and state returns including W-2s, 1099s, and common deductions.',
        features: ['Federal return', 'State return', 'E-filing', 'Tax planning advice'],
      },
      {
        name: 'Business Tax Returns',
        price: 'Starting at $500',
        description: 'Comprehensive tax preparation for LLCs, S-Corps, partnerships, and sole proprietors.',
        features: ['All business forms', 'Quarterly estimates', 'Tax strategy', 'Year-round support'],
      },
      {
        name: 'Real Estate Investor Package',
        price: 'Starting at $400',
        description: 'Specialized tax services for rental property owners and real estate investors.',
        features: ['Multiple properties', 'Depreciation schedules', '1031 exchange support', 'Passive loss tracking'],
      },
      {
        name: 'Truck Driver Special',
        price: 'Starting at $200',
        description: 'Optimized for truck drivers with per diem, equipment depreciation, and industry-specific deductions.',
        features: ['Per diem calculations', 'Equipment depreciation', 'Home office deduction', 'Mileage tracking'],
      },
    ],
    process: [
      {
        step: 1,
        title: 'Book Consultation',
        description: 'Schedule a free consultation to discuss your tax situation and needs.',
      },
      {
        step: 2,
        title: 'Gather Documents',
        description: 'We provide a checklist of all documents needed for your return.',
      },
      {
        step: 3,
        title: 'File Your Return',
        description: 'Our experts prepare and file your return electronically.',
      },
      {
        step: 4,
        title: 'Get Your Refund',
        description: 'Receive your refund via direct deposit in as little as 10 days.',
      },
    ],
    faqs: [
      {
        question: 'How much does tax preparation cost?',
        answer: 'Our fees vary based on the complexity of your return. Individual returns start at $150, while business returns start at $500. We provide a free quote during your consultation.',
      },
      {
        question: 'What documents do I need to bring?',
        answer: 'For most returns, you\'ll need W-2s, 1099s, receipts for deductions, last year\'s tax return, and identification. We\'ll provide a personalized checklist after your consultation.',
      },
      {
        question: 'How long does it take to file my return?',
        answer: 'Most returns are completed within 3-5 business days of receiving all documents. Rush service is available for an additional fee.',
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes! We offer flexible payment plans up to 36 months with no interest for qualified clients.',
      },
      {
        question: 'What if I get audited?',
        answer: 'We provide audit defense services and will represent you before the IRS if needed. This service is included with our Premium package or available as an add-on.',
      },
    ],
  },
  // Add other services...
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }))
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={service.hero}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-900/70" />
        <div className="container-custom relative z-10 text-center text-white">
          <div className="text-6xl mb-4">{service.icon}</div>
          <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-4">
            {service.title}
          </h1>
          <p className="text-xl lg:text-2xl text-neutral-200 max-w-3xl mx-auto mb-8">
            {service.subtitle}
          </p>
          <Link href="#contact" className="btn btn-primary btn-lg">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Consultation
          </Link>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-neutral-700 leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-success-600 flex-shrink-0 mt-1" />
                  <span className="text-neutral-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services/Packages */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Service Packages
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.services.map((pkg, index) => (
              <div key={index} className="card">
                <h3 className="text-2xl font-heading font-bold mb-2">
                  {pkg.name}
                </h3>
                <div className="text-3xl font-bold text-primary-600 mb-4">
                  {pkg.price}
                </div>
                <p className="text-neutral-600 mb-6">
                  {pkg.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-success-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-outline btn-md w-full">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ServiceFAQ faqs={service.faqs} />

      {/* CTA */}
      <ServiceCTA
        title="Ready to Get Started?"
        description="Schedule your free consultation today and let's maximize your tax refund."
      />

      {/* Related Services */}
      <RelatedServices currentService={params.slug} />
    </div>
  )
}
```

---

## PROPERTY LISTING PAGE

### File: `src/app/properties/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, SlidersHorizontal, Bed, Bath, Square, MapPin } from 'lucide-react'
import { properties } from '@/data/properties'

const PropertyListings = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    neighborhood: '',
    petFriendly: false,
  })

  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero/Search */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-heading font-bold mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-xl text-neutral-300 mb-8">
            Quality rentals in Metro Atlanta's best neighborhoods
          </p>

          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by neighborhood, address, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-neutral-900"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline btn-lg"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="$1000"
                    className="w-full px-4 py-2 rounded-lg text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="$5000"
                    className="w-full px-4 py-2 rounded-lg text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Bedrooms</label>
                  <select className="w-full px-4 py-2 rounded-lg text-neutral-900">
                    <option>Any</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Bathrooms</label>
                  <select className="w-full px-4 py-2 rounded-lg text-neutral-900">
                    <option>Any</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Neighborhood</label>
                  <select className="w-full px-4 py-2 rounded-lg text-neutral-900">
                    <option>All</option>
                    <option>Buckhead</option>
                    <option>Midtown</option>
                    <option>Decatur</option>
                    {/* Add more neighborhoods */}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Pet Friendly</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Parking</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>In-Unit Laundry</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-neutral-700">
                Showing <span className="font-semibold">{properties.length}</span> properties
              </p>
            </div>
            <select className="px-4 py-2 rounded-lg border border-neutral-300">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>

          {/* Property Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link key={property.id} href={`/properties/${property.id}`}>
                <div className="card group">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold">
                        {property.status}
                      </span>
                    </div>
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
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary-600 text-white">
              1
            </button>
            <button className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100">
              3
            </button>
            <button className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PropertyListings
```

---

This covers the main page templates. Would you like me to create one more prompt file with:
- Dashboard templates
- Form components
- Utility functions
- Package.json with all dependencies?
