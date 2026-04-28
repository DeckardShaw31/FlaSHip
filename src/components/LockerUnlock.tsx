import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Unlock, Check, Box, QrCode } from "lucide-react";
import { cn } from "../lib/utils";

interface LockerUnlockProps {
  onRestart: () => void;
}

export function LockerUnlock({ onRestart }: LockerUnlockProps) {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full h-dvh p-6 w-full max-w-md mx-auto items-center justify-center relative z-10"
    >
      <div className="glass-panel p-8 rounded-[40px] flex flex-col items-center text-center w-full relative overflow-hidden">
        {/* Confetti or glow back */}
        {unlocked && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 bg-brand-cyan/20 blur-3xl -z-10" 
          />
        )}

        <div className="mb-6 relative">
          <div className="w-24 h-24 rounded-full bg-brand-indigo/20 flex flex-col items-center justify-center border border-brand-indigo/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
            <AnimatePresence mode="popLayout">
              {!unlocked ? (
                <motion.div key="locked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Box className="w-10 h-10 text-brand-indigo mb-1" />
                </motion.div>
              ) : (
                <motion.div key="unlocked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check className="w-12 h-12 text-brand-cyan" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          {unlocked ? "Locker Unlocked!" : "Package Arrived"}
        </h2>
        <p className="text-gray-400 text-sm mb-8 px-4 leading-relaxed">
          {unlocked 
            ? "Locker #402 is now open. Retrieve your package and close the door." 
            : "Your drone has safely deposited the item into Locker #402. Tap below or scan QR to unlock."}
        </p>

        {!unlocked ? (
          <div className="flex flex-col w-full gap-4">
            <button 
              onClick={handleUnlock}
              className="w-full bg-gradient-to-r relative group from-brand-indigo to-brand-cyan text-white rounded-full py-4 font-semibold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform rounded-full" />
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Unlock className="w-5 h-5" />
                Unlock Locker
              </div>
            </button>
            <button className="w-full bg-transparent border border-gray-600 text-white rounded-full py-4 font-semibold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4" />
              Show QR Code
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <button 
              onClick={onRestart}
              className="w-full glass-panel text-white rounded-full py-4 font-semibold hover:bg-white/10 transition-colors border border-white/20"
            >
              Done
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
