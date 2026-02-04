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
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(cutoffHour, cutoffMinute, 0, 0);

      // If past cutoff, set for tomorrow
      if (now > cutoff) {
        setIsPastCutoff(true);
        cutoff.setDate(cutoff.getDate() + 1);
      } else {
        setIsPastCutoff(false);
      }

      const diff = cutoff.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
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
