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
        className="absolute top-12 left-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center cursor-pointer active:scale-95 transition-transform shadow-md"
        onClick={onBack}
      >
        <ChevronRight className="w-6 h-6 text-gray-800 rotate-180" />
      </div>

      {/* Main Card */}
      <div className="glass-panel p-6 rounded-[32px] flex flex-col gap-6 mt-auto border border-gray-100">
        
        {/* Route */}
        <div className="flex flex-col gap-4 relative">
          <div className="absolute left-[15px] top-[24px] bottom-[24px] w-[2px] bg-gray-200" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
              <MapPin className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pickup Port</p>
              <p className="font-bold text-gray-900 truncate w-48 text-base">142 SkyHub Station</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-brand-red-light flex items-center justify-center border border-brand-red/30">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-brand-red uppercase tracking-wider">Drop-off Locker</p>
              <p className="font-bold text-gray-900 truncate w-48 text-base">Locker #402, Metro</p>
            </div>
          </div>
        </div>

        {/* Item Size */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-sm font-bold text-gray-800 mb-3 block">Package Size</p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {ITEMS.map((item) => {
              const isSelected = selectedItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={cn(
                    "flex-none flex flex-col items-center justify-center w-24 h-24 rounded-2xl border transition-all duration-200",
                    isSelected ? "border-brand-red bg-brand-red-light shadow-md" : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                  )}
                >
                  <item.icon className={cn("w-6 h-6 mb-2", isSelected ? "text-brand-red" : "text-gray-400")} />
                  <span className={cn("text-xs font-bold", isSelected ? "text-brand-red" : "text-gray-700")}>{item.name}</span>
                  <span className={cn("text-[10px]", isSelected ? "text-brand-red/70" : "text-gray-400")}>{item.weight}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center border border-gray-100 shadow-inner">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-bold text-gray-800">SkyPay ***42</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">$4.50</p>
            <p className="text-xs font-semibold text-brand-red flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" /> 12 mins
            </p>
          </div>
        </div>

        <button 
          onClick={onConfirm}
          className="w-full bg-brand-red text-white rounded-full py-4 font-bold text-lg hover:bg-brand-red-dark transition-all active:scale-[0.98] shadow-lg shadow-brand-red/30"
        >
          Confirm Flight
        </button>
      </div>
    </motion.div>
  );
}

