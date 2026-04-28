export function DroneLogo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg 
      viewBox="0 0 100 60" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      style={style}
    >
      <g>
        {/* Left Propeller */}
        <path d="M 5,16 C 15,14 25,14 35,16 C 25,18 15,18 5,16 Z" />
        {/* Right Propeller */}
        <path d="M 65,16 C 75,14 85,14 95,16 C 85,18 75,18 65,16 Z" />
        
        {/* Left Motor */}
        <path d="M 17,16 L 23,16 L 22,23 L 18,23 Z" />
        {/* Right Motor */}
        <path d="M 77,16 L 83,16 L 82,23 L 78,23 Z" />
        
        {/* Left Arm */}
        <path d="M 19,20 L 23,20 L 38,33 L 32,35 Z" />
        {/* Right Arm */}
        <path d="M 81,20 L 77,20 L 62,33 L 68,35 Z" />
        
        {/* Main Body */}
        <path d="M 28,32 C 35,30 65,30 72,32 C 75,34 76,37 72,39 C 65,41 35,41 28,39 C 24,37 25,34 28,32 Z" />
        
        {/* Landing Gear Left */}
        <path d="M 40,38 Q 38,45 32,55 L 36,55 Q 40,48 43,38 Z" />
        {/* Landing Gear Right */}
        <path d="M 60,38 Q 62,45 68,55 L 64,55 Q 60,48 57,38 Z" />
        
        {/* Camera Mount */}
        <rect x="47" y="39" width="6" height="8" rx="1" />
        {/* Camera Payload */}
        <rect x="40" y="47" width="20" height="11" rx="2" />
        {/* Camera Lens */}
        <circle cx="50" cy="52" r="3" fill="#ffffff" opacity="0.4" />
      </g>
    </svg>
  );
}
