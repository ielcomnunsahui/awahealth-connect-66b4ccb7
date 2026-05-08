import { createFileRoute } from "@tanstack/react-router";
import { history } from "@/lib/mockData";
import { Stethoscope, FlaskConical, Pill, FileText } from "lucide-react";

export const Route = createFileRoute("/app/history")({
  component: HistoryPage,
});

const iconFor = (t: string) => {
  if (t === "Consultation") return Stethoscope;
  if (t === "Lab Test") return FlaskConical;
  if (t === "Pharmacy") return Pill;
  return FileText;
};

function HistoryPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">My History</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your consultations, prescriptions and test results in one place.</p>
      </div>
      <div className="space-y-3">
        {history.map(h => {
          const Icon = iconFor(h.type);
          return (
            <div key={h.id} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold">{h.type} · {h.provider}</div>
                    <div className="text-xs text-muted-foreground">{h.date}</div>
                  </div>
                  <span className={
                    "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase " +
                    (h.status === "completed" ? "bg-success/10 text-success" :
                     h.status === "ongoing" ? "bg-warning/15 text-warning" :
                     "bg-muted text-muted-foreground")
                  }>
                    {h.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{h.summary}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
