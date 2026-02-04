import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, User } from 'lucide-react';

interface Notification {
  id: string;
  name: string;
  action: string;
  minutesAgo: number; // Changed from string to number for dynamic calculation
  location?: string;
}

interface SocialProofProps {
  notifications?: Notification[];
  displayInterval?: number; // milliseconds between notifications
  maxVisible?: number;
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    name: 'John D.',
    action: 'booked a consultation',
    minutesAgo: 5,
    location: 'Atlanta, GA'
  },
  {
    id: '2',
    name: 'Sarah M.',
    action: 'requested case evaluation',
    minutesAgo: 12,
    location: 'Decatur, GA'
  },
  {
    id: '3',
    name: 'Michael R.',
    action: 'scheduled appointment',
    minutesAgo: 18,
    location: 'Marietta, GA'
  },
  {
    id: '4',
    name: 'Emily P.',
    action: 'booked a consultation',
    minutesAgo: 25,
    location: 'Roswell, GA'
  },
  {
    id: '5',
    name: 'David L.',
    action: 'requested callback',
    minutesAgo: 32,
    location: 'Sandy Springs, GA'
  }
];

export function SocialProof({ 
  notifications = defaultNotifications,
  displayInterval = 5000,
  maxVisible = 1
}: SocialProofProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, displayInterval);

    return () => clearInterval(timer);
  }, [notifications.length, displayInterval]);

  // Update elapsed time every minute
  useEffect(() => {
    const minuteTimer = setInterval(() => {
      setElapsedMinutes((prev) => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(minuteTimer);
  }, []);

  const currentNotification = notifications[currentIndex];
  
  // Calculate display time
  const getTimeAgo = (minutesAgo: number) => {
    const totalMinutes = minutesAgo + elapsedMinutes;
    if (totalMinutes < 60) {
      return `${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''} ago`;
    }
    const hours = Math.floor(totalMinutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <AnimatePresence mode="wait">
        {isVisible && currentNotification && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-green-500"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-green-100 rounded-full">
                  <User size={20} className="text-green-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {currentNotification.name}
                  </p>
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                </div>
                <p className="text-sm text-gray-600">
                  {currentNotification.action}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {getTimeAgo(currentNotification.minutesAgo)}
                  </span>
                  {currentNotification.location && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {currentNotification.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
