import React from 'react';
import { motion } from 'motion/react';

interface BreathabilityIconProps {
  linesCount: 1 | 2 | 3 | 4;
  className?: string;
  size?: number;
}

export function BreathabilityIcon({ linesCount = 3, className = '', size = 28 }: BreathabilityIconProps) {
  // Balanced Y positions inside a 36px height viewBox for maximum vertical spacing and clarity
  const lineYMap: Record<number, number[]> = {
    1: [18],
    2: [12, 24],
    3: [9, 18, 27],
    4: [7, 14, 21, 28],
  };

  const yPositions = lineYMap[linesCount] || lineYMap[3];

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center shrink-0 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 42 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-black"
      >
        {/* Fabric Frame - Solid/Continuous Line with premium stroke weight */}
        <rect
          x="15"
          y="3"
          width="12"
          height="30"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />

        {/* Dynamic Airflow Curved Lines (Black) with Arrowheads */}
        {yPositions.map((y, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.g
              key={idx}
              initial={{ opacity: 0, x: isEven ? -6 : 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
            >
              {isEven ? (
                /* Airflow going Left-to-Right (Arrows in Black/currentColor) */
                <>
                  <path
                    d={`M 4 ${y} C 12 ${y + 2.5}, 20 ${y - 2.5}, 28 ${y}`}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 26 ${y - 3} L 31 ${y} L 26 ${y + 3}`}
                    fill="currentColor"
                  />
                </>
              ) : (
                /* Airflow going Right-to-Left (Arrows in Black/currentColor) */
                <>
                  <path
                    d={`M 38 ${y} C 30 ${y + 2.5}, 22 ${y - 2.5}, 14 ${y}`}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 16 ${y - 3} L 11 ${y} L 16 ${y + 3}`}
                    fill="currentColor"
                  />
                </>
              )}
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}

export function getBreathabilityLevel(breathabilityText: string): 1 | 2 | 3 | 4 {
  const text = breathabilityText.toLowerCase();
  if (text.includes('ultra') || text.includes('extrema')) return 4;
  if (text.includes('excelente') || text.includes('alta')) return 3;
  if (text.includes('buena') || text.includes('media')) return 2;
  return 1;
}
