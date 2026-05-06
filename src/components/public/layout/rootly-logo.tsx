interface RootlyLogoProps {
  size?: number
  className?: string
}

export function RootlyLogo({ size = 40, className }: RootlyLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#1D9E75" fillOpacity="0.1" stroke="#1D9E75" strokeWidth="2" />
        <path d="M24 14V34" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 20L24 14L30 20" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 28H32" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 24L18 28H30L28 24" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[#1D9E75] font-serif text-xl hidden md:block" style={{ fontFamily: 'Georgia, serif' }}>Rootly</span>
    </div>
  )
}