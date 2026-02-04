```prompt
# Phase 6: Technical "Weightlessness" Implementation

**Agent Type**: Performance Engineer + Senior Frontend Developer  
**Estimated Effort**: 4 business days  
**Priority**: MEDIUM - UX polish and retention  
**Target Demographic**: Legal service clients, ages 25-55, Metro Atlanta  
**Dependencies**: Phases 1-5 completed

---

## Cultural Context: The "Professional Excellence" of Browsing

For a 35-year-old Atlanta professional researching legal services during a busy day:
- **Speed = Credibility** ("If the website is slow, they're probably disorganized")
- **Smooth interactions = Trust** ("This feels professional, not amateur")
- **Zero friction = Respect** ("They value my time as much as I value theirs")
- **Instant answers = Confidence** ("The chatbot understands my legal needs")

**Key Insight**: Technical performance = **invisible professionalism**. If the site is slow or clunky, it undermines all the legal expertise you've built. The experience should feel as polished as the legal counsel itself.

---

## Task 1: "Case Study Navigation" (Story-Style UX)

### Current State
- Traditional navigation (header menu)
- Text-heavy case study pages
- No immersive browsing UX
- Missing mobile-first engagement

### Target State
**Instagram Story-Style Navigation** for case studies:
- Swipe up/down to browse case outcomes
- Tap left/right to see before/after legal situations
- Progress dots at top (like IG stories)
- "Hold to pause" on video testimonials

### Implementation Steps

#### 1.1: Create StoryNavigation Component

**Create File**: `src/components/StoryNavigation.tsx`

```typescript
import { useState, useEffect, useRef } from 'react';

interface Story {
  id: string;
  type: 'case-study' | 'testimonial' | 'service';
  media: {
    type: 'image' | 'video';
    url: string;
  };
  title: string;
  subtitle: string;
  outcome?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const CASE_STORIES: Story[] = [
  {
    id: 'immigration-1',
    type: 'case-study',
    media: {
      type: 'image',
      url: '/images/cases/immigration-success.jpg'
    },
    title: 'Family Reunification Victory',
    subtitle: 'K-1 Visa Approved in 4 Months',
    outcome: '100% Success Rate for This Case Type',
    ctaText: 'Start Your Case',
    ctaUrl: '/contact'
  },
  {
    id: 'divorce-1',
    type: 'case-study',
    media: {
      type: 'video',
      url: '/videos/testimonials/divorce-client.mp4'
    },
    title: 'Equitable Divorce Settlement',
    subtitle: '$2.3M Asset Division',
    outcome: 'Client Retained 70% of Marital Assets',
    ctaText: 'Free Consultation',
    ctaUrl: '/consultation'
  },
  {
    id: 'business-1',
    type: 'case-study',
    media: {
      type: 'image',
      url: '/images/cases/business-formation.jpg'
    },
    title: 'LLC Formation & Compliance',
    subtitle: 'Atlanta Tech Startup',
    outcome: 'Fully Compliant in 2 Weeks',
    ctaText: 'Business Services',
    ctaUrl: '/services/business'
  }
];

export function StoryNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStory = CASE_STORIES[currentIndex];
  const STORY_DURATION = 6000; // 6 seconds for legal content

