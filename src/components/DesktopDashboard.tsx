import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Package, Map as MapIcon, Clock, Signal, Battery, 
  Eye, Unlock, HeadphonesIcon, Navigation2, Check, QrCode
} from "lucide-react";
import { InteractiveMap } from "./InteractiveMap";

type AppPhase = "DASHBOARD" | "REQUEST" | "TRACKING" | "DELIVERED";

export function DesktopDashboard() {
  const [phase, setPhase] = useState<AppPhase>("DASHBOARD");

  return (
    <div className="flex w-full h-full bg-gray-50 text-gray-800 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-[80px] bg-white border-r border-gray-200 flex flex-col items-center py-6 shrink-0 z-20 shadow-sm relative">
        <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center mb-10 shadow-lg shadow-brand-red/20">
          <Package className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex flex-col gap-8 flex-1 w-full items-center">
          <button className="p-3 rounded-xl bg-gray-50 text-brand-red transition-colors relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-red rounded-r-full" />
            <MapIcon className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-brand-red transition-colors">
            <Clock className="w-6 h-6" />
          </button>
        </div>

        <div className="w-12 h-12 rounded-full border-2 border-brand-red/30 flex items-center justify-center bg-white p-1">
          <div className="w-full h-full rounded-full bg-brand-red-light flex items-center justify-center">
             <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-0 w-full overflow-hidden">
        
        {/* Map Background grid */}
        <div className="absolute inset-0 z-0 bg-[#F3F4F6]">
           <InteractiveMap />
           {/* Light Grid Overlay for separation */}
           <div 
             className="absolute inset-0 opacity-40 pointer-events-none"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px',
               backgroundPosition: 'center center'
             }}
           />
           <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80 pointer-events-none" />
           
           {/* Flight Path Arc Overlay */}
           {phase === "TRACKING" && (
             <svg className="absolute bottom-0 right-1/4 w-1/2 h-[70%] z-0 pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M0,200 C100,100 200,50 400,0" fill="none" stroke="var(--color-brand-red)" strokeWidth="3" strokeDasharray="8 8" className="opacity-40 animate-pulse" />
             </svg>
           )}
        </div>

        {/* Top Header */}
        <div className="h-20 px-8 flex items-center gap-6 z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10 9l-4 2l2 4l3 -1v-6z" fill="currentColor" stroke="none" />
              <path d="M14 9l4 2l-2 4l-3 -1v-6z" fill="currentColor" stroke="none" />
              <path d="M12 14v4" />
              <path d="M10 18h4" />
              <path d="M4 8l16 0" />
              <path d="M12 4v4" />
            </svg>
            <h1 className="text-2xl font-bold text-brand-red tracking-tight">FlaSHip</h1>
          </div>
          
          <div className="flex items-center gap-3 ml-4 pointer-events-auto">
            <div className="px-3 py-1 rounded-full border border-green-500/30 bg-green-50 text-green-600 text-xs font-bold tracking-wider">
              SYSTEM LIVE
            </div>
            <div className="px-4 py-1.5 rounded-full bg-white border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-500 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              D-742 Active
            </div>
            <div className="px-4 py-1.5 rounded-full bg-white border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-500 shadow-sm">
              <Signal className="w-3.5 h-3.5 text-blue-500" />
              98% Signal
            </div>
          </div>
        </div>

        {/* Floating Delivery Info */}
        {(phase === "TRACKING" || phase === "DELIVERED") && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-8 ml-8 w-[320px] bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 p-6 z-10 shadow-xl pointer-events-auto"
          >
            <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Delivery Info</h3>
            
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">Package ID</p>
              <p className="text-xl font-bold text-gray-900">#FL-8829-01</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">Destination</p>
              <p className="text-lg font-bold text-gray-900">Smart Locker S-04</p>
              <p className="text-xs text-brand-red font-medium mt-1">Aviation District, Zone B</p>
            </div>
          </motion.div>
        )}

        {/* Bottom Interactive Area */}
        <div className="absolute bottom-8 w-full flex justify-center z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            
            {phase === "DASHBOARD" && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-[32px] md:rounded-[40px] px-6 md:px-8 py-5 md:py-6 shadow-2xl shadow-gray-300/60 flex items-center justify-between gap-6 md:gap-12 border border-gray-100 w-[90%] max-w-[600px] md:w-fit md:min-w-[500px] pointer-events-auto"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-red-light flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 md:w-7 md:h-7 text-brand-red" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">Send a Package</h2>
                    <p className="text-xs md:text-sm font-medium text-gray-500">Fast drone pickup & drop-off</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPhase("REQUEST")}
                  className="bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-full py-3 px-6 md:py-4 md:px-8 font-bold text-base md:text-lg shadow-lg shadow-brand-red/30 whitespace-nowrap"
                >
                  Flight!
                </button>
              </motion.div>
            )}

            {phase === "REQUEST" && (
              <motion.div 
                key="request"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[32px] md:rounded-[40px] px-6 md:px-8 py-5 md:py-6 shadow-2xl shadow-gray-300/60 flex flex-col gap-6 border border-gray-100 w-[90%] max-w-[600px] md:w-fit md:min-w-[500px] pointer-events-auto"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Confirm Request</h2>
                  <button onClick={() => setPhase("DASHBOARD")} className="text-gray-400 hover:text-gray-700 text-sm font-semibold transition-colors">Cancel</button>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                   <div className="w-full md:flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Pickup</p>
                     <p className="text-sm md:text-base font-bold text-gray-900">142 SkyHub Station</p>
                   </div>
                   <div className="hidden md:block w-12 h-[2px] bg-gray-200 relative">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45" />
                   </div>
                   <div className="w-full md:flex-1 bg-brand-red-light/30 p-4 rounded-2xl border border-brand-red/10">
                     <p className="text-xs text-brand-red font-semibold uppercase mb-1">Drop-off</p>
                     <p className="text-sm md:text-base font-bold text-gray-900">Locker S-04, Metro</p>
                   </div>
                </div>
                <button 
                  onClick={() => setPhase("TRACKING")}
                  className="w-full bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-full py-3 md:py-4 font-bold text-base md:text-lg shadow-lg shadow-brand-red/30"
                >
                  Pay $4.50 & Launch
                </button>
              </motion.div>
            )}

            {phase === "TRACKING" && (
              <motion.div 
                key="tracking"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="relative w-[90%] max-w-[600px] md:w-fit pointer-events-auto"
              >
                 {/* Marker icon */}
                 <div className="absolute -top-[50px] right-8 w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center rotate-45 shadow-lg shadow-brand-red/30 translate-y-3 z-0 border-2 border-white">
                   <div className="-rotate-45">
                     <Navigation2 className="w-5 h-5 text-white" fill="currentColor" />
                   </div>
                 </div>

                 <div className="bg-white rounded-[32px] md:rounded-[40px] px-6 md:px-8 py-5 md:py-6 shadow-2xl shadow-gray-300/60 flex flex-col md:flex-row items-center gap-6 md:gap-12 relative z-10 w-full md:min-w-[500px] border border-gray-100">
                   <div className="flex flex-col w-full md:w-auto">
                     <div className="flex justify-between md:flex-col">
                       <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-tight">In Transit</h2>
                       <h2 className="text-2xl md:text-[32px] font-bold text-brand-red leading-tight md:mb-2 animate-pulse">04:12</h2>
                     </div>
                     <div className="flex items-center justify-between md:justify-start gap-6 mt-2 md:mt-1">
                       <p className="text-xs md:text-sm font-medium text-gray-500">Status: Steady<br/>Cruise at 80m</p>
                       <div className="flex flex-col items-center bg-brand-red-light px-3 py-1.5 rounded-xl">
                          <span className="text-[10px] font-bold text-brand-red tracking-widest mb-0.5">PHASE</span>
                          <span className="text-brand-red font-bold text-xs md:text-sm">2/4</span>
                       </div>
                     </div>
                     <div className="flex gap-2 mt-4 md:mt-5">
                        <div className="h-2.5 flex-1 md:w-24 bg-gradient-to-r from-brand-red-light to-brand-red rounded-full overflow-hidden relative">
                           <motion.div className="absolute inset-0 bg-white/30" animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
                        </div>
                        <div className="h-2.5 w-12 bg-gray-100 rounded-full" />
                     </div>
                   </div>

                   <div className="hidden md:block w-[1px] h-24 bg-gray-200" />

                   <div className="w-full md:w-auto flex justify-center">
                     <button 
                       onClick={() => setPhase("DELIVERED")}
                       className="w-full md:w-auto bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-2xl py-3 md:py-4 px-6 font-bold text-base md:text-lg shadow-lg shadow-brand-red/30"
                     >
                       Simulate Land
                     </button>
                   </div>
                 </div>
              </motion.div>
            )}

            {phase === "DELIVERED" && (
              <motion.div 
                key="delivered"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[32px] md:rounded-[40px] px-6 md:px-8 py-6 md:py-8 shadow-2xl shadow-green-600/10 flex flex-col gap-6 border border-green-100 w-[90%] max-w-[600px] md:min-w-[500px] items-center text-center relative overflow-hidden pointer-events-auto"
              >
                <div className="absolute inset-0 bg-green-50 z-0 pointer-events-none" />
                
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-green-200/50 md:mb-2 md:mt-2">
                  <Check className="w-8 h-8 md:w-10 md:h-10 text-green-600" strokeWidth={3} />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Package Arrived</h2>
                  <p className="text-sm md:text-base text-gray-500 font-medium">Locker S-04 is ready to open.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full relative z-10 mt-2">
                  <button className="w-full md:flex-1 bg-white border-2 border-gray-200 text-gray-600 rounded-full py-3 md:py-4 font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <QrCode className="w-5 h-5" />
                    <span className="hidden md:inline">QR Code</span>
                  </button>
                  <button 
                    onClick={() => setPhase("DASHBOARD")}
                    className="w-full md:flex-[2] bg-green-600 text-white rounded-full py-3 md:py-4 font-bold text-base md:text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-5 h-5" />
                    Unlock Now
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:flex w-[350px] bg-white border-l border-gray-200 p-8 flex-col gap-10 shrink-0 z-20 shadow-sm overflow-y-auto relative">
        
        {/* Hardware Status */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Hardware Status</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Battery</p>
              <p className="text-2xl font-bold text-green-500">{phase === 'DASHBOARD' ? '100%' : '84%'}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Altitude</p>
              <p className="text-2xl font-bold text-gray-900">{phase === 'TRACKING' ? '78.2m' : '0m'}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Speed</p>
              <p className="text-2xl font-bold text-gray-900">{phase === 'TRACKING' ? '42km/h' : '0km/h'}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Payload</p>
              <p className="text-2xl font-bold text-gray-900">{phase === 'REQUEST' ? '0kg' : '2.1kg'}</p>
            </div>
          </div>
        </div>

        {/* Locker Live Feed */}
        <div>
           <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Locker Live Feed</h3>
           
           <div className="bg-gray-100 rounded-2xl aspect-[4/3] border border-gray-200 relative overflow-hidden flex items-center justify-center shadow-inner">
             <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur px-2 py-1 rounded-md">
               <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
               <span className="text-[10px] font-bold text-gray-800 tracking-wider">REC LOCKER_S04</span>
             </div>
             
             <Eye className="w-16 h-16 text-gray-300" />
             
             {phase === "DELIVERED" && (
                <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-[1px]">
                  <p className="bg-white text-green-600 font-bold px-4 py-2 rounded-full shadow-lg">Ready to Open</p>
                </div>
             )}
           </div>

           <p className="text-xs text-gray-500 font-medium mt-4 leading-relaxed">
             {phase === "DELIVERED" ? "Package securely stored. Waiting for user unlock." : "Secure compartment ready for docking. Smart release sensor engaged."}
           </p>
        </div>

        <div className="mt-auto">
          <div className="bg-brand-red-light/30 border border-brand-red/10 rounded-2xl p-5">
            <p className="text-xs text-gray-600 mb-4 font-medium">
              Need assistance? Quick connect with flight command center.
            </p>
            <button className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-bold text-sm shadow-md shadow-brand-red/20 flex justify-center items-center gap-2">
              <HeadphonesIcon className="w-4 h-4" />
              Call Operator
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
