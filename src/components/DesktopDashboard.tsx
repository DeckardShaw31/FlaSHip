import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Package, Map as MapIcon, Clock, Signal, Battery, 
  Eye, Unlock, HeadphonesIcon, Navigation2, Check, QrCode, ChevronDown, User as UserIcon, LogOut, Loader2
} from "lucide-react";
import { InteractiveMap } from "./InteractiveMap";
import { DroneLogo } from "./DroneLogo";
import { User } from "../App";
import { supabase } from "../lib/supabase";

type AppPhase = "DASHBOARD" | "REQUEST" | "TRACKING" | "DELIVERED";

export function DesktopDashboard({ user, onLogout }: { user: User, onLogout: () => void }) {
  const [phase, setPhase] = useState<AppPhase>("DASHBOARD");
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"MAP" | "HISTORY" | "PROFILE">("MAP");
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState("Smart Locker S-04");
  const [contactPrefs, setContactPrefs] = useState("SMS & Push");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    supabase.from('profiles').select('delivery_location, contact_prefs').eq('id', user.id).single()
      .then(({data, error}) => {
         if (data) {
           if (data.delivery_location) setDeliveryLocation(data.delivery_location);
           if (data.contact_prefs) setContactPrefs(data.contact_prefs);
         }
      })
  }, [user.id])

  const handleProfileChange = async (location: string, prefs: string) => {
    setDeliveryLocation(location);
    setContactPrefs(prefs);
    setIsSavingProfile(true);
    try {
      await supabase.from('profiles').upsert({
        id: user.id,
        delivery_location: location,
        contact_prefs: prefs,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingProfile(false);
    }
  }

  const [simulatedData, setSimulatedData] = useState({
    altitude: 78.2,
    speed: 42,
    battery: 84,
    etaSeconds: 252, // 4:12 default
  });

  const flightHistory = [
    { id: '#FL-8812', date: 'Today, 10:45 AM', origin: '142 SkyHub Station', destination: 'Locker S-04, Metro', status: 'Delivered', weight: '1.2kg', duration: '4m 12s' },
    { id: '#FL-8805', date: 'Yesterday', origin: 'Central Hub', destination: 'District 1 Balcony', status: 'Delivered', weight: '0.8kg', duration: '5m 30s' },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (phase === "TRACKING") {
      setSimulatedData(prev => ({ ...prev, etaSeconds: 252 }));
      interval = setInterval(() => {
        setSimulatedData(prev => ({
          ...prev,
          altitude: Math.max(70, prev.altitude + (Math.random() * 2 - 1)),
          speed: Math.max(35, Math.min(60, prev.speed + (Math.random() * 4 - 2))),
          etaSeconds: Math.max(0, prev.etaSeconds - 1),
          battery: Math.max(0, prev.battery - 0.05),
        }));
      }, 1000);
    } else if (phase === "DASHBOARD") {
      setSimulatedData({ altitude: 0, speed: 0, battery: 100, etaSeconds: 252 });
    } else if (phase === "REQUEST") {
      setSimulatedData(prev => ({ ...prev, altitude: 0, speed: 0, battery: 100 }));
    } else if (phase === "DELIVERED") {
      setSimulatedData(prev => ({ ...prev, altitude: 0, speed: 0 }));
    }
    return () => clearInterval(interval);
  }, [phase]);

  const formatEta = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex w-full h-full bg-gray-50 text-gray-800 font-sans overflow-hidden">
      
      {/* Bottom Nav / Left Sidebar */}
      <div className="fixed bottom-0 left-0 w-full md:relative md:w-[80px] bg-white border-t md:border-t-0 md:border-r border-gray-200 flex flex-row md:flex-col items-center justify-around md:justify-start py-4 md:py-6 shrink-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-sm">
        <div className="hidden md:flex w-12 h-12 rounded-xl bg-brand-red items-center justify-center mb-10 shadow-lg shadow-brand-red/20">
          <Package className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 md:gap-8 flex-1 w-full justify-center md:justify-start items-center">
          <button 
            type="button"
            onClick={() => { setActiveTab("MAP"); document.getElementById('mobile-drawer')?.classList.add('translate-y-[120%]'); }}
            aria-label="Map view"
            className={`p-3 rounded-xl transition-colors relative flex-1 md:flex-none flex justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${activeTab === 'MAP' ? 'bg-gray-50 text-brand-red' : 'text-gray-400 hover:text-brand-red hover:bg-gray-50'}`}
          >
            {activeTab === 'MAP' && <div className="absolute top-0 md:left-0 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2 w-8 md:w-1 h-1 md:h-6 bg-brand-red rounded-b-full md:rounded-b-none md:rounded-r-full" />}
            <MapIcon className="w-6 h-6" />
          </button>
          <button 
            type="button"
            onClick={() => { setActiveTab("HISTORY"); document.getElementById('mobile-drawer')?.classList.remove('translate-y-[120%]'); }}
            aria-label="Flight history"
            className={`p-3 rounded-xl transition-colors relative flex-1 md:flex-none flex justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${activeTab === 'HISTORY' ? 'bg-gray-50 text-brand-red' : 'text-gray-400 hover:text-brand-red hover:bg-gray-50'}`}
          >
            {activeTab === 'HISTORY' && <div className="absolute top-0 md:left-0 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2 w-8 md:w-1 h-1 md:h-6 bg-brand-red rounded-b-full md:rounded-b-none md:rounded-r-full" />}
            <Clock className="w-6 h-6" />
          </button>
          
          <button 
            type="button"
            onClick={() => { setActiveTab("PROFILE"); document.getElementById('mobile-drawer')?.classList.remove('translate-y-[120%]'); }}
            aria-label="Profile"
            className={`p-3 rounded-xl transition-colors relative flex-1 md:flex-none flex justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${activeTab === 'PROFILE' ? 'bg-gray-50 text-brand-red' : 'text-gray-400 hover:text-brand-red hover:bg-gray-50'}`}
          >
            {activeTab === 'PROFILE' && <div className="absolute top-0 md:left-0 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2 w-8 md:w-1 h-1 md:h-6 bg-brand-red rounded-b-full md:rounded-b-none md:rounded-r-full" />}
            <UserIcon className="w-6 h-6" />
          </button>

          <button 
            type="button"
            aria-label="Toggle sidebar"
            aria-haspopup="dialog"
            className="md:hidden p-3 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-brand-red transition-colors flex-1 flex justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2" 
            onClick={() => document.getElementById('mobile-drawer')?.classList.toggle('translate-y-[120%]')}
          >
            <span className="sr-only">Toggle drawer</span>
            <div className="w-1.5 h-1.5 bg-current rounded-full" />
            <div className="w-1.5 h-1.5 bg-current rounded-full ml-1" />
            <div className="w-1.5 h-1.5 bg-current rounded-full ml-1" />
          </button>
        </div>

        <div className="hidden md:flex w-12 h-12 rounded-full border-2 border-brand-red/30 items-center justify-center bg-white p-1">
          <div className="w-full h-full rounded-full bg-brand-red-light flex items-center justify-center">
             <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-0 w-full overflow-hidden">
        
        {/* Map Background grid */}
        <div className="absolute inset-0 z-0 bg-[#F3F4F6]">
           <InteractiveMap phase={phase} etaSeconds={simulatedData.etaSeconds} />
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
        <div className="h-20 px-4 md:px-8 mt-4 md:mt-0 flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <DroneLogo className="w-8 h-8 text-brand-red" />
            <h1 className="text-2xl font-bold text-brand-red tracking-tight">FlaSHip</h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-4 pointer-events-auto">
            <div className="hidden md:flex px-3 py-1 rounded-full border border-green-500/30 bg-green-50 text-green-600 text-xs font-bold tracking-wider">
              SYSTEM LIVE
            </div>
            <div className="px-3 md:px-4 py-1.5 rounded-full bg-white border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-500 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              D-742 Active
            </div>
            <div className="hidden md:flex px-4 py-1.5 rounded-full bg-white border border-gray-200 items-center gap-2 text-xs font-semibold text-gray-500 shadow-sm">
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
            className="mt-4 md:mt-8 mx-4 md:ml-8 w-[calc(100%-2rem)] md:w-[320px] bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 p-5 md:p-6 z-10 shadow-xl pointer-events-auto"
          >
            <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Delivery Info</h3>
            
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">Package ID</p>
              <p className="text-xl font-bold text-gray-900">{trackingId || "#FL-8829-01"}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">Destination</p>
              <p className="text-lg font-bold text-gray-900">{deliveryLocation}</p>
              <p className="text-xs text-brand-red font-medium mt-1">Aviation District, Zone B</p>
            </div>
          </motion.div>
        )}

        {/* Bottom Interactive Area */}
        <div className="absolute bottom-[90px] md:bottom-8 w-full flex justify-center z-20 pointer-events-none">
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
                  type="button"
                  onClick={() => setPhase("REQUEST")}
                  className="bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-full py-3 px-6 md:py-4 md:px-8 font-bold text-base md:text-lg shadow-lg shadow-brand-red/30 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
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
                  <button type="button" onClick={() => setPhase("DASHBOARD")} className="text-gray-400 hover:text-gray-700 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-md px-2 py-1">Cancel</button>
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
                     <p className="text-sm md:text-base font-bold text-gray-900">{deliveryLocation}</p>
                   </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setTrackingId(`#FL-${Math.floor(1000 + Math.random() * 9000)}-01`);
                    setPhase("TRACKING");
                  }}
                  className="w-full bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-full py-3 md:py-4 font-bold text-base md:text-lg shadow-lg shadow-brand-red/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
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
                       <h2 aria-live="polite" className="text-2xl md:text-[32px] font-bold text-brand-red leading-tight md:mb-2 animate-pulse">{formatEta(simulatedData.etaSeconds)}</h2>
                     </div>
                     <div className="flex items-center justify-between md:justify-start gap-6 mt-2 md:mt-1">
                       <p className="text-xs md:text-sm font-medium text-gray-500" aria-live="polite">Speed: {simulatedData.speed.toFixed(1)}km/h<br/>Alt: {simulatedData.altitude.toFixed(1)}m</p>
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
                       type="button"
                       onClick={() => setPhase("DELIVERED")}
                       className="w-full md:w-auto bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-2xl py-3 md:py-4 px-6 font-bold text-base md:text-lg shadow-lg shadow-brand-red/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
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
                  <p className="text-sm md:text-base text-gray-500 font-medium">Order {trackingId || "#FL-8829-01"} at {deliveryLocation} is ready to open.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full relative z-10 mt-2">
                  <button type="button" className="w-full md:flex-1 bg-white border-2 border-gray-200 text-gray-600 rounded-full py-3 md:py-4 font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2">
                    <QrCode className="w-5 h-5" />
                    <span className="hidden md:inline">QR Code</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPhase("DASHBOARD")}
                    className="w-full md:flex-[2] bg-green-600 text-white rounded-full py-3 md:py-4 font-bold text-base md:text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
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

      {/* Right Sidebar / Mobile Drawer */}
      <div 
        id="mobile-drawer"
        className="fixed md:relative inset-x-0 bottom-[80px] md:bottom-0 translate-y-[120%] md:translate-y-0 transition-transform duration-300 w-full md:w-[350px] bg-white border-t md:border-t-0 md:border-l border-gray-200 p-6 md:p-8 flex flex-col gap-6 md:gap-10 shrink-0 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-sm overflow-y-auto max-h-[70vh] md:max-h-full rounded-t-[32px] md:rounded-none"
      >
        <button 
          type="button"
          aria-label="Close sidebar"
          className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto md:hidden mb-2 shrink-0 active:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          onClick={() => document.getElementById('mobile-drawer')?.classList.add('translate-y-[120%]')}
        >
          <span className="sr-only">Close drawer</span>
        </button>
        
        {/* Hardware Status */}
        {activeTab === 'MAP' && (
        <div>
          <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Hardware Status</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Battery</p>
              <p className="text-2xl font-bold text-green-500" aria-live="polite">{Math.floor(simulatedData.battery)}%</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Altitude</p>
              <p className="text-2xl font-bold text-gray-900" aria-live="polite">{simulatedData.altitude.toFixed(1)}m</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Speed</p>
              <p className="text-2xl font-bold text-gray-900" aria-live="polite">{simulatedData.speed.toFixed(1)}km/h</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Payload</p>
              <p className="text-2xl font-bold text-gray-900">{phase === 'REQUEST' ? '0kg' : '2.1kg'}</p>
            </div>
          </div>
        </div>
        )}

        {/* Flight History */}
        {activeTab === 'HISTORY' && (
          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Flight History</h3>
            <div className="flex flex-col gap-3">
              {flightHistory.map(flight => (
                <div key={flight.id} className="bg-gray-50 border border-gray-100 p-4 rounded-2xl shadow-sm flex flex-col">
                  <button
                    type="button"
                    onClick={() => setExpandedHistory(expandedHistory === flight.id ? null : flight.id)}
                    className="flex items-center justify-between w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg focus-visible:ring-offset-2"
                    aria-expanded={expandedHistory === flight.id}
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-900">{flight.id}</p>
                      <p className="text-xs text-gray-500 font-medium mt-1">{flight.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {flight.status}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedHistory === flight.id ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedHistory === flight.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-2 border-t border-gray-200 text-xs text-gray-600 flex flex-col gap-2">
                          <div className="flex justify-between"><span className="font-semibold text-gray-400 uppercase">Origin</span> <span className="font-medium text-gray-900">{flight.origin}</span></div>
                          <div className="flex justify-between"><span className="font-semibold text-gray-400 uppercase">Destination</span> <span className="font-medium text-gray-900">{flight.destination}</span></div>
                          <div className="flex justify-between"><span className="font-semibold text-gray-400 uppercase">Weight</span> <span className="font-medium text-gray-900">{flight.weight}</span></div>
                          <div className="flex justify-between"><span className="font-semibold text-gray-400 uppercase">Duration</span> <span className="font-medium text-gray-900">{flight.duration}</span></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locker Live Feed */}
        {activeTab === 'MAP' && (phase === "TRACKING" || phase === "DELIVERED") && (
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
        )}

        {/* Profile */}
        {activeTab === 'PROFILE' && (
          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Your Profile</h3>
            
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm mb-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brand-red-light rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                <UserIcon className="w-10 h-10 text-brand-red" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">{user.email}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
                  Preferred Delivery Location
                  {isSavingProfile && <Loader2 className="w-3 h-3 animate-spin text-brand-red inline" />}
                </label>
                <div className="relative">
                  <select 
                    value={deliveryLocation}
                    onChange={(e) => handleProfileChange(e.target.value, contactPrefs)}
                    className="w-full appearance-none bg-white border border-gray-200 text-gray-900 font-semibold rounded-2xl p-4 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
                  >
                    <option value="Smart Locker S-04">Smart Locker S-04</option>
                    <option value="District 1 Balcony">District 1 Balcony</option>
                    <option value="Central Hub S-01">Central Hub S-01</option>
                    <option value="Skyway Station A">Skyway Station A</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
                  Contact Preferences
                  {isSavingProfile && <Loader2 className="w-3 h-3 animate-spin text-brand-red inline" />}
                </label>
                <div className="relative">
                  <select 
                    value={contactPrefs}
                    onChange={(e) => handleProfileChange(deliveryLocation, e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 text-gray-900 font-semibold rounded-2xl p-4 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
                  >
                    <option value="SMS & Push">SMS & Push Notification</option>
                    <option value="Push Only">Push Notification Only</option>
                    <option value="Email Only">Email Only</option>
                    <option value="Do Not Disturb">Do Not Disturb</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red mt-2">
                <span className="font-semibold text-gray-700">Account Settings</span>
                <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90" />
              </button>
              <button className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
                <span className="font-semibold text-gray-700">Payment Methods</span>
                <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90" />
              </button>
            </div>
            
            <button 
              onClick={onLogout}
              className="mt-8 w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        )}

        <div className="mt-auto">
          <div className="bg-brand-red-light/30 border border-brand-red/10 rounded-2xl p-5">
            <p className="text-xs text-gray-600 mb-4 font-medium">
              Need assistance? Quick connect with flight command center.
            </p>
            <button type="button" className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-bold text-sm shadow-md shadow-brand-red/20 flex justify-center items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2">
              <HeadphonesIcon className="w-4 h-4" />
              Call Operator
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
