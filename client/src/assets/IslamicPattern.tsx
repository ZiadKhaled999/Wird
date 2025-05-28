import React from 'react';

const IslamicPattern: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.15"
          />
          <path
            d="M50 0 L100 25 L50 50 L0 25 Z M50 50 L100 75 L50 100 L0 75 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
};

export default IslamicPattern;
