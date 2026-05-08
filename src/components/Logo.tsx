import logo from "@/assets/awahealth-logo.jpeg";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="AwaHealth"
      className={className + " rounded-lg object-cover"}
    />
  );
}

export function LogoMark({ withText = true }: { withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo className="h-9 w-9" />
      {withText && (
        <div className="leading-tight">
          <div className="font-display text-lg font-bold tracking-tight">
            <span className="text-primary">Awa</span>
            <span className="text-accent">Health</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            By Cytobiz
          </div>
        </div>
      )}
    </div>
  );
}
