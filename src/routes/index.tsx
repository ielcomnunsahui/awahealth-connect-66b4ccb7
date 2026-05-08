import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/Logo";
import {
  Hospital, Pill, FlaskConical, Stethoscope, Siren,
  ShieldCheck, MapPin, MessageCircle, ArrowRight, Star, Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AwaHealth — Find trusted hospitals, pharmacies & labs near you" },
      { name: "description", content: "AwaHealth helps you find nearby trusted hospitals, pharmacies, labs and doctors instantly. Book consultations, lab tests and medication via WhatsApp or web." },
      { property: "og:title", content: "AwaHealth — Healthcare, made nearby" },
      { property: "og:description", content: "Discover, book and pay for verified care across Nigeria — from one app." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <LogoMark />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
            <a href="#how" className="text-sm font-medium text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#providers" className="text-sm font-medium text-muted-foreground hover:text-foreground">For Providers</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/onboarding"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/onboarding"><Button size="sm" className="bg-teal-gradient text-accent-foreground hover:opacity-90">Get started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-[0.06]" />
        <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-card">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Now live across Lagos, Abuja & Port Harcourt
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance text-primary sm:text-6xl lg:text-7xl">
              Healthcare, <span className="text-accent">made nearby.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Find trusted hospitals, pharmacies, labs and doctors around you in seconds.
              Book, consult and pay — from web or WhatsApp.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/onboarding">
                <Button size="lg" className="bg-teal-gradient text-accent-foreground shadow-glow hover:opacity-90">
                  Get started — it's free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <MessageCircle className="h-4 w-4" /> Open in WhatsApp
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div>
                <div className="font-display text-2xl font-bold text-primary">2,400+</div>
                <div className="text-xs text-muted-foreground">Verified providers</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-bold text-primary">98%</div>
                <div className="text-xs text-muted-foreground">Match in &lt; 2 min</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-bold text-primary">4.8★</div>
                <div className="text-xs text-muted-foreground">User rating</div>
              </div>
            </div>
          </div>

          {/* Hero card mockup */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-teal-gradient opacity-20 blur-2xl" />
            <div className="rounded-3xl border bg-card p-6 shadow-elevated">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                Ikeja, Lagos · 3 nearby providers
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { n: "Ajifat Medical Centre", d: "1.2 km", w: "10 min", r: 4.6, t: "Hospital" },
                  { n: "HealthPlus Pharmacy", d: "0.6 km", w: "Walk-in", r: 4.7, t: "Pharmacy" },
                  { n: "Synlab Diagnostics", d: "1.4 km", w: "5 min", r: 4.7, t: "Lab" },
                ].map((p) => (
                  <div key={p.n} className="flex items-center gap-3 rounded-xl border bg-background p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 font-semibold text-accent">
                      {p.n[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-sm font-semibold">
                        {p.n} <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{p.t}</span>·<span>{p.d}</span>·
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.w}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {p.r}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full bg-primary text-primary-foreground">
                Talk to a doctor now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">What you can do</div>
            <h2 className="mt-2 font-display text-4xl font-bold text-primary text-balance">
              Everything you need to get well — in one place.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Hospital, t: "Find Hospital", d: "Discover nearby hospitals, see wait times, and navigate instantly." },
              { icon: Pill, t: "Find Pharmacy", d: "Verified pharmacies with price comparison and stock visibility." },
              { icon: FlaskConical, t: "Find Lab", d: "Book lab tests, upload referrals, and receive digital reports." },
              { icon: Stethoscope, t: "Talk to Doctor", d: "Chat or audio consult with licensed doctors in minutes." },
              { icon: Siren, t: "Emergency Help", d: "One-tap access to nearest ER, ambulances and SOS contacts." },
              { icon: ShieldCheck, t: "Verified providers", d: "Every provider is vetted, licensed and continuously rated." },
            ].map((f) => (
              <div key={f.t} className="group rounded-2xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{f.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">How it works</div>
              <h2 className="mt-2 font-display text-4xl font-bold text-primary text-balance">
                From symptom to treatment, in three steps.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  { n: "01", t: "Tell us what's wrong", d: "Describe your symptoms in chat or via WhatsApp. Our triage flags emergencies." },
                  { n: "02", t: "Get matched instantly", d: "We rank nearby providers by distance, rating, availability and price." },
                  { n: "03", t: "Consult, test, treat", d: "One smooth flow from consultation to lab test to pharmacy pickup." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{s.t}</h3>
                      <p className="text-sm text-muted-foreground">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl bg-hero-gradient p-1 shadow-elevated">
              <div className="rounded-[calc(theme(borderRadius.3xl)-4px)] bg-card p-8">
                <div className="font-display text-sm font-semibold text-muted-foreground">Live triage</div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm">I have a fever and headache for 2 days.</div>
                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    Got it. On a scale of 1-10, how severe is it?
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm">About a 6.</div>
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-accent px-4 py-2.5 text-sm text-accent-foreground">
                    <strong>Moderate.</strong> I'm matching you with Dr. Adaeze (1.2 km) — available now for ₦5,000.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Providers CTA */}
      <section id="providers" className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">For Providers</div>
            <h2 className="mt-2 font-display text-4xl font-bold text-balance">
              Reach more patients. Run a smarter clinic.
            </h2>
            <p className="mt-4 max-w-lg text-primary-foreground/80">
              Join 2,400+ verified hospitals, pharmacies and labs growing on AwaHealth.
              Manage requests, prescriptions and revenue in one dashboard.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/provider"><Button size="lg" className="bg-teal-gradient text-accent-foreground hover:opacity-90">Open provider portal</Button></Link>
              <Link to="/admin"><Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">Admin console</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "+38%", l: "Avg. monthly visits" },
              { k: "₦24M", l: "Processed weekly" },
              { k: "12 min", l: "Avg. response time" },
              { k: "4.8★", l: "Patient satisfaction" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur">
                <div className="font-display text-3xl font-bold text-accent">{s.k}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <LogoMark />
          <div className="text-xs text-muted-foreground">
            © 2026 AwaHealth by Cytobiz · All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
