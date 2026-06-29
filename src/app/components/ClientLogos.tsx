import React from 'react';

interface LogoProps {
  className?: string;
}

export function TelcelLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20" cy="20" r="10" stroke="#0054A6" strokeWidth="3" />
      <circle cx="20" cy="20" r="4" fill="#0054A6" />
      <path d="M 28 12 A 12 12 0 0 1 28 28" stroke="#0054A6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 32 8 A 16 16 0 0 1 32 32" stroke="#0054A6" strokeWidth="2" strokeLinecap="round" />
      <text x="44" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#0054A6" letterSpacing="-0.5">telcel</text>
    </svg>
  );
}

export function KardiasLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 20 C12 10, 24 10, 24 18 C24 10, 36 10, 36 20 C36 28, 24 34, 24 36 C24 34, 12 28, 12 20 Z" fill="#E30613" />
      <path d="M18 20 C18 16, 24 16, 24 20 C24 16, 30 16, 30 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <text x="44" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" fill="#1A1A1A" letterSpacing="0.5">kardias</text>
      <text x="44" y="31" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="400" fontSize="8.5" fill="#E30613" letterSpacing="1">FUNDACIÓN</text>
    </svg>
  );
}

export function UPLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 6 H28 V20 C28 26, 20 32, 20 32 C20 32, 12 26, 12 20 V6 Z" fill="#0F2C59" />
      <path d="M20 6 V32" stroke="#D4AF37" strokeWidth="1.5" />
      <path d="M12 16 H28" stroke="#D4AF37" strokeWidth="1.5" />
      <rect x="15" y="10" width="4" height="3" fill="#D4AF37" />
      <rect x="21" y="10" width="4" height="3" fill="#D4AF37" />
      <text x="36" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="13" fill="#0F2C59" letterSpacing="0.5">UNIVERSIDAD</text>
      <text x="36" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="11" fill="#D4AF37" letterSpacing="2">PANAMERICANA</text>
    </svg>
  );
}

export function CruzRojaLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="14" width="20" height="12" fill="#EE3224" />
      <rect x="14" y="10" width="12" height="20" fill="#EE3224" />
      <text x="38" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="12" fill="#1A1A1A" letterSpacing="0.5">CRUZ ROJA</text>
      <text x="38" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="10" fill="#EE3224" letterSpacing="1.5">MEXICANA</text>
    </svg>
  );
}

export function TrotimeLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20" cy="20" r="10" stroke="#1A1A1A" strokeWidth="2.5" />
      <path d="M20 13 V20 H25" stroke="#E30613" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 12 L30 8" stroke="#E30613" strokeWidth="2" strokeLinecap="round" />
      <text x="38" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="18" fill="#1A1A1A" letterSpacing="-0.5">TROTIME</text>
    </svg>
  );
}

export function AllMktingLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 28 L20 12 L28 28" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 24 H25" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M24 16 L32 8 M32 8 H28 M32 8 V12" stroke="#FF6663" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="38" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="#1A1A1A" letterSpacing="-0.5">ALL<tspan fill="#4B5563">MKTING</tspan></text>
    </svg>
  );
}

export function AdientLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 12 H22 L17 28 Z" fill="#0070C0" />
      <path d="M20 12 H30 L25 28 Z" fill="#FF6663" />
      <text x="36" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="19" fill="#1A1A1A" letterSpacing="0">ADIENT</text>
    </svg>
  );
}

export function IOSOfficesLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="8" width="24" height="24" fill="#1A1A1A" />
      <text x="13" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="12" fill="white" letterSpacing="-0.5">IOS</text>
      <text x="42" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" fill="#1A1A1A" letterSpacing="1">IOS</text>
      <text x="42" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="9" fill="#4B5563" letterSpacing="2.5">OFFICES</text>
    </svg>
  );
}

export function IdemSportLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="10" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#E30613" letterSpacing="-0.5">IDEM</text>
      <text x="69" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#1A1A1A" letterSpacing="-0.5">SP</text>
      <circle cx="103" cy="19" r="6.5" fill="#1A1A1A" />
      <text x="112" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#1A1A1A" letterSpacing="-0.5">RT</text>
      <circle cx="144" cy="25" r="1.5" fill="#1A1A1A" />
    </svg>
  );
}

export function SomosRunningLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="sr-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00F2FE" />
          <stop offset="100%" stopColor="#00A6C9" />
        </linearGradient>
      </defs>
      <path d="M 14 10 H 26 C 30 10 30 18 26 18 H 18 C 14 18 14 26 18 26 H 30" stroke="url(#sr-grad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 18 L 30 26" stroke="url(#sr-grad)" strokeWidth="3.5" strokeLinecap="round" />
      <text x="38" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" fill="#00A6C9" letterSpacing="1">SOMOS</text>
      <text x="38" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="11" fill="#1A1A1A" letterSpacing="2">RUNNING</text>
    </svg>
  );
}

export function AsdeporteLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="6" width="28" height="28" rx="6" fill="#FF6B00" />
      <path d="M24 11 L31 27 H17 Z" fill="white" />
      <path d="M24 11 Q20 22 28 27" stroke="#FF6B00" strokeWidth="2.5" fill="none" />
      <text x="46" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="16" fill="#1A1A1A" letterSpacing="-0.5">asdeporte</text>
    </svg>
  );
}

export function EnDondeCorrerLogo({ className = 'h-8' }: LogoProps) {
  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="20" r="14" fill="#0054A6" />
      <circle cx="25" cy="13" r="2.5" fill="white" />
      <path d="M 24 16 L 22 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M 23 17 L 18 18 M 23 17 L 27 19" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M 22 22 L 17 28 M 22 22 L 26 25 L 24 29" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <text x="44" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="12" fill="#0054A6" letterSpacing="0.5">EN DÓNDE</text>
      <text x="44" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="11" fill="#1A1A1A" letterSpacing="2.5">CORRER</text>
    </svg>
  );
}

export const brandLogosMap: Record<string, React.ComponentType<LogoProps>> = {
  'Fundación Kardias': KardiasLogo,
  'Universidad Panamericana': UPLogo,
  'Trotime': TrotimeLogo,
  'AllMkting': AllMktingLogo,
  'Adient': AdientLogo,
  'IOS Offices': IOSOfficesLogo,
  'IdemSport': IdemSportLogo,
  'SomosRunning': SomosRunningLogo,
  'asdeporte': AsdeporteLogo,
  'En Dónde Correr': EnDondeCorrerLogo,
};
