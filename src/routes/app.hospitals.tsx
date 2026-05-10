import { createFileRoute } from "@tanstack/react-router";
import { providers } from "@/lib/mockData";
import { ProviderCard } from "@/components/ProviderCard";
import { NearbyMap } from "@/components/NearbyMap";
import { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/app/hospitals")({
  component: () => (
    <ProviderListPage
      type="hospital"
      title="Find a Hospital"
      subtitle="Verified hospitals near the University of Ilorin, ranked by distance, rating and wait time."
    />
  ),
});

// Haversine distance in km
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function ProviderListPage({
  type,
  title,
  subtitle,
}: {
  type: "hospital" | "pharmacy" | "lab";
  title: string;
  subtitle: string;
}) {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const list = useMemo(() => {
    const base = providers
      .filter((p) => p.type === type)
      .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
      .map((p) => {
        if (userLocation && p.lat && p.lng) {
          return {
            ...p,
            distance: Number(
              distanceKm(userLocation, { lat: p.lat, lng: p.lng }).toFixed(1)
            ),
          };
        }
        return p;
      });
    return base.sort((a, b) => a.distance - b.distance);
  }, [type, q, userLocation]);

  const handleUseMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      (err) => {
        setGeoError(err.message || "Unable to retrieve your location.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const el = cardRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <NearbyMap
        providers={list.filter((p) => p.lat && p.lng)}
        selectedId={selectedId}
        onSelect={handleSelect}
        userLocation={userLocation}
        onUseMyLocation={handleUseMyLocation}
        locating={locating}
      />
      {geoError && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {geoError}
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${type}s…`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-11 pl-9"
          />
        </div>
        <button className="flex h-11 items-center gap-2 rounded-md border bg-card px-4 text-sm font-medium hover:bg-muted">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((p) => (
          <div
            key={p.id}
            ref={(el) => {
              cardRefs.current[p.id] = el;
            }}
            onClick={() => setSelectedId(p.id)}
            className={
              "rounded-2xl transition-all " +
              (selectedId === p.id ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : "")
            }
          >
            <ProviderCard provider={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
