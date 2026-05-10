import { MapPin, Navigation } from "lucide-react";
import { Provider } from "@/lib/mockData";

/**
 * Live, interactive map of nearby providers.
 *
 * Uses an embedded Google Maps iframe centered on the University of Ilorin
 * area (Tanke). No API key required for the basic embed search URL.
 */
export function NearbyMap({
  providers,
  query = "hospitals near University of Ilorin Tanke Ilorin",
  height = 360,
}: {
  providers?: Provider[];
  query?: string;
  height?: number;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
          <div>
            <div className="font-display text-sm font-semibold">Live nearby map</div>
            <div className="text-xs text-muted-foreground">
              Centered on University of Ilorin, Tanke · {providers?.length ?? 0} verified providers
            </div>
          </div>
        </div>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          <Navigation className="h-3.5 w-3.5" /> Open in Google Maps
        </a>
      </div>
      <iframe
        title="Nearby hospitals map"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full border-0"
        style={{ height }}
        allowFullScreen
      />
      {providers && providers.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t bg-muted/30 p-3">
          {providers.map((p) => (
            <a
              key={p.id}
              href={
                p.lat && p.lng
                  ? `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`
                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + " " + p.address)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium hover:border-accent hover:text-accent"
            >
              <MapPin className="h-3 w-3 text-accent" />
              {p.name} · {p.distance} km
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
