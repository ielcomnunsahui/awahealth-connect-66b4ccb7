import { createFileRoute } from "@tanstack/react-router";
import { providers, formatNaira } from "@/lib/mockData";
import { Siren, Phone, Navigation, Ambulance, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/emergency")({
  component: Emergency,
});

function Emergency() {
  const ers = providers.filter(p => p.type === "hospital" && p.open).sort((a,b) => a.distance - b.distance);
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-destructive to-warning p-8 text-destructive-foreground shadow-elevated">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Siren className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">Emergency assistance</h1>
            <p className="mt-1 max-w-lg text-destructive-foreground/90">
              One tap connects you to the nearest emergency centre and dispatches an ambulance request.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-destructive hover:bg-white/90">
                <Phone className="h-4 w-4" /> Call SOS · 112
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Ambulance className="h-4 w-4" /> Request ambulance
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Nearest emergency-ready hospitals — sorted by distance
        </div>
        <div className="space-y-3">
          {ers.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-4 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 font-display font-bold text-destructive">
                  {i + 1}
                </div>
                <div>
                  <div className="font-display font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.address} · {p.distance} km · ER fee {formatNaira(p.fee)}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><Phone className="h-4 w-4" /></Button>
                <Button size="sm" className="bg-primary"><Navigation className="h-4 w-4" /> Go</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
