import { motion } from "motion/react";
import { Navigation, Package, Search } from "lucide-react";

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
      {/* Header & Logo */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-2 justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 9l-4 2l2 4l3 -1v-6z" fill="currentColor" stroke="none" />
            <path d="M14 9l4 2l-2 4l-3 -1v-6z" fill="currentColor" stroke="none" />
            <path d="M12 14v4" />
            <path d="M10 18h4" />
            <path d="M4 8l16 0" />
            <path d="M12 4v4" />
          </svg>
          <span className="text-3xl font-bold text-brand-red tracking-tight">FlaSHip</span>
        </div>

        {/* Search Bar */}
        <div className="glass-panel rounded-full p-4 flex items-center gap-3 shadow-sm border-gray-100 mt-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Where is your package coming from?" 
            className="bg-transparent border-none outline-none text-gray-800 w-full text-sm font-medium placeholder:text-gray-400 focus:ring-0" 
            disabled
          />
        </div>
      </div>

      {/* Floating Info Cards - Middle (simulate drones in area) */}
      <div className="flex-1 flex flex-col items-center justify-center pointer-events-none relative w-full">
        <motion.div 
          className="absolute top-[20%] left-[10%] w-10 h-10 rounded-full glass-panel flex items-center justify-center border-brand-red/20 shadow-md"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Navigation className="w-5 h-5 text-brand-red" fill="currentColor" />
        </motion.div>

        <motion.div 
          className="absolute top-[40%] right-[15%] w-8 h-8 rounded-full glass-panel flex items-center justify-center border-gray-200 shadow-sm"
          animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Navigation className="w-4 h-4 text-gray-400" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[20%] left-[30%] w-14 h-14 rounded-full glass-panel flex flex-col items-center justify-center border-gray-200 shadow-lg text-gray-500"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Navigation className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-bold tracking-wider">Locker #2</span>
        </motion.div>
      </div>

      {/* Quick Action - Bottom */}
      <div className="glass-panel p-6 rounded-[32px] flex flex-col gap-4 items-center">
        <div className="flex justify-between w-full mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-red-light flex items-center justify-center">
              <Package className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 leading-tight">Send a Package</h3>
              <p className="text-sm text-gray-500">Drone pickup & locker drop-off</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onRequestFlight}
          className="w-full bg-brand-red text-white rounded-full py-4 font-semibold text-lg hover:bg-brand-red-dark transition-colors active:scale-[0.98] shadow-lg shadow-brand-red/30"
        >
          Request FlaSHip
        </button>
      </div>
    </motion.div>
  );
}

