import { motion } from "motion/react";

export function MapBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden bg-dark-space flex items-center justify-center">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Radial Gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-dark-space)_80%)]" />

      {/* Orbit rings to suggest radar/flight tracking */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full border border-brand-cyan/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 w-4 h-4 -ml-2 -mt-2 bg-brand-cyan rounded-full blur-[2px]" />
      </motion.div>
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full border border-brand-indigo/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 -mb-1.5 bg-brand-indigo rounded-full blur-[2px]" />
      </motion.div>

      {children}
    </div>
  );
}