  // Auto-advance progress bar
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextStory();
          return 0;
        }
        return prev + (100 / STORY_DURATION) * 50;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const goToNextStory = () => {
    if (currentIndex < CASE_STORIES.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    }
  };

  const goToPrevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // Swipe up = next story
    if (diff > 50) {
      goToNextStory();
    }
    // Swipe down = previous story
    else if (diff < -50) {
      goToPrevStory();
    }
  };

  const handleTapLeft = () => {
    goToPrevStory();
  };

  const handleTapRight = () => {
    goToNextStory();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gray-900 md:hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
        {CASE_STORIES.map((_, index) => (
          <div
            key={index}
            className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"
          >
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={() => {
          window.history.back();
        }}
        className="absolute top-6 right-6 z-20 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-all hover:bg-black/70"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Story Content */}
      <div className="relative h-full w-full">
        {/* Media */}
        {currentStory.media.type === 'image' ? (
          <img
            src={currentStory.media.url}
            alt={currentStory.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={currentStory.media.url}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

        {/* Story Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="mb-2 font-serif text-3xl text-white tracking-tight">
            {currentStory.title}
          </h2>
          <p className="mb-2 font-sans text-xl text-gray-300">
            {currentStory.subtitle}
          </p>
          {currentStory.outcome && (
            <p className="mb-6 font-sans text-sm text-emerald-400 uppercase tracking-wide">
              ✓ {currentStory.outcome}
            </p>
          )}

          {/* CTA Button */}
          {currentStory.ctaText && currentStory.ctaUrl && (
            <a
              href={currentStory.ctaUrl}
              className="inline-block rounded-full bg-blue-600 px-8 py-3 font-sans text-sm tracking-[0.2em] text-white uppercase transition-all hover:bg-blue-700"
            >
              {currentStory.ctaText}
            </a>
          )}
        </div>

        {/* Tap Zones (Left/Right) */}
        <div className="absolute inset-0 flex">
          <button
            onClick={handleTapLeft}
            className="flex-1 cursor-pointer"
            aria-label="Previous case study"
          />
          <button
            onClick={handleTapRight}
            className="flex-1 cursor-pointer"
            aria-label="Next case study"
          />
        </div>

        {/* Hold to Pause Indicator */}
        <button
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          className="absolute bottom-24 right-6 z-10 flex items-center space-x-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm"
        >
          <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            {isPaused ? (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            )}
          </svg>
          <span className="font-sans text-xs text-white uppercase tracking-wide">
            {isPaused ? 'Paused' : 'Hold to Pause'}
          </span>
        </button>
      </div>
    </div>
  );
}
```

---

## Task 2: "Legal Concierge Chatbot" (AI Assistant with Atlanta Legal Context)

### Cultural Context
Generic chatbots feel impersonal. An AI assistant that **knows Atlanta legal landscape**, **speaks professionally**, and **understands client urgency** = trust signal.

### Implementation Steps

#### 2.1: Create ConciergeChatbot Component

**Create File**: `src/components/ConciergeChatbot.tsx`

```typescript
import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What's your retainer fee?",
  "Do you handle Fulton County cases?",
  "How long does a divorce take in Georgia?",
  "Can I get a free consultation?",
  "Do you offer payment plans?",
];

const LEGAL_CONTEXT_RESPONSES = {
  fultonCounty: "Yes, we handle cases in Fulton County Superior Court, State Court, and Magistrate Court. We're familiar with all local court procedures and have established relationships with court staff. Most hearings are at the Fulton County Courthouse (136 Pryor Street). ⚖️",
  retainer: "Our retainer fees vary by practice area. Immigration cases typically start at $2,500, Family Law at $3,500, and Business Law at $5,000. We offer transparent flat-rate pricing for many services and payment plans for qualified clients. Schedule a free consultation to discuss your specific needs. 📋",
  divorce: "In Georgia, uncontested divorces can be finalized in 31 days (mandatory waiting period). Contested divorces typically take 6-12 months. Fulton County cases may move faster than other counties. We'll provide a realistic timeline during your consultation based on your specific circumstances. ⏱️",
  consultation: "Yes! We offer FREE 30-minute consultations for new clients. You can schedule online or call our office at (404) XXX-XXXX. We're located in Buckhead for in-person meetings or can meet virtually via Zoom. 🤝",
  paymentPlans: "We understand legal fees can be a burden. We offer flexible payment plans for qualified clients, typically requiring 30% down with monthly installments over 6-12 months. We also work with legal financing partners for larger cases. Let's discuss options during your consultation. 💳",
};

export function ConciergeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Leeha Haywood's AI assistant. I can answer questions about our legal services, fees, and the legal process in Georgia. How can I help you today? 👨‍⚖️",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (in production, call OpenAI API)
    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // Atlanta-specific legal responses
    if (lowerInput.includes('fulton') || lowerInput.includes('atlanta') || lowerInput.includes('county')) {
      return LEGAL_CONTEXT_RESPONSES.fultonCounty;
    }
    if (lowerInput.includes('retainer') || lowerInput.includes('fee') || lowerInput.includes('cost') || lowerInput.includes('price')) {
      return LEGAL_CONTEXT_RESPONSES.retainer;
    }
    if (lowerInput.includes('divorce') || lowerInput.includes('how long') || lowerInput.includes('timeline')) {
      return LEGAL_CONTEXT_RESPONSES.divorce;
    }
    if (lowerInput.includes('consultation') || lowerInput.includes('free') || lowerInput.includes('meet')) {
      return LEGAL_CONTEXT_RESPONSES.consultation;
    }
    if (lowerInput.includes('payment plan') || lowerInput.includes('financing') || lowerInput.includes('afford')) {
      return LEGAL_CONTEXT_RESPONSES.paymentPlans;
    }

    // Default response
    return "That's a great question! For detailed legal advice specific to your situation, I recommend scheduling a free consultation with Attorney Leeha Haywood. Call (404) XXX-XXXX or book online. 📞";
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all hover:scale-110"
        aria-label="Open legal assistant chat"
      >
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex h-[600px] w-[400px] flex-col rounded-lg border border-gray-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-blue-600 p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xl">⚖️</span>
          </div>
          <div>
            <h3 className="font-serif text-lg text-white tracking-tight">
              Legal Assistant
            </h3>
            <p className="font-sans text-xs text-white/90">
              Online now
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full bg-white/20 p-2 transition-all hover:bg-white/30"
          aria-label="Close chat"
        >
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="font-sans text-sm leading-relaxed">
                {message.content}
              </p>
              <p className="mt-1 font-sans text-xs opacity-60">
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-white border border-gray-200 px-4 py-3">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="border-t border-gray-200 bg-white p-4">
          <p className="mb-3 font-sans text-xs text-gray-500 uppercase tracking-wide">
            Popular Questions
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="rounded-full border border-gray-300 px-3 py-1 font-sans text-xs text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4 rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputValue);
              }
            }}
            placeholder="Ask a legal question..."
            className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 font-sans text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className={`rounded-full p-3 transition-all ${
              inputValue.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Task 3: Performance Optimization (Core Web Vitals)

### Cultural Context
**Speed = Professionalism**. If the legal website is slow, clients will question the firm's competence.

### Implementation Steps

#### 3.1: Image Optimization

**Create Script**: `scripts/optimize-images.js`

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
  'public/images/team',
  'public/images/cases',
  'public/images/office',
  'public/images/testimonials',
  'public/images/hero',
];

const SIZES = {
  thumbnail: 400,
  medium: 800,
  large: 1200,
  hero: 1920,
};

async function optimizeImages() {
  console.log('🖼️  Optimizing legal website images...\n');

  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Skipping ${dir} (not found)`);
      continue;
    }

    const files = fs.readdirSync(dir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    for (const file of files) {
      const inputPath = path.join(dir, file);
      const filename = path.parse(file).name;
      const ext = 'webp';

      for (const [sizeName, width] of Object.entries(SIZES)) {
        const outputPath = path.join(dir, `${filename}-${sizeName}.${ext}`);
        
        await sharp(inputPath)
          .resize(width, null, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 90 }) // Higher quality for professional images
          .toFile(outputPath);

        console.log(`✅ Created: ${outputPath}`);
      }
    }
  }
}

