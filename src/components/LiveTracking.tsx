import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation, ShieldCheck } from "lucide-react";

interface LiveTrackingProps {
  onDroneLanded: () => void;
}

export function LiveTracking({ onDroneLanded }: LiveTrackingProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("Picking up item...");
  
  useEffect(() => {
    const duration = 15000; // 15 seconds for demo
    const intervalTime = 100;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = currentStep / steps;
      setProgress(Math.min(currentProgress, 1));

      if (currentProgress < 0.2) setPhase("Drone is picking up item...");
      else if (currentProgress < 0.8) setPhase("Drone is in transit (Alt: 120m)...");
      else setPhase("Descending to Locker #402...");

      if (currentProgress >= 1) {
        clearInterval(interval);
        setTimeout(onDroneLanded, 500);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onDroneLanded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full h-dvh p-6 pb-12 w-full max-w-md mx-auto relative z-10"
    >
      <div className="absolute top-12 left-1/2 -translate-x-1/2 glass-panel shadow-md rounded-full px-6 py-2 flex items-center gap-2 border border-gray-100">
        <ShieldCheck className="w-5 h-5 text-brand-red" />
        <span className="text-sm font-bold tracking-wide text-gray-800">SECURE FLIGHT</span>
      </div>

      <div className="flex-1 flex flex-col justify-end pb-8">
        <div className="glass-panel p-6 rounded-[32px] flex flex-col gap-6 shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
              <AnimatePresence mode="popLayout">
                <motion.p 
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-bold text-xl text-gray-900"
                >
                  {phase}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="w-14 h-14 rounded-full bg-brand-red-light flex items-center justify-center relative overflow-hidden shadow-inner">
               <Navigation className="w-6 h-6 text-brand-red z-10" fill="currentColor" />
               <motion.div 
                 className="absolute inset-x-0 bottom-0 bg-brand-red/20"
                 style={{ height: `${progress * 100}%` }}
               />
            </div>
          </div>

          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden w-full shadow-inner">
            <motion.div 
              className="h-full bg-brand-red relative"
              style={{ width: `${progress * 100}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/40 to-transparent" />
            </motion.div>
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>SkyHub A</span>
            <span className="text-gray-900">ETA: {Math.max(0, Math.ceil(15 - progress * 15))}s</span>
            <span className={progress > 0.9 ? "text-brand-red font-extrabold" : ""}>Locker #402</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

