import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Dashboard } from "./Dashboard";
import { RequestFlight } from "./RequestFlight";
import { LiveTracking } from "./LiveTracking";
import { LockerUnlock } from "./LockerUnlock";
import { MapBackground } from "./MapBackground";

type AppPhase = "DASHBOARD" | "REQUEST" | "TRACKING" | "DELIVERED";

export function MobileApp() {
  const [phase, setPhase] = useState<AppPhase>("DASHBOARD");

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50 font-sans selection:bg-brand-red/30">
      <MapBackground />

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
