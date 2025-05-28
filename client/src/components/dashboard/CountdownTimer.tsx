import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const { hours, minutes, seconds } = useCountdown(targetTime);

  // Format numbers to ensure 2 digits
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex space-x-2">
      <div className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-center min-w-[40px]">
        <p className="text-xl font-semibold text-neutral-900 dark:text-white">
          {formatNumber(hours)}
        </p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">hrs</p>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-center min-w-[40px]">
        <p className="text-xl font-semibold text-neutral-900 dark:text-white">
          {formatNumber(minutes)}
        </p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">min</p>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-center min-w-[40px]">
        <p className="text-xl font-semibold text-neutral-900 dark:text-white">
          {formatNumber(seconds)}
        </p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">sec</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
