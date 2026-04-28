import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HCM_CENTER: [number, number] = [10.7769, 106.7009];

export function InteractiveMap({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <MapContainer 
        center={HCM_CENTER} 
        zoom={15} 
        scrollWheelZoom={true} 
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
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
