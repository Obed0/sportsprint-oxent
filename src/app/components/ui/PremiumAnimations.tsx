import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router';

interface MagneticProps {
  children: React.ReactNode;
  range?: number;
  actionRange?: number;
  className?: string;
}

export function Magnetic({ children, range = 50, actionRange = 0.35, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  // Safely detect touch/hover capabilities
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setCanHover(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth organic fluid movement at 60fps
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canHover || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range * 2) {
      x.set(distanceX * actionRange);
      y.set(distanceY * actionRange);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!canHover) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className = '' }: TextRevealProps) {
  const words = text.split(' ');

  const containerVars = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVars = {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <motion.span
      variants={containerVars}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
          <motion.span variants={itemVars} className="inline-block origin-bottom">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({ children, className = '', delay = 0 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 25 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1], // Organic ease-out expo
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ParallaxImage({
  src,
  alt,
  className = '',
  yOffset = 40,
  scale = 1.08,
  objectFit = 'cover',
  loading = 'lazy',
  objectPosition = 'center',
}: {
  src: string;
  alt: string;
  className?: string;
  yOffset?: number;
  scale?: number;
  objectFit?: 'cover' | 'contain';
  loading?: 'lazy' | 'eager';
  objectPosition?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [didError, setDidError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth parallax shifts inside the container using scroll coordinates
  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full relative rounded-none flex items-center justify-center bg-transparent">
      {didError ? (
        <img src={ERROR_IMG_SRC} alt="Error loading image" className="opacity-40" />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          style={objectFit === 'contain' ? {} : { y, scale, objectPosition }}
          className={`w-full h-full rounded-none ${
            objectFit === 'contain' ? 'object-contain p-4' : 'object-cover'
          } ${className}`}
          onError={() => setDidError(true)}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// NEW PREMIUM ANIMATION COMPONENTS FOR A MODERN BRAND IDENTITY
// -------------------------------------------------------------

interface PremiumButtonProps {
  to?: string;
  onClick?: () => void;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'white' | 'outline-black';
  fullWidth?: boolean;
  download?: string;
  type?: 'button' | 'submit' | 'reset';
  animatedBorder?: boolean;
}

const MotionLink = motion(Link);

export function PremiumButton({
  to,
  onClick,
  text,
  icon,
  className = '',
  variant = 'primary',
  fullWidth = false,
  download,
  type = 'button',
  animatedBorder = false,
}: PremiumButtonProps) {
  // Base styling configuration
  let baseBg = 'bg-black';
  let baseText = 'text-white border-black';
  let hoverBgClass = 'bg-[#FF6663]';
  let hoverText = 'text-black';

  if (variant === 'secondary') {
    baseBg = 'bg-transparent';
    baseText = 'text-white border-white';
    hoverBgClass = 'bg-[#FF6663]';
    hoverText = 'text-black';
  } else if (variant === 'white') {
    baseBg = 'bg-white';
    baseText = 'text-black border-white';
    hoverBgClass = 'bg-[#FF6663]';
    hoverText = 'text-black';
  } else if (variant === 'outline-black') {
    baseBg = 'bg-transparent';
    baseText = 'text-black border-black';
    hoverBgClass = 'bg-black';
    hoverText = 'text-white';
  }

  const borderClass = animatedBorder ? 'border-transparent' : 'border-current';
  const elementClasses = `${baseBg} ${baseText} ${className} relative overflow-hidden border ${borderClass} font-bold uppercase tracking-widest text-[10px] sm:text-xs py-4 px-8 block text-center rounded-none select-none cursor-pointer transition-colors duration-300`;

  const content = (
    <div className="relative flex items-center justify-center gap-2 w-full h-full z-10">
      {animatedBorder && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.rect
            x="1"
            y="1"
            rx="0"
            ry="0"
            className="w-[calc(100%-2px)] h-[calc(100%-2px)]"
            stroke="#FF6663"
            strokeWidth="2"
            strokeDasharray="0.15 0.85"
            animate={{
              pathOffset: [0, 1],
            }}
            transition={{
              duration: 4,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </svg>
      )}

      {/* Background sweep block */}
      <motion.div
        className={`absolute inset-y-0 left-0 -mx-8 -my-4 z-[2] origin-left w-[150%] ${hoverBgClass}`}
        variants={{
          initial: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Slide-up text effect */}
      <span className="relative z-10 overflow-hidden block">
        <motion.span
          className="block"
          variants={{
            initial: { y: 0 },
            hover: { y: '-100%' },
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.span>
        <motion.span
          className={`absolute top-full left-0 block w-full ${hoverText}`}
          variants={{
            initial: { y: 0 },
            hover: { y: '-100%' },
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.span>
      </span>

      {/* Icon offset animate */}
      {icon && (
        <motion.span
          className="relative z-10 flex items-center"
          variants={{
            initial: { x: 0 },
            hover: { x: [0, 5, -5, 0] },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {icon}
        </motion.span>
      )}
    </div>
  );

  if (to) {
    if (download) {
      return (
        <motion.a 
          href={to} 
          download={download} 
          className={`${elementClasses} ${fullWidth ? 'w-full' : 'w-fit'}`}
          initial="initial"
          whileHover="hover"
        >
          {content}
        </motion.a>
      );
    }
    return (
      <MotionLink 
        to={to} 
        onClick={onClick} 
        className={`${elementClasses} ${fullWidth ? 'w-full' : 'w-fit'}`}
        initial="initial"
        whileHover="hover"
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button 
      type={type} 
      onClick={onClick} 
      className={`${elementClasses} ${fullWidth ? 'w-full' : 'w-fit'}`}
      initial="initial"
      whileHover="hover"
    >
      {content}
    </motion.button>
  );
}

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
}

export function Card3DTilt({
  children,
  className = '',
  maxRotation = 6,
  perspective = 1000,
}: Card3DTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setCanHover(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !canHover) return;
    const card = ref.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const normX = mouseX / (width / 2);
    const normY = mouseY / (height / 2);

    setRotateX(-normY * maxRotation);
    setRotateY(normX * maxRotation);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: perspective,
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.4,
      }}
      className={className}
    >
      <div style={{ transform: 'translateZ(10px)', height: '100%', width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
  trigger?: 'load' | 'hover' | 'both';
}

export function TextScramble({
  text,
  className = '',
  scrambleDuration = 700,
  trigger = 'load',
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@*[]{}<>-+_';
  const triggerRef = useRef<HTMLSpanElement>(null);

  const doScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let start: number | null = null;
    const originalText = text;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      if (progress < scrambleDuration) {
        const percent = progress / scrambleDuration;
        const scrambleLen = Math.floor(originalText.length * percent);

        let result = '';
        for (let i = 0; i < originalText.length; i++) {
          if (i < scrambleLen) {
            result += originalText[i];
          } else if (originalText[i] === ' ') {
            result += ' ';
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(result);
        requestAnimationFrame(step);
      } else {
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    setDisplayText(text);
    if (trigger === 'load' || trigger === 'both') {
      const timer = setTimeout(() => {
        doScramble();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [text]);

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'both') {
      doScramble();
    }
  };

  return (
    <motion.span
      ref={triggerRef}
      className={`${className} inline-block relative group cursor-default`}
      onMouseEnter={handleMouseEnter}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
    >
      {displayText}
      <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#FF6663] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none" />
    </motion.span>
  );
}

