import { motion } from "motion/react";

export function MapBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
      {/* Light Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E5E7EB 1px, transparent 1px),
            linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Soft fade gradient to blend Map with UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90" />

      {/* Orbit rings representing flight paths */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full border border-gray-300/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-gray-400 rounded-full" />
      </motion.div>
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full border border-brand-red/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 -mb-1.5 bg-brand-red rounded-full" />
      </motion.div>

      {children}
    </div>
  );
}

