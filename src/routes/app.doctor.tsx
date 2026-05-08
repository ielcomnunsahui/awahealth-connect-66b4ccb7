import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { doctors, formatNaira } from "@/lib/mockData";
import { Activity, AlertTriangle, CheckCircle2, Send, Star, Stethoscope, Video, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/app/doctor")({
  component: TalkToDoctor,
});

type Severity = "mild" | "moderate" | "emergency" | null;

function TalkToDoctor() {
  const [step, setStep] = useState<"intake" | "matched">("intake");
  const [symptom, setSymptom] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState<number>(5);

  const triage: Severity =
    severity >= 8 ? "emergency" : severity >= 5 ? "moderate" : "mild";

  if (step === "matched") {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 lg:p-8">
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className={
              "flex h-10 w-10 items-center justify-center rounded-xl " +
              (triage === "emergency" ? "bg-destructive/10 text-destructive" :
               triage === "moderate" ? "bg-warning/15 text-warning" :
               "bg-success/10 text-success")
            }>
              {triage === "emergency" ? <AlertTriangle /> : <CheckCircle2 />}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Triage result</div>
              <div className="font-display text-xl font-bold capitalize">{triage}</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Based on your input we recommend a {triage === "emergency" ? "immediate emergency consultation" : triage === "moderate" ? "consultation within the next hour" : "regular consultation"}.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg font-bold">Available doctors</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {doctors.map(d => (
              <div key={d.id} className="rounded-2xl border bg-card p-5 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-gradient font-display text-lg font-bold text-accent-foreground">
                    {d.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display text-base font-bold">{d.name}</div>
                        <div className="text-sm text-muted-foreground">{d.specialty}</div>
                      </div>
                      <span className={"rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase " +
                        (d.available ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                        {d.available ? "Online" : "Offline"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" />{d.rating}</span>
                      <span>{d.yearsExp} yrs exp</span>
                      <span>{d.hospital}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="font-display text-base font-bold text-primary">{formatNaira(d.fee)}</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><MessageSquare className="h-4 w-4" /> Chat</Button>
                    <Button size="sm" className="bg-teal-gradient text-accent-foreground"><Video className="h-4 w-4" /> Consult</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button variant="ghost" onClick={() => setStep("intake")}>← Update symptoms</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 lg:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Stethoscope className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Talk to a Doctor</h1>
          <p className="text-sm text-muted-foreground">Tell us what's wrong — we'll triage and match you instantly.</p>
        </div>
      </div>

      <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-card">
        <div>
          <label className="text-sm font-semibold">What symptoms are you experiencing?</label>
          <Textarea
            value={symptom}
            onChange={e => setSymptom(e.target.value)}
            placeholder="e.g., persistent headache, mild fever, sore throat…"
            className="mt-2 min-h-[100px]"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">How long have you had it?</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["< 1 day", "1-3 days", "4-7 days", "> 1 week"].map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={"rounded-full border px-4 py-1.5 text-sm transition-colors " +
                  (duration === d ? "border-accent bg-accent text-accent-foreground" : "hover:bg-muted")}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Severity (1-10): <span className="text-accent">{severity}</span></label>
          <input
            type="range" min={1} max={10} value={severity}
            onChange={e => setSeverity(+e.target.value)}
            className="mt-3 w-full accent-[oklch(0.72_0.12_180)]"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Mild</span><span>Moderate</span><span>Severe</span>
          </div>
        </div>
        <Button
          size="lg"
          className="w-full bg-teal-gradient text-accent-foreground"
          disabled={!symptom}
          onClick={() => setStep("matched")}
        >
          <Activity className="h-4 w-4" /> Triage & match me
        </Button>
      </div>
    </div>
  );
}
