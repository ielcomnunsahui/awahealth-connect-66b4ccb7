import { Provider, formatNaira } from "@/lib/mockData";
import { Star, MapPin, Clock, ShieldCheck, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProviderCard({
  provider,
  primaryAction = "Book",
  onAction,
}: {
  provider: Provider;
  primaryAction?: string;
  onAction?: () => void;
}) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 font-display text-lg font-bold text-accent">
            {provider.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display text-base font-semibold text-foreground">
                {provider.name}
              </h3>
              {provider.verified && (
                <ShieldCheck className="h-4 w-4 text-accent" />
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {provider.address}
            </div>
          </div>
        </div>
        <span
          className={
            "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider " +
            (provider.open
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive")
          }
        >
          {provider.open ? "Open" : "Closed"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/50 p-3">
        <div>
          <div className="text-[10px] font-medium uppercase text-muted-foreground">Distance</div>
          <div className="mt-0.5 font-display text-sm font-bold text-foreground">{provider.distance} km</div>
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase text-muted-foreground">Wait</div>
          <div className="mt-0.5 flex items-center gap-1 font-display text-sm font-bold text-foreground">
            <Clock className="h-3 w-3" />{provider.waitTime}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase text-muted-foreground">Rating</div>
          <div className="mt-0.5 flex items-center gap-1 font-display text-sm font-bold text-foreground">
            <Star className="h-3 w-3 fill-warning text-warning" />{provider.rating}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {provider.specialties.slice(0, 3).map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
          <div className="font-display text-base font-bold text-primary">
            {formatNaira(provider.fee)}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Navigation className="h-4 w-4" /> Navigate
          </Button>
          <Button size="sm" onClick={onAction} className="bg-teal-gradient text-accent-foreground hover:opacity-90">
            {primaryAction}
          </Button>
        </div>
      </div>
    </div>
  );
}
