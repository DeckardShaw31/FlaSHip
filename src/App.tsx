import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Dashboard } from "./components/Dashboard";
import { RequestFlight } from "./components/RequestFlight";
import { LiveTracking } from "./components/LiveTracking";
import { LockerUnlock } from "./components/LockerUnlock";
import { MapBackground } from "./components/MapBackground";

type AppPhase = "DASHBOARD" | "REQUEST" | "TRACKING" | "DELIVERED";

export default function App() {
  const [phase, setPhase] = useState<AppPhase>("DASHBOARD");

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-dark-space font-sans selection:bg-brand-cyan/30">
      <MapBackground />

      {/* Main App Container */}
      <AnimatePresence mode="wait">
        {phase === "DASHBOARD" && (
          <Dashboard 
            key="dashboard"
            onRequestFlight={() => setPhase("REQUEST")} 
          />
        )}
        {phase === "REQUEST" && (
          <RequestFlight 
            key="request"
            onBack={() => setPhase("DASHBOARD")}
            onConfirm={() => setPhase("TRACKING")} 
          />
        )}
        {phase === "TRACKING" && (
          <LiveTracking 
            key="tracking"
            onDroneLanded={() => setPhase("DELIVERED")} 
          />
        )}
        {phase === "DELIVERED" && (
          <LockerUnlock 
            key="delivered"
            onRestart={() => setPhase("DASHBOARD")} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

