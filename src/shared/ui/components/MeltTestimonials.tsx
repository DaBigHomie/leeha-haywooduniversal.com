import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '../../types/config';

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

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setPlayingVideo(null);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setPlayingVideo(null);
  };

  useEffect(() => {
    if (!autoplay || isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, isPaused, autoplayInterval, nextTestimonial]);

  const highlightKeywords = (text: string, keywords?: string[]) => {
    if (!keywords || keywords.length === 0) return text;

    let highlightedText = text;
    keywords.forEach((keyword) => {
      // Escape special regex characters
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedKeyword})`, 'gi');
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
