import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Package,
  Map as MapIcon,
  Clock,
  Signal,
  Eye,
  Unlock,
  HeadphonesIcon,
  Navigation2,
  Check,
  QrCode,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Loader2,
  LayoutDashboard,
  Box,
  Vault,
  Wallet,
  Bell,
  Menu,
  X
} from "lucide-react";
import { InteractiveMap } from "./InteractiveMap";
import { DroneLogo } from "./DroneLogo";
import { User } from "../App";
import { supabase } from "../lib/supabase";
import { OverviewSection } from "./OverviewSection";
import { OrdersSection } from "./OrdersSection";
import { LockerSection } from "./LockerSection";
import { WalletSection } from "./WalletSection";
import { NotificationsSection } from "./NotificationsSection";
import { ProfileSection } from "./ProfileSection";

type AppPhase = "DASHBOARD" | "REQUEST" | "TRACKING" | "DELIVERED";

export type SidebarTab = "DASHBOARD" | "ORDERS" | "TRACKING" | "LOCKER" | "WALLET" | "NOTIFICATIONS" | "PROFILE";

export function DesktopDashboard({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  const [phase, setPhase] = useState<AppPhase>("DASHBOARD");
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SidebarTab>("DASHBOARD");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState("10.7769, 106.7009");

  const [simulatedData, setSimulatedData] = useState({
    altitude: 78.2,
    speed: 42,
    battery: 84,
    etaSeconds: 252, // 4:12 default
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (phase === "TRACKING") {
      setSimulatedData((prev) => ({ ...prev, etaSeconds: 252 }));
      interval = setInterval(() => {
        setSimulatedData((prev) => ({
          ...prev,
          altitude: Math.max(70, prev.altitude + (Math.random() * 2 - 1)),
          speed: Math.max(
            35,
            Math.min(60, prev.speed + (Math.random() * 4 - 2)),
          ),
          etaSeconds: Math.max(0, prev.etaSeconds - 1),
          battery: Math.max(0, prev.battery - 0.05),
        }));
      }, 1000);
    } else if (phase === "DASHBOARD") {
      setSimulatedData({
        altitude: 0,
        speed: 0,
        battery: 100,
        etaSeconds: 252,
      });
    } else if (phase === "REQUEST") {
      setSimulatedData((prev) => ({
        ...prev,
        altitude: 0,
        speed: 0,
        battery: 100,
      }));
    } else if (phase === "DELIVERED") {
      setSimulatedData((prev) => ({ ...prev, altitude: 0, speed: 0 }));
    }
    return () => clearInterval(interval);
  }, [phase]);

  const formatEta = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex w-full h-full bg-gray-50 text-gray-800 font-sans overflow-hidden flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-50 shadow-sm relative">
        <div className="flex items-center gap-2">
           <DroneLogo className="w-6 h-6 text-brand-red" />
           <h1 className="text-xl font-bold text-brand-red tracking-tight">FlaSHip</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl py-4 px-4 flex flex-col gap-2 z-50"
            >
              {[
                { id: "DASHBOARD", label: "Dashboard", icon: LayoutDashboard },
                { id: "ORDERS", label: "Orders", icon: Box },
                { id: "TRACKING", label: "Drone Tracking", icon: MapIcon },
                { id: "LOCKER", label: "Smart Lockers", icon: Vault },
                { id: "WALLET", label: "Wallet", icon: Wallet },
                { id: "NOTIFICATIONS", label: "Notifications", icon: Bell },
                { id: "PROFILE", label: "Profile", icon: UserIcon },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as SidebarTab); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === tab.id ? 'bg-brand-red-light/50 text-brand-red' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex w-[280px] bg-white border-r border-gray-200 flex-col py-6 shrink-0 z-50 shadow-sm relative h-full">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-red items-center justify-center flex shadow-lg shadow-brand-red/20 shrink-0">
            <DroneLogo className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-brand-red tracking-tight leading-tight">FlaSHip</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Delivery Platform</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {[
            { id: "DASHBOARD", label: "Dashboard", icon: LayoutDashboard },
            { id: "ORDERS", label: "Orders", icon: Box },
            { id: "TRACKING", label: "Drone Tracking", icon: MapIcon },
            { id: "LOCKER", label: "Smart Lockers", icon: Vault },
            { id: "WALLET", label: "Wallet", icon: Wallet },
            { id: "NOTIFICATIONS", label: "Notifications", icon: Bell },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SidebarTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                activeTab === tab.id 
                  ? 'bg-brand-red text-white shadow-md shadow-brand-red/20' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="px-4 mt-auto pt-4 border-t border-gray-100">
          <button 
            onClick={() => setActiveTab('PROFILE')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red text-left ${
              activeTab === 'PROFILE' ? 'bg-gray-100 ring-1 ring-gray-200' : 'hover:bg-gray-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden outline outline-2 outline-white shadow-sm">
              <span className="text-sm font-bold text-gray-600 uppercase">
                {user.name ? user.name.charAt(0) : user.email?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name || "User"}</p>
              <p className="text-xs font-semibold text-gray-500 truncate">{user.email}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-0 w-full h-full overflow-hidden bg-gray-50">
        
        {/* Render sections conditionally */}
        {activeTab === 'DASHBOARD' && <OverviewSection />}
        {activeTab === 'ORDERS' && <OrdersSection />}
        {activeTab === 'LOCKER' && <LockerSection />}
        {activeTab === 'WALLET' && <WalletSection />}
        {activeTab === 'NOTIFICATIONS' && <NotificationsSection />}
        
        {activeTab === 'PROFILE' && <ProfileSection user={user} onLogout={onLogout} />}
        
        {/* Tracking Map Section logic wrapper */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-300 ${activeTab === 'TRACKING' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <InteractiveMap phase={phase} etaSeconds={simulatedData.etaSeconds} deliveryLocation={deliveryLocation} onSelectLocation={setDeliveryLocation} />
          {/* Light Grid Overlay for separation */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `
                 linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
               `,
              backgroundSize: "40px 40px",
              backgroundPosition: "center center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80 pointer-events-none" />

          {/* Top Header */}
          <div className="absolute top-0 w-full h-20 px-4 md:px-8 mt-4 md:mt-0 flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 z-10 pointer-events-none">
            <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-4 pointer-events-auto">
              <div className="hidden mt-4 md:flex px-3 py-1 rounded-full border border-green-500/30 bg-green-50 text-green-600 text-xs font-bold tracking-wider">
                SYSTEM LIVE
              </div>
              <div className="px-3 mt-4 md:px-4 py-1.5 rounded-full bg-white border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-500 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                D-742 Active
              </div>
              <div className="hidden mt-4 md:flex px-4 py-1.5 rounded-full bg-white border border-gray-200 items-center gap-2 text-xs font-semibold text-gray-500 shadow-sm">
                <Signal className="w-3.5 h-3.5 text-blue-500" />
                98% Signal
              </div>
            </div>
          </div>

          {/* Floating Tracking UI */}
          <div className="absolute left-6 right-6 md:left-8 bottom-[100px] md:bottom-8 md:w-[600px] pointer-events-auto z-10 flex flex-col gap-6">
            
            {/* Tracking Stats row */}
            <div className="flex flex-row gap-4 mb-2">
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-sm flex-1">
                <p className="text-xs font-semibold text-gray-400 mb-1 uppercase">Altitude</p>
                <p className="text-xl font-bold text-gray-900">{simulatedData.altitude.toFixed(1)}m</p>
              </div>
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-sm flex-1">
                <p className="text-xs font-semibold text-gray-400 mb-1 uppercase">Speed</p>
                <p className="text-xl font-bold text-gray-900">{simulatedData.speed.toFixed(1)}km/h</p>
              </div>
              <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-sm flex-1">
                <p className="text-xs font-semibold text-gray-400 mb-1 uppercase">Battery</p>
                <p className="text-xl font-bold text-green-500">{Math.floor(simulatedData.battery)}%</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {phase === "DASHBOARD" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-[32px] px-6 py-5 shadow-2xl shadow-gray-300/60 flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-100"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-brand-red-light flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        Receive Package
                      </h2>
                      <p className="text-xs font-medium text-gray-500">
                        {deliveryLocation.includes(',') ? `Drop coordinates: ${deliveryLocation}` : deliveryLocation}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setPhase("REQUEST")}
                    className="w-full sm:w-auto bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-full py-3 px-6 font-bold shadow-lg shadow-brand-red/30 whitespace-nowrap focus:outline-none"
                  >
                    Receive Here
                  </button>
                </motion.div>
              )}

              {phase === "REQUEST" && (
                <motion.div
                  key="request"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] px-6 py-5 shadow-2xl shadow-gray-300/60 flex flex-col gap-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Confirm Reception</h2>
                    <button onClick={() => setPhase("DASHBOARD")} className="text-gray-400 hover:text-gray-700 text-sm font-semibold">Cancel</button>
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <div className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">From</p>
                      <p className="text-sm font-bold text-gray-900 truncate">SkyHub Station</p>
                    </div>
                    <div className="w-8 h-[2px] bg-gray-200 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45" />
                    </div>
                    <div className="flex-1 bg-brand-red-light/30 p-4 rounded-2xl border border-brand-red/10">
                      <p className="text-[10px] text-brand-red font-semibold uppercase mb-1">To</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{deliveryLocation.includes(',') ? 'Custom coordinates' : deliveryLocation}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setTrackingId(`#FL-${Math.floor(1000 + Math.random() * 9000)}-01`); setPhase("TRACKING"); }}
                    className="w-full bg-brand-red text-white hover:bg-brand-red-dark transition-colors rounded-full py-3 font-bold shadow-lg shadow-brand-red/30 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" /> Confirm & Connect
                  </button>
                </motion.div>
              )}

              {phase === "TRACKING" && (
                <motion.div
                  key="tracking"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="bg-white rounded-[32px] px-6 py-5 shadow-2xl shadow-gray-300/60 flex flex-col sm:flex-row items-center gap-6 relative border border-gray-100"
                >
                  <div className="flex flex-col w-full sm:w-auto flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-900">In Transit</h2>
                      <h2 className="text-2xl font-bold text-brand-red animate-pulse">{formatEta(simulatedData.etaSeconds)}</h2>
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1">To {deliveryLocation}</p>
                  </div>

                  <button
                    onClick={() => setPhase("DELIVERED")}
                    className="w-full sm:w-auto bg-brand-red text-white hover:bg-brand-red-dark rounded-2xl py-3 px-6 font-bold shadow-lg shadow-brand-red/30"
                  >
                    Sim Land
                  </button>
                </motion.div>
              )}

              {phase === "DELIVERED" && (
                <motion.div
                  key="delivered"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] px-6 py-6 shadow-2xl shadow-green-600/10 flex flex-col gap-4 border border-green-100 items-center text-center relative overflow-hidden"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Package Arrived</h2>
                    <p className="text-sm text-gray-500 font-medium">Order {trackingId} is ready at {deliveryLocation}</p>
                  </div>
                  <div className="flex gap-3 w-full mt-2">
                    <button onClick={() => setPhase("DASHBOARD")} className="flex-1 bg-white border border-gray-200 text-gray-600 rounded-full py-3 font-bold flex items-center justify-center gap-2">
                      <QrCode className="w-5 h-5" /> QR
                    </button>
                    <button onClick={() => { setPhase("DASHBOARD"); setActiveTab("LOCKER"); }} className="flex-[2] bg-green-600 text-white rounded-full py-3 font-bold hover:bg-green-700 shadow-lg flex items-center justify-center gap-2">
                      <Unlock className="w-5 h-5" /> Unlock
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </main>
    </div>
  );
}
