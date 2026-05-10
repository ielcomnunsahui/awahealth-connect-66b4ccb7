import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LocateFixed, Navigation } from "lucide-react";
import { Provider } from "@/lib/mockData";

// Default Tanke / University of Ilorin center
const DEFAULT_CENTER: [number, number] = [8.4615, 4.5972];

// Fix default Leaflet icon paths in bundlers
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = L.divIcon({
  className: "",
  html: `<div style="background:hsl(var(--accent, 174 72% 36%));width:22px;height:22px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 3px hsl(var(--accent,174 72% 36%) / 0.4);"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const userIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:18px;height:18px;"><div style="position:absolute;inset:0;background:#2563eb;border-radius:50%;border:3px solid white;box-shadow:0 0 0 6px rgba(37,99,235,0.25);"></div></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function Recenter({ center, zoom }: { center: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom ?? map.getZoom(), { duration: 0.8 });
  }, [center[0], center[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export function NearbyMap({
  providers = [],
  selectedId,
  onSelect,
  userLocation,
  onUseMyLocation,
  locating,
  height = 400,
}: {
  providers?: Provider[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  userLocation?: { lat: number; lng: number } | null;
  onUseMyLocation?: () => void;
  locating?: boolean;
  height?: number;
}) {
  const points = useMemo(
    () => providers.filter((p): p is Provider & { lat: number; lng: number } => !!p.lat && !!p.lng),
    [providers]
  );

  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : selectedId
      ? (() => {
          const sel = points.find((p) => p.id === selectedId);
          return sel ? [sel.lat, sel.lng] : DEFAULT_CENTER;
        })()
      : DEFAULT_CENTER;

  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  useEffect(() => {
    if (selectedId && markerRefs.current[selectedId]) {
      markerRefs.current[selectedId]?.openPopup();
    }
  }, [selectedId]);

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
          <div>
            <div className="font-display text-sm font-semibold">Live nearby map</div>
            <div className="text-xs text-muted-foreground">
              {userLocation ? "Centered on your location" : "Centered on University of Ilorin, Tanke"} ·{" "}
              {points.length} verified providers
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {onUseMyLocation && (
            <button
              onClick={onUseMyLocation}
              disabled={locating}
              className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-60"
            >
              <LocateFixed className="h-3.5 w-3.5" />
              {locating ? "Locating…" : userLocation ? "Recenter on me" : "Use my location"}
            </button>
          )}
          <a
            href={`https://www.google.com/maps/search/hospitals+near+${center[0]},${center[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            <Navigation className="h-3.5 w-3.5" /> Open in Google Maps
          </a>
        </div>
      </div>

      <div style={{ height }} className="relative">
        <MapContainer
          center={center}
          zoom={14}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={center} zoom={userLocation ? 15 : 14} />

          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {points.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={selectedId === p.id ? selectedIcon : defaultIcon}
              ref={(ref) => {
                markerRefs.current[p.id] = ref;
              }}
              eventHandlers={{
                click: () => onSelect?.(p.id),
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs opacity-70">{p.address}</div>
                  <div className="text-xs">
                    {p.distance} km · ★ {p.rating}
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-accent underline"
                  >
                    Directions
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
