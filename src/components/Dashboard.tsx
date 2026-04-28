import { motion } from "motion/react";
import { Navigation, Package, MapPin, Search } from "lucide-react";

interface DashboardProps {
  onRequestFlight: () => void;
}

export function Dashboard({ onRequestFlight }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col h-full h-dvh p-6 pb-12 w-full max-w-md mx-auto justify-between relative z-10"
    >
      {/* Search Bar - Top */}
      <div className="glass-panel rounded-full p-4 flex items-center gap-3 mt-8">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Where is your package coming from?" 
          className="bg-transparent border-none outline-none text-white w-full text-sm font-medium placeholder:text-gray-400 focus:ring-0" 
          disabled
        />
      </div>

      {/* Floating Info Cards - Middle (simulate drones in area) */}
      <div className="flex-1 flex flex-col items-center justify-center pointer-events-none relative w-full">
        <motion.div 
          className="absolute top-[20%] left-[10%] w-10 h-10 rounded-full glass-panel flex items-center justify-center border-brand-cyan/40"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Navigation className="w-5 h-5 text-brand-cyan" />
        </motion.div>

        <motion.div 
          className="absolute top-[40%] right-[15%] w-8 h-8 rounded-full glass-panel flex items-center justify-center border-brand-indigo/40"
          animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Navigation className="w-4 h-4 text-brand-indigo" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[20%] left-[30%] w-12 h-12 rounded-full glass-panel flex flex-col items-center justify-center border-gray-400/40"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Navigation className="w-5 h-5 text-gray-400" />
          <span className="text-[8px] font-bold mt-0.5 tracking-wider">Locker 2A</span>
        </motion.div>
      </div>

      {/* Quick Action - Bottom */}
      <div className="glass-panel p-6 rounded-[32px] flex flex-col gap-4 items-center">
        <div className="flex justify-between w-full mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white leading-tight">Send a Package</h3>
              <p className="text-xs text-gray-400">Drone pickup & locker drop-off</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onRequestFlight}
          className="w-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white rounded-full py-4 font-semibold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-shadow active:scale-[0.98]"
        >
          Request FlaSHip
        </button>
      </div>
    </motion.div>
  );
}
