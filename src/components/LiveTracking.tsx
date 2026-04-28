import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation, ShieldCheck } from "lucide-react";
import { cn } from "../lib/utils";

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
      <div className="absolute top-12 left-1/2 -translate-x-1/2 glass-panel rounded-full px-6 py-2 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-brand-cyan" />
        <span className="text-sm font-medium tracking-wide">SECURE FLIGHT</span>
      </div>

      <div className="flex-1 flex flex-col justify-end pb-8">
        <div className="glass-panel p-6 rounded-[32px] flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <AnimatePresence mode="popLayout">
                <motion.p 
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-semibold text-lg text-white"
                >
                  {phase}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center relative overflow-hidden bg-brand-cyan/10 border-brand-cyan/30">
               <Navigation className="w-5 h-5 text-brand-cyan" />
               <motion.div 
                 className="absolute inset-x-0 bottom-0 bg-brand-cyan/20"
                 style={{ height: `${progress * 100}%` }}
               />
            </div>
          </div>

          <div className="h-2 bg-gray-800 rounded-full overflow-hidden w-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-indigo to-brand-cyan"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-medium text-gray-400">
            <span>SkyHub A</span>
            <span>ETA: {Math.max(0, Math.ceil(15 - progress * 15))}s</span>
            <span className={progress > 0.9 ? "text-brand-cyan" : ""}>Locker #402</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
