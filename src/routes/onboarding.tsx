import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoMark } from "@/components/Logo";
import { ArrowRight, MapPin, ShieldCheck, Phone } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Get started — AwaHealth" }] }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-hero-gradient p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, oklch(1 0 0) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(1 0 0) 0%, transparent 50%)"
        }} />
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <img src="/src/assets/awahealth-logo.jpeg" alt="" className="h-10 w-10 rounded-lg" />
            <div>
              <div className="font-display text-lg font-bold">AwaHealth</div>
              <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">By Cytobiz</div>
            </div>
          </div>
        </div>
        <div className="relative space-y-6">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Welcome to <span className="text-accent">AwaHealth</span>.
          </h1>
          <p className="max-w-md text-primary-foreground/80">
            Find nearby trusted hospitals, pharmacies, labs, and healthcare providers — instantly.
          </p>
          <div className="space-y-3 pt-4">
            {["Verified providers near you", "Talk to doctors in minutes", "Pay securely with card, transfer or USSD"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-primary-foreground/60">
          Secure · HIPAA-aligned · Always private
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden"><LogoMark /></div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              Step {step} of 3
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold text-primary">
              {step === 1 && "What's your number?"}
              {step === 2 && "Share your location"}
              {step === 3 && "About you"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {step === 1 && "We'll send a verification code to confirm it's you."}
              {step === 2 && "So we can match you with the closest verified providers."}
              {step === 3 && "Optional — helps us personalise your care."}
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex items-center gap-2 rounded-md border bg-muted px-3 text-sm font-medium">
                  <Phone className="h-4 w-4 text-muted-foreground" /> +234
                </div>
                <Input
                  placeholder="801 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 flex-1"
                />
              </div>
              <Button
                size="lg"
                className="w-full bg-teal-gradient text-accent-foreground hover:opacity-90"
                onClick={() => setStep(2)}
              >
                Send code <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => setStep(2)}>
                Skip — explore as guest
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <button
                onClick={() => setStep(3)}
                className="group flex w-full items-center gap-4 rounded-2xl border bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-base font-semibold">Use my GPS</div>
                  <div className="text-sm text-muted-foreground">Most accurate · 1-tap</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                <div className="relative flex justify-center"><span className="bg-background px-2 text-xs uppercase text-muted-foreground">or</span></div>
              </div>
              <Input placeholder="Enter your address or city" className="h-11" />
              <Button variant="outline" size="lg" className="w-full" onClick={() => setStep(3)}>
                Continue manually
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Input placeholder="Full name (optional)" className="h-11" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Age" className="h-11" />
                <select className="h-11 rounded-md border bg-background px-3 text-sm">
                  <option>Gender</option><option>Female</option><option>Male</option><option>Other</option>
                </select>
              </div>
              <Input placeholder="Existing conditions (optional)" className="h-11" />
              <Input placeholder="Emergency contact" className="h-11" />
              <Button
                size="lg"
                className="w-full bg-teal-gradient text-accent-foreground hover:opacity-90"
                onClick={() => navigate({ to: "/app" })}
              >
                Enter AwaHealth <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
