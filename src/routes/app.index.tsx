import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Hospital, Pill, FlaskConical, Stethoscope, Siren,
  Calendar, Package, History as HistoryIcon, ArrowRight, MapPin,
} from "lucide-react";
import { history, providers } from "@/lib/mockData";

export const Route = createFileRoute("/app/")({
  component: AppHome,
});

const actions = [
  { to: "/app/hospitals", icon: Hospital, label: "Find Hospital", color: "from-primary to-accent" },
  { to: "/app/pharmacies", icon: Pill, label: "Find Pharmacy", color: "from-accent to-primary" },
  { to: "/app/labs", icon: FlaskConical, label: "Find Lab", color: "from-primary to-accent" },
  { to: "/app/doctor", icon: Stethoscope, label: "Talk to Doctor", color: "from-accent to-primary" },
  { to: "/app/emergency", icon: Siren, label: "Emergency", color: "from-destructive to-warning" },
  { to: "/app/labs", icon: Calendar, label: "Book Test", color: "from-accent to-primary" },
  { to: "/app/pharmacies", icon: Package, label: "Order Meds", color: "from-primary to-accent" },
  { to: "/app/history", icon: HistoryIcon, label: "My History", color: "from-accent to-primary" },
];

function AppHome() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 lg:p-8">
      {/* Greeting */}
      <div className="rounded-3xl bg-hero-gradient p-8 text-primary-foreground shadow-elevated">
        <div className="flex items-center gap-2 text-xs font-medium opacity-80">
          <MapPin className="h-3.5 w-3.5" /> Ikeja, Lagos
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Hello, Amina 👋</h1>
        <p className="mt-2 max-w-md text-primary-foreground/80">
          How can we help you feel better today?
        </p>
        <Link to="/app/doctor">
          <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5">
            Talk to a doctor now <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 font-display text-lg font-bold">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((a) => (
            <Link key={a.label} to={a.to}>
              <div className="group flex h-full flex-col gap-3 rounded-2xl border bg-card p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white`}>
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold leading-tight">{a.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Nearby */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Nearby & open now</h2>
          <Link to="/app/hospitals" className="text-sm font-medium text-accent hover:underline">View all</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {providers.filter(p => p.open).slice(0, 3).map(p => (
            <div key={p.id} className="rounded-2xl border bg-card p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 font-semibold text-accent">
                  {p.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{p.type} · {p.distance} km</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Recent activity</h2>
          <Link to="/app/history" className="text-sm font-medium text-accent hover:underline">See history</Link>
        </div>
        <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
          {history.slice(0, 3).map((h, i) => (
            <div key={h.id} className={"flex items-center justify-between gap-3 p-4 " + (i > 0 ? "border-t" : "")}>
              <div>
                <div className="text-sm font-semibold">{h.type} · {h.provider}</div>
                <div className="text-xs text-muted-foreground">{h.summary}</div>
              </div>
              <div className="text-xs text-muted-foreground">{h.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
