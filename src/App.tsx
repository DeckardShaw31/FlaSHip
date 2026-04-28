import { MobileApp } from "./components/MobileApp";
import { DesktopDashboard } from "./components/DesktopDashboard";

export default function App() {
  return (
    <div className="w-full h-dvh overflow-hidden bg-slate-950 font-sans">
      <div className="block md:hidden w-full h-full">
        <MobileApp />
      </div>
      <div className="hidden md:block w-full h-full">
        <DesktopDashboard />
      </div>
    </div>
  );
}

