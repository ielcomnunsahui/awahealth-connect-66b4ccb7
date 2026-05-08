import { createFileRoute, Link } from "@tanstack/react-router";
import { providerRequests } from "@/lib/mockData";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Building2, ArrowLeft, CheckCircle2, X, Activity, TrendingUp,
  Users, Clock, AlertTriangle,
} from "lucide-react";
import logo from "@/assets/awahealth-logo.jpeg";

export const Route = createFileRoute("/provider")({
  head: () => ({ meta: [{ title: "Provider Portal — AwaHealth" }] }),
  component: ProviderPortal,
});

const sevColor = (s: string) =>
  s === "emergency" ? "bg-destructive/10 text-destructive border-destructive/30" :
  s === "moderate" ? "bg-warning/15 text-warning border-warning/30" :
  "bg-success/10 text-success border-success/30";

function ProviderPortal() {
  const [reqs, setReqs] = useState(providerRequests);
  const update = (id: string, status: "accepted" | "completed") =>
    setReqs(rs => rs.map(r => r.id === id ? { ...r, status } : r));

  const pending = reqs.filter(r => r.status === "pending");
  const active = reqs.filter(r => r.status === "accepted");

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-9 w-9 rounded-md" alt="" />
            <div>
              <div className="font-display text-base font-bold leading-tight">Ajifat Medical Centre</div>
              <div className="text-xs text-muted-foreground">Provider Portal</div>
            </div>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Users, l: "Active patients", v: "248", d: "+12 today", color: "text-accent" },
            { i: Activity, l: "Pending requests", v: pending.length, d: "Avg. 4 min response", color: "text-warning" },
            { i: TrendingUp, l: "Revenue this month", v: "₦3.29M", d: "+18% vs last", color: "text-success" },
            { i: Clock, l: "Avg. wait time", v: "12 min", d: "−3 min vs last", color: "text-primary" },
          ].map(s => (
            <div key={s.l} className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <s.i className={"h-4 w-4 " + s.color} />
              </div>
              <div className="mt-2 font-display text-3xl font-bold">{s.v}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{s.d}</div>
            </div>
          ))}
        </div>

        {/* Incoming */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Incoming requests</h2>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {pending.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pending.length === 0 && (
              <div className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
                You're all caught up.
              </div>
            )}
            {pending.map(r => (
              <div key={r.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {r.patient.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold">{r.patient}</span>
                      <span className={"inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase " + sevColor(r.severity)}>
                        {r.severity === "emergency" && <AlertTriangle className="h-3 w-3" />}
                        {r.severity}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{r.symptom}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{r.time}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => update(r.id, "completed")}>
                    <X className="h-4 w-4" /> Decline
                  </Button>
                  <Button size="sm" className="bg-teal-gradient text-accent-foreground" onClick={() => update(r.id, "accepted")}>
                    <CheckCircle2 className="h-4 w-4" /> Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active */}
        {active.length > 0 && (
          <div>
            <h2 className="mb-4 font-display text-xl font-bold">Active consultations</h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {active.map(r => (
                <div key={r.id} className="rounded-2xl border bg-card p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-semibold">{r.patient}</div>
                      <div className="text-sm text-muted-foreground">{r.symptom}</div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => update(r.id, "completed")}>Mark done</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
