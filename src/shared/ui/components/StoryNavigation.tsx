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
      type: 'image',
      url: '/images/cases/divorce-settlement.jpg'
    },
    title: 'Equitable Divorce Settlement',
    subtitle: '$2.3M Asset Division',
    outcome: 'Client Retained 70% of Marital Assets',
    ctaText: 'Free Consultation',
    ctaUrl: '/contact'
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
    ctaUrl: '/services'
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

  const handleClose = () => {
    window.history.back();
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
        onClick={handleClose}
        className="absolute top-6 right-6 z-20 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-all hover:bg-black/70"
        aria-label="Close story navigation"
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
          aria-label={isPaused ? 'Resume story' : 'Pause story'}
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
