import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink, Filter, DollarSign } from 'lucide-react';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';
import type { AtlantaEvent } from '../../types/config';

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
              onChange={(e) => setDateRange(e.target.value as 'upcoming' | 'this-week' | 'this-month')}
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
