import { createFileRoute, Link } from "@tanstack/react-router";
import { adminProviders, formatNaira } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, ArrowLeft, AlertTriangle, CheckCircle2,
  Users, Building2, TrendingUp, DollarSign,
} from "lucide-react";
import logo from "@/assets/awahealth-logo.jpeg";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Console — AwaHealth" }] }),
  component: AdminConsole,
});

const statusBadge = (s: string) =>
  s === "verified" ? "bg-success/10 text-success" :
  s === "pending" ? "bg-warning/15 text-warning" :
  "bg-destructive/10 text-destructive";

function AdminConsole() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-9 w-9 rounded-md" alt="" />
            <div>
              <div className="font-display text-base font-bold leading-tight">AwaHealth Admin</div>
              <div className="text-xs text-muted-foreground">Internal console</div>
            </div>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Platform stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Users, l: "Total users", v: "48,210", d: "+1,240 this week", color: "from-primary to-accent" },
            { i: Building2, l: "Verified providers", v: "2,481", d: "12 pending review", color: "from-accent to-primary" },
            { i: TrendingUp, l: "Requests today", v: "12,408", d: "+9% vs yesterday", color: "from-primary to-accent" },
            { i: DollarSign, l: "GMV this month", v: "₦184M", d: "+22% MoM", color: "from-accent to-primary" },
          ].map(s => (
            <div key={s.l} className="overflow-hidden rounded-2xl border bg-card shadow-card">
              <div className={`bg-gradient-to-r ${s.color} h-1`} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <s.i className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2 font-display text-3xl font-bold">{s.v}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Providers table */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="font-display text-xl font-bold">Provider verification</h2>
              <p className="text-sm text-muted-foreground">Approve, flag or audit healthcare providers on the platform.</p>
            </div>
            <Button size="sm" variant="outline">Export CSV</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 text-left">Provider</th>
                  <th className="px-5 py-3 text-left">Type</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-right">Requests</th>
                  <th className="px-5 py-3 text-right">Revenue</th>
                  <th className="px-5 py-3 text-left">Joined</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {adminProviders.map(p => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 font-semibold text-accent">
                          {p.name[0]}
                        </div>
                        <div className="font-medium">{p.name}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{p.type}</td>
                    <td className="px-5 py-4">
                      <span className={"inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase " + statusBadge(p.status)}>
                        {p.status === "verified" && <CheckCircle2 className="h-3 w-3" />}
                        {p.status === "flagged" && <AlertTriangle className="h-3 w-3" />}
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-mono">{p.requests.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono">{formatNaira(p.revenue)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.joined}</td>
                    <td className="px-5 py-4 text-right">
                      {p.status === "pending" ? (
                        <Button size="sm" className="bg-teal-gradient text-accent-foreground"><ShieldCheck className="h-3.5 w-3.5" /> Verify</Button>
                      ) : p.status === "flagged" ? (
                        <Button size="sm" variant="outline">Review</Button>
                      ) : (
                        <Button size="sm" variant="ghost">Manage</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fraud alerts */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <div className="font-semibold text-destructive">1 fraud alert needs attention</div>
              <div className="text-sm text-muted-foreground">QuickCare Clinic flagged for unusual prescription volume in the last 24h.</div>
            </div>
            <Button size="sm" variant="outline" className="ml-auto">Investigate</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
