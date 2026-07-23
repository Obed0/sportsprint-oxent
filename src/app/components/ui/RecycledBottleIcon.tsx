import React from 'react';

interface BottleRecycleIconProps {
  className?: string;
  size?: number;
}

export function BottleRecycleIcon({ className = '', size = 28 }: BottleRecycleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 inline-block align-middle ${className}`}
    >
      {/* Bottle Silhouette Outline - Crisp Slate/Navy */}
      <path
        d="M12 3H18V6H12V3Z"
        fill="#334155"
      />
      <path
        d="M13.5 6V8.5C13.5 10 12.5 11.2 11.2 11.8C10.2 12.3 9.5 13.3 9.5 14.5V20.5"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 6V8.5C16.5 10 17.5 11.2 18.8 11.8C19.8 12.3 20.5 13.3 20.5 14.5V17"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 27.5V31.5C9.5 32.6 10.4 33.5 11.5 33.5H18.5C19.6 33.5 20.5 32.6 20.5 31.5V29"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 3 Green Recycling Arrows (Möbius Loop) - Bright Clear Green */}
      <g fill="#16A34A" stroke="#16A34A" strokeWidth="0.5">
        {/* Top Right Arrow line + head */}
        <path
          d="M23 15.5C25.5 14 28.5 14 30.5 16C32 17.5 32.5 19.5 32.5 21.5"
          stroke="#16A34A"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M30 23L33.5 22L34 18.5L30 23Z" />

        {/* Bottom Arrow line + head */}
        <path
          d="M32 24.5C32.5 27 31.5 29.5 29.5 31C27.5 32.5 24.5 32.5 22.5 31.5"
          stroke="#16A34A"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M21 33.5L21.5 29.5L25 31.5L21 33.5Z" />

        {/* Left Arrow line + head */}
        <path
          d="M20 29.5C18.5 27.5 18 24.5 19 22C20 19.5 21.5 17.5 23.5 16"
          stroke="#16A34A"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M25 15.5L22 18L21 14.5L25 15.5Z" />
      </g>
    </svg>
  );
}
