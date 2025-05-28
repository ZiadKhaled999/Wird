import React from 'react';

const CalligraphyBackground: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="bg-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M20 20 L80 20 L80 80 L20 80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-pattern)" />
    </svg>
  );
};

export default CalligraphyBackground;
