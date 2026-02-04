import { useState, useEffect } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface UrgencyTimerProps {
  cutoffHour: number; // 24-hour format (e.g., 14 for 2PM)
  cutoffMinute?: number;
  timezone?: string;
  message: string;
  completedMessage: string;
  variant?: 'default' | 'urgent' | 'success';
}

export function UrgencyTimer({
  cutoffHour,
  cutoffMinute = 0,
  timezone = 'America/New_York', // Atlanta timezone
  message,
  completedMessage,
  variant = 'default'
}: UrgencyTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isPastCutoff, setIsPastCutoff] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Get current time in the specified timezone
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      });
      
      const parts = formatter.formatToParts(now);
      const currentHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
      const currentMinute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
      const currentSecond = parseInt(parts.find(p => p.type === 'second')?.value || '0');
      
      // Calculate cutoff time in seconds from midnight
      const cutoffSeconds = cutoffHour * 3600 + cutoffMinute * 60;
      const currentSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;
      
      // Check if past cutoff
      if (currentSeconds >= cutoffSeconds) {
        setIsPastCutoff(true);
        // Calculate time until cutoff tomorrow
        const diff = (24 * 3600) - currentSeconds + cutoffSeconds;
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setIsPastCutoff(false);
        // Calculate time until cutoff today
        const diff = cutoffSeconds - currentSeconds;
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [cutoffHour, cutoffMinute, timezone]);

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
            <span className="text-2xl font-bold tabular-nums" aria-live="polite">{timeRemaining}</span>
            <span className="text-xs text-gray-600">remaining</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
