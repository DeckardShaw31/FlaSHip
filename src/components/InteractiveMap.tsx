import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plus, Minus, LocateFixed } from 'lucide-react';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HCM_CENTER: [number, number] = [10.7769, 106.7009];

function MapControls() {
  const map = useMap();
  
  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleRecenter = () => {
    map.setView(HCM_CENTER, 15, { animate: true });
  };

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-[400] flex flex-col gap-2 pointer-events-auto">
      <button 
        type="button"
        onClick={handleZoomIn}
        aria-label="Zoom in"
        className="w-10 h-10 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-700 hover:text-brand-red hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red transition-colors"
      >
        <Plus className="w-5 h-5" />
      </button>
      <button 
        type="button"
        onClick={handleRecenter}
        aria-label="Recenter map"
        className="w-10 h-10 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-700 hover:text-brand-red hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red transition-colors"
      >
        <LocateFixed className="w-5 h-5" />
      </button>
      <button 
        type="button"
        onClick={handleZoomOut}
        aria-label="Zoom out"
        className="w-10 h-10 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-700 hover:text-brand-red hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red transition-colors"
      >
        <Minus className="w-5 h-5" />
      </button>
    </div>
  );
}

export function InteractiveMap({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-[#F3F4F6]">
      <MapContainer 
        center={HCM_CENTER} 
        zoom={15} 
        scrollWheelZoom={true} 
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapControls />
        {/* Drone Hub */}
        <Marker position={HCM_CENTER}>
          <Popup>142 SkyHub Station</Popup>
        </Marker>
        {/* Delivery Locker */}
        <Marker position={[10.7820, 106.7050]}>
          <Popup>Locker #402, Metro</Popup>
        </Marker>
        
        {/* Example drone path circle */}
        <Circle center={HCM_CENTER} pathOptions={{ fillColor: 'var(--color-brand-red)', color: 'var(--color-brand-red)' }} radius={800} fillOpacity={0.05} weight={2} />
        
        {children}
      </MapContainer>
    </div>
  );
}
