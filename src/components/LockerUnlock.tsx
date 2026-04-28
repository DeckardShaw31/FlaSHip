import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Unlock, Check, Box, QrCode } from "lucide-react";

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
      <div className="glass-panel p-8 rounded-[40px] flex flex-col items-center text-center w-full relative overflow-hidden shadow-2xl border border-gray-100">
        {/* Soft glow behind icon */}
        {unlocked && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 bg-green-50 z-0" 
          />
        )}

        <div className="mb-6 relative z-10 mt-4">
          <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-colors duration-500 shadow-xl ${unlocked ? 'bg-green-100 shadow-green-200/50' : 'bg-brand-red-light shadow-brand-red/20'}`}>
            <AnimatePresence mode="popLayout">
              {!unlocked ? (
                <motion.div key="locked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Box className="w-12 h-12 text-brand-red mb-1" />
                </motion.div>
              ) : (
                <motion.div key="unlocked" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                  <Check className="w-14 h-14 text-green-600" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3 relative z-10 tracking-tight">
          {unlocked ? "Locker Unlocked!" : "Package Arrived"}
        </h2>
        <p className="text-gray-500 text-base font-medium mb-10 px-2 leading-relaxed relative z-10">
          {unlocked 
            ? "Locker #402 is now open. Retrieve your package and securely push the door closed." 
            : "Your drone has safely deposited the item into Locker #402. Tap below to retrieve it."}
        </p>

        {!unlocked ? (
          <div className="flex flex-col w-full gap-4 relative z-10 mb-2">
            <button 
              onClick={handleUnlock}
              className="w-full bg-brand-red text-white rounded-full py-5 font-bold text-lg hover:bg-brand-red-dark transition-all shadow-xl shadow-brand-red/30 flex items-center justify-center gap-3 active:scale-95"
            >
              <Unlock className="w-6 h-6" />
              Unlock Locker Now
            </button>
            <button className="w-full bg-white border-2 border-gray-200 text-gray-600 rounded-full py-4 font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              Show Pickup QR Code
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full relative z-10 mb-2 mt-[20px]">
            <button 
              onClick={onRestart}
              className="w-full bg-gray-900 text-white rounded-full py-5 font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95"
            >
              Done & Return
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

