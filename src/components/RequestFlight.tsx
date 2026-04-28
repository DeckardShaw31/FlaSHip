import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Box, ChevronRight, Clock, CreditCard } from "lucide-react";
import { cn } from "../lib/utils";

interface RequestFlightProps {
  onConfirm: () => void;
  onBack: () => void;
}

const ITEMS = [
  { id: "docs", icon: Box, name: "Documents", weight: "< 0.5kg", active: false },
  { id: "small", icon: Box, name: "Small Box", weight: "< 2kg", active: true },
  { id: "med", icon: Box, name: "Medium Box", weight: "< 5kg", active: false },
];

export function RequestFlight({ onConfirm, onBack }: RequestFlightProps) {
  const [selectedItem, setSelectedItem] = useState("small");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full h-dvh p-6 pb-12 w-full max-w-md mx-auto justify-end relative z-10"
    >
      <div 
        className="absolute top-12 left-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        onClick={onBack}
      >
        <ChevronRight className="w-5 h-5 text-white rotate-180" />
      </div>

      {/* Main Card */}
      <div className="glass-panel p-6 rounded-[32px] flex flex-col gap-6 mt-auto">
        
        {/* Route */}
        <div className="flex flex-col gap-4 relative">
          <div className="absolute left-[15px] top-[24px] bottom-[24px] w-[2px] bg-gray-700/50" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-600">
              <MapPin className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">PICKUP PORT</p>
              <p className="font-medium text-white truncate w-48">142 SkyHub Station, Block A</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/50">
              <div className="w-2 h-2 rounded-full bg-brand-cyan" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-brand-cyan">DROP-OFF LOCKER</p>
              <p className="font-medium text-white truncate w-48">Locker #402, Metro Square</p>
            </div>
          </div>
        </div>

        {/* Item Size */}
        <div>
          <p className="text-sm font-medium text-gray-300 mb-3">Item Size</p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {ITEMS.map((item) => {
              const isSelected = selectedItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={cn(
                    "flex-none flex flex-col items-center justify-center w-24 h-24 rounded-2xl glass-panel border transition-colors",
                    isSelected ? "border-brand-indigo bg-brand-indigo/20" : "border-glass-border hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-6 h-6 mb-2", isSelected ? "text-brand-indigo" : "text-gray-400")} />
                  <span className="text-xs font-semibold">{item.name}</span>
                  <span className="text-[10px] text-gray-400">{item.weight}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Card */}
        <div className="glass-panel p-4 rounded-2xl flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-semibold">SkyPay ***42</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-brand-cyan">$4.50</p>
            <p className="text-xs text-gray-400 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" /> 12 mins
            </p>
          </div>
        </div>

        <button 
          onClick={onConfirm}
          className="w-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white rounded-full py-4 font-semibold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-shadow active:scale-[0.98]"
        >
          Confirm Flight
        </button>
      </div>
    </motion.div>
  );
}
