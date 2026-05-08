"use client";

import React, { useEffect, useState } from "react";

interface RollingNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

const RollingNumber: React.FC<RollingNumberProps> = ({ value, duration = 1500, className }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic for a smooth finish
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(easeProgress * (value - startValue) + startValue);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span className={className}>{displayValue.toLocaleString()}</span>;
};

export default RollingNumber;