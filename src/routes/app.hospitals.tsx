import { createFileRoute } from "@tanstack/react-router";
import { providers } from "@/lib/mockData";
import { ProviderCard } from "@/components/ProviderCard";
import { NearbyMap } from "@/components/NearbyMap";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/app/hospitals")({
  component: () => (
    <ProviderListPage
      type="hospital"
      title="Find a Hospital"
      subtitle="Verified hospitals near the University of Ilorin, ranked by distance, rating and wait time."
      mapQuery="hospitals near University of Ilorin Tanke Ilorin"
      showMap
    />
  ),
});

export function ProviderListPage({
  type,
  title,
  subtitle,
  mapQuery,
  showMap,
}: {
  type: "hospital" | "pharmacy" | "lab";
  title: string;
  subtitle: string;
  mapQuery?: string;
  showMap?: boolean;
}) {
  const [q, setQ] = useState("");
  const list = providers
    .filter((p) => p.type === type)
    .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {showMap && (
        <NearbyMap
          providers={list.filter((p) => p.lat && p.lng)}
          query={mapQuery ?? `${type}s near me Ilorin`}
        />
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
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
}
