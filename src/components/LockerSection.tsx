import React, { useState } from 'react';
import { Package, Lock, Box, Unlock, Camera } from 'lucide-react';

export function LockerSection() {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocking(false);
      setUnlocked(true);
    }, 2000);
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Smart Lockers</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 transition-transform">
              <Unlock className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-900">A-01</h4>
              <p className="text-xs font-bold text-green-600 mt-1 uppercase tracking-wider">Available</p>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 transition-transform">
              <Package className="w-8 h-8 text-red-600 mb-3" />
              <h4 className="font-bold text-gray-900">A-02</h4>
              <p className="text-xs font-bold text-red-600 mt-1 uppercase tracking-wider">Occupied</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 transition-transform">
              <Lock className="w-8 h-8 text-yellow-600 mb-3" />
              <h4 className="font-bold text-gray-900">A-03</h4>
              <p className="text-xs font-bold text-yellow-600 mt-1 uppercase tracking-wider">Reserved</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-bold text-gray-900 mb-4">Nearby Lockers</h4>
            <div className="space-y-3">
              <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex justify-between items-center hover:bg-gray-100 transition-colors">
                <div>
                  <h5 className="font-semibold text-gray-900">Locker S-04</h5>
                  <p className="text-sm font-medium text-gray-500">District 1, HCMC</p>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 outline-none">
                  Select
                </button>
              </div>
              <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex justify-between items-center hover:bg-gray-100 transition-colors">
                <div>
                  <h5 className="font-semibold text-gray-900">Skyway Station A</h5>
                  <p className="text-sm font-medium text-gray-500">District 3, HCMC</p>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 outline-none">
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Unlock Locker</h3>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 z-10">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=DRONE-LOCKER-QR-CODE" 
                  alt="QR Code" 
                  className="w-40 h-40"
                  draggable={false}
                />
              </div>
              <p className="mt-6 text-sm font-semibold text-gray-600 z-10">Scan QR or use code below</p>
              <div className="mt-4 text-4xl tracking-[8px] font-bold text-gray-900 z-10">
                829104
              </div>
              
              <button 
                onClick={handleUnlock}
                disabled={isUnlocking || unlocked}
                className={`mt-8 px-8 py-4 rounded-xl font-bold text-sm w-full max-w-xs flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 z-10 ${
                  unlocked ? 'bg-green-100 text-green-700 cursor-default focus:ring-green-500' : 
                  'bg-brand-red text-white hover:bg-brand-red-dark shadow-lg shadow-brand-red/20 transition-all active:scale-95 duration-200 focus:ring-brand-red disabled:opacity-80'
                }`}
              >
                {!unlocked ? (
                  <>
                    {isUnlocking ? <Lock className="w-5 h-5 animate-pulse" /> : <Unlock className="w-5 h-5" />}
                    {isUnlocking ? 'Opening...' : 'Unlock Now'}
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    Locker Opened
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-bold text-gray-900">Locker Camera</h3>
               <Camera className="w-5 h-5 text-gray-400" />
            </div>
            <div className="bg-gray-900 rounded-xl h-48 md:h-56 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-luminosity"></div>
              
              <div className="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider animate-pulse flex items-center gap-2 shadow-lg">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                LIVE REC
              </div>
              
              <div className="absolute bottom-4 left-4 text-white/80 text-xs font-bold font-mono tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                CAM: LCK-S04
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