optimizeImages().then(() => {
  console.log('\n🎉 Image optimization complete!');
  console.log('💡 Remember to update image src attributes to use WebP format');
});
```

**Install and Run**:
```bash
npm install sharp --save-dev
node scripts/optimize-images.js
```

#### 3.2: Code Splitting & Lazy Loading

**Update**: `src/App.tsx`

```typescript
import { lazy, Suspense } from 'react';

// Lazy load below-the-fold components
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const TeamProfiles = lazy(() => import('./components/TeamProfiles'));
const BlogSection = lazy(() => import('./components/BlogSection'));

function App() {
  return (
    <div>
      {/* Critical above-the-fold content (no lazy loading) */}
      <Navigation />
      <HeroSection />
      <ServicesOverview />

      {/* Below-the-fold content (lazy loaded) */}
      <Suspense fallback={<LoadingSpinner />}>
        <CaseStudies />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <TeamProfiles />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <BlogSection />
      </Suspense>

      <Footer />
    </div>
  );
}
```

#### 3.3: Add Loading Spinner Component

**Create File**: `src/components/LoadingSpinner.tsx`

```typescript
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-label="Loading content">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
    </div>
  );
}
```

#### 3.4: Preload Critical Assets

**Update**: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Preload critical fonts -->
    <link rel="preload" href="/fonts/serif-display.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/sans-body.woff2" as="font" type="font/woff2" crossorigin />
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    
    <title>Leeha Haywood Universal Law Firm - Atlanta Legal Services</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Testing Checklist

### Performance Metrics (Lighthouse)
- [ ] **LCP** (Largest Contentful Paint): <2.5 seconds
- [ ] **FID** (First Input Delay): <100 milliseconds
- [ ] **CLS** (Cumulative Layout Shift): <0.1
- [ ] **Performance Score**: 90+ on mobile, 95+ on desktop
- [ ] **Accessibility Score**: 95+ on all devices
- [ ] **SEO Score**: 95+ (legal industry ranking factor)

### UX Testing
- [ ] Case study story navigation swipes work (up/down)
- [ ] Tap left/right advances stories correctly
- [ ] Chatbot responds with Atlanta legal context
- [ ] Suggested legal questions populate
- [ ] All images lazy load (verify in Network tab)
- [ ] Keyboard navigation works (Tab, Enter, Escape)

### Browser Testing
- [ ] Safari (iOS 15+) - Common for mobile legal research
- [ ] Chrome (Android 11+)
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Internet Explorer 11 (if corporate clients require)

### Mobile Testing
- [ ] iPhone SE (375x667) - Smallest common viewport
- [ ] iPhone 12 Pro (390x844) - Popular device
- [ ] iPad Air (820x1180) - Tablet research
- [ ] Samsung Galaxy S21 (360x800) - Android

---

## Performance Budget

| Resource Type | Budget | Current | Status |
|---------------|--------|---------|--------|
| **Total Page Size** | <2MB | TBD | ⏳ |
| **JavaScript** | <300KB | TBD | ⏳ |
| **Images** | <1MB | TBD | ⏳ |
| **Fonts** | <100KB | TBD | ⏳ |
| **First Paint** | <1.2s | TBD | ⏳ |
| **Time to Interactive** | <3.0s | TBD | ⏳ |

---

## Accessibility Compliance (WCAG 2.1 AA)

### Requirements
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on all icons and buttons
- [ ] Skip navigation links for screen readers
- [ ] Form fields have associated labels
- [ ] Error messages are descriptive and helpful
- [ ] Video content has captions (if used)

### Screen Reader Testing
- [ ] VoiceOver (macOS/iOS)
- [ ] NVDA (Windows)
- [ ] JAWS (Windows - legal industry standard)

---

## Definition of Done

- [ ] Case study story navigation implemented (mobile optimized)
- [ ] Legal concierge chatbot with Atlanta context
- [ ] All images optimized (WebP format, 4 sizes)
- [ ] Code splitting implemented (lazy loading)
- [ ] Lighthouse score 90+ mobile, 95+ desktop
- [ ] Core Web Vitals pass (LCP, FID, CLS)
- [ ] WCAG 2.1 AA compliance verified
- [ ] All components keyboard accessible
- [ ] Screen reader tested (VoiceOver + JAWS)
- [ ] Code reviewed and merged to main branch

---

## Security Considerations

### Legal Industry Requirements
- [ ] HTTPS enforced (redirect HTTP → HTTPS)
- [ ] No sensitive client data in client-side code
- [ ] Contact forms use CSRF protection
- [ ] Chatbot logs don't store PII
- [ ] Third-party scripts audited (Google Analytics, etc.)

### Privacy Compliance
- [ ] Cookie consent banner (GDPR/CCPA)
- [ ] Privacy policy linked in footer
- [ ] Client portal uses secure authentication
- [ ] Chat transcripts comply with attorney-client privilege

---

**Final Phase Complete!**

**Estimated Timeline**: 4 business days  
**Priority**: MEDIUM - UX polish and client retention  
**Dependencies**: Phases 1-5 completed

---

**Created**: February 3, 2026  
**Status**: ✅ Ready for Development  
**Owner**: Leeha Haywood Universal Law Firm Development Team

```
