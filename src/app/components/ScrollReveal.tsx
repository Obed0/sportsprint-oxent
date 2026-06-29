import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getDirectionStyles = () => {
    if (shouldReduceMotion) {
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    }
    switch (direction) {
      case 'up':
        return { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
      case 'down':
        return { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } };
      case 'left':
        return { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } };
      case 'right':
        return { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } };
      default:
        return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    }
  };

  const { initial, animate } = getDirectionStyles();

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
