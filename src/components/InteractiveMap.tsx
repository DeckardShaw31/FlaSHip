import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plus, Minus, LocateFixed, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HCM_CENTER: [number, number] = [10.7769, 106.7009];
const DESTINATION: [number, number] = [10.7820, 106.7050];
const USER_LOCATION: [number, number] = [10.7790, 106.7015];

const pingIcon = new L.DivIcon({
  html: `<div class="relative w-4 h-4">
           <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" style="animation-duration: 2s;"></div>
           <div class="absolute inset-0.5 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
         </div>`,
  className: '!bg-transparent border-none',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Custom icon for the drone
const droneIcon = new L.DivIcon({
  html: `<div style="background-color: var(--color-brand-red, #E60000); width: 24px; height: 24px; border-radius: 50%; box-shadow: 0 4px 12px rgba(230,0,0,0.4); display: flex; align-items: center; justify-content: center; border: 3px solid white;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 9l-4 2l2 4l3 -1v-6z" />
            <path d="M14 9l4 2l-2 4l-3 -1v-6z" />
            <path d="M12 14v4" />
            <path d="M10 18h4" />
            <path d="M4 8l16 0" />
            <path d="M12 4v4" />
          </svg>
        </div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

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

function FlightPathOverlay({ phase, etaSeconds, speed, destination }: { phase?: string, etaSeconds?: number, speed?: number, destination: [number, number] }) {
  const map = useMap();
  const [currentPos, setCurrentPos] = useState<[number, number]>(HCM_CENTER);

  useEffect(() => {
    if (phase === "TRACKING" && etaSeconds !== undefined) {
      // Calculate progress (total estimated time originally was ~252s)
      const totalTime = 252;
      
      // We can use speed to add a slight real-time jitter/offset to make it feel more alive
      const speedOffset = speed ? (speed - 45) / 1000 : 0; // arbitrary small offset based on speed variance
      
      let progress = 1 - (etaSeconds / totalTime);
      progress = Math.min(1, Math.max(0, progress + speedOffset * 0.01));
      
      const currentLat = HCM_CENTER[0] + (destination[0] - HCM_CENTER[0]) * progress;
      const currentLng = HCM_CENTER[1] + (destination[1] - HCM_CENTER[1]) * progress;
      
      setCurrentPos([currentLat, currentLng]);

      // Optional: keep drone in view
      // map.panTo([currentLat, currentLng], { animate: true, duration: 1 });
    } else {
      setCurrentPos(HCM_CENTER);
    }
  }, [phase, etaSeconds, speed, map, destination]);

  if (phase !== "TRACKING") return null;

  const m = Math.floor((etaSeconds || 0) / 60);
  const s = Math.floor((etaSeconds || 0) % 60);
  const formattedEta = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return (
    <>
      <Polyline 
        positions={[HCM_CENTER, destination]} 
        color="var(--color-brand-red, #E60000)" 
        weight={3} 
        dashArray="10, 10" 
        opacity={0.5} 
        className="animate-[dash_2s_linear_infinite]"
      />
      <Polyline 
        positions={[HCM_CENTER, currentPos]} 
        color="var(--color-brand-red, #E60000)" 
        weight={4} 
        opacity={0.8} 
      />
      <Marker position={currentPos} icon={droneIcon}>
        <Popup>Flight in transit</Popup>
      </Marker>
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[400] pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-3">
          <div className="flex bg-brand-red-light p-1.5 rounded-full">
            <Clock className="w-4 h-4 text-brand-red" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">ETA</span>
            <span className="text-brand-red font-bold leading-none mt-1 animate-pulse">{formattedEta}</span>
          </div>
        </div>
      </div>
    </>
  );
}

interface InteractiveMapProps {
  children?: React.ReactNode;
  phase?: string;
  etaSeconds?: number;
  speed?: number;
  deliveryLocation?: string;
  onSelectLocation?: (location: string) => void;
}

function LocationPicker({ onSelectCoordinate }: { onSelectCoordinate: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelectCoordinate(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function InteractiveMap({ children, phase, etaSeconds, speed, deliveryLocation, onSelectLocation }: InteractiveMapProps) {
  // Use a custom state for coordinate if the deliveryLocation is a coordinate (e.g., "Lat, Lng")
  const [customCoords, setCustomCoords] = useState<[number, number]>(USER_LOCATION);

  // Parse custom coords if deliveryLocation is formatted as "Lat, Lng"
  useEffect(() => {
    if (deliveryLocation?.includes(',')) {
      const parts = deliveryLocation.split(',');
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        setCustomCoords([lat, lng]);
      }
    }
  }, [deliveryLocation]);

  let activeDestination: [number, number] = customCoords;

  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-[#F3F4F6]">
      <MapContainer 
        center={HCM_CENTER} 
        zoom={15} 
        scrollWheelZoom={true} 
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <LocationPicker 
          onSelectCoordinate={(lat, lng) => {
            if (phase === "DASHBOARD") {
               setCustomCoords([lat, lng]);
               onSelectLocation?.(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            }
          }} 
        />
        <TileLayer
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapControls />
        
        {/* User Location / Selected Pinpoint */}
        <Marker position={customCoords} icon={pingIcon}>
          <Popup>Chosen Delivery Location</Popup>
        </Marker>
        
        {/* Drone Hub */}
        <Marker position={HCM_CENTER}>
          <Popup>142 SkyHub Station</Popup>
        </Marker>
        
        {/* Example area circle */}
        <Circle center={HCM_CENTER} pathOptions={{ fillColor: 'var(--color-brand-red, #E60000)', color: 'var(--color-brand-red, #E60000)' }} radius={800} fillOpacity={0.05} weight={2} />
        
        <FlightPathOverlay phase={phase} etaSeconds={etaSeconds} speed={speed} destination={customCoords} />
        
        {children}
      </MapContainer>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
}
