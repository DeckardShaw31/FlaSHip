import { motion } from "motion/react";
import { 
  Package, Map, Clock, Signal, Battery, 
  ArrowUp, Gauge, Navigation, Eye, 
  Unlock, HeadphonesIcon, Navigation2
} from "lucide-react";

export function DesktopDashboard() {
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
            <Map className="w-6 h-6" />
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
      <div className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        
        {/* Map Background grid */}
        <div className="absolute inset-0 z-0 bg-[#F3F4F6]" style={{
            backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}>
           <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90" />
           {/* Flight Path Arc */}
           <svg className="absolute bottom-0 right-1/4 w-1/2 h-[70%] z-0" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0,200 C100,100 200,50 400,0" fill="none" stroke="var(--color-brand-red)" strokeWidth="3" strokeDasharray="8 8" className="opacity-40" />
           </svg>
        </div>

        {/* Top Header */}
        <div className="h-20 px-8 flex items-center gap-6 z-10">
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
          
          <div className="flex items-center gap-3 ml-4">
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
        <div className="mt-8 ml-8 w-[320px] bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 p-6 z-10 shadow-xl">
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
        </div>

        {/* Bottom Floating Arriving Card */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
             
           {/* Marker icon */}
           <div className="absolute -top-[50px] right-8 w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center rotate-45 shadow-lg shadow-brand-red/30 translate-y-3 z-0 border-2 border-white">
             <div className="-rotate-45">
               <Navigation2 className="w-5 h-5 text-white" fill="currentColor" />
             </div>
           </div>

           <div className="bg-white rounded-[40px] px-8 py-6 shadow-2xl shadow-gray-300/60 flex items-center gap-12 relative z-10 w-fit min-w-[500px] border border-gray-100">
             
             <div className="flex flex-col">
               <h2 className="text-[32px] font-bold text-gray-900 leading-tight">Arriving</h2>
               <h2 className="text-[32px] font-bold text-gray-900 leading-tight mb-2">in 04:12</h2>
               <div className="flex items-center gap-6 mt-1">
                 <p className="text-sm font-medium text-gray-500">Status: Steady<br/>Cruise at 80m</p>
                 <div className="flex flex-col items-center bg-brand-red-light px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-bold text-brand-red tracking-widest mb-0.5">PHASE</span>
                    <span className="text-brand-red font-bold text-sm">2/4</span>
                 </div>
               </div>
               <div className="flex gap-2 mt-5">
                  <div className="h-2.5 w-24 bg-gradient-to-r from-brand-red-light to-brand-red rounded-full" />
                  <div className="h-2.5 w-12 bg-gray-100 rounded-full" />
               </div>
             </div>

             <div className="w-[1px] h-24 bg-gray-200" />

             <div>
               <button className="bg-gray-300 text-white hover:bg-gray-400 transition-colors rounded-2xl py-4 px-6 font-bold text-lg flex items-center gap-3">
                 <Unlock className="w-6 h-6" />
                 Unlock Locker
               </button>
             </div>
           </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="w-[350px] bg-white border-l border-gray-200 p-8 flex flex-col gap-10 shrink-0 z-20 shadow-sm overflow-y-auto">
        
        {/* Hardware Status */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Hardware Status</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Battery</p>
              <p className="text-2xl font-bold text-green-500">84%</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Altitude</p>
              <p className="text-2xl font-bold text-gray-900">78.2m</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Speed</p>
              <p className="text-2xl font-bold text-gray-900">42km/h</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Payload</p>
              <p className="text-2xl font-bold text-gray-900">0.8kg</p>
            </div>
          </div>
        </div>

        {/* Locker Live Feed */}
        <div>
           <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Locker Live Feed</h3>
           
           <div className="bg-gray-100 rounded-2xl aspect-[4/3] border border-gray-200 relative overflow-hidden flex items-center justify-center shadow-inner">
             {/* REC indicator */}
             <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur px-2 py-1 rounded-md">
               <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
               <span className="text-[10px] font-bold text-gray-800 tracking-wider">REC LOCKER_S04</span>
             </div>
             
             <Eye className="w-16 h-16 text-gray-300" />
           </div>

           <p className="text-xs text-gray-500 font-medium mt-4 leading-relaxed">
             Secure compartment ready for docking. Smart release sensor engaged.
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
