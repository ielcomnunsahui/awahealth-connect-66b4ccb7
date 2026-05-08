import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LogoMark } from "@/components/Logo";
import logo from "@/assets/awahealth-logo.jpeg";
import {
  Home, Hospital, Pill, FlaskConical, Stethoscope, Siren,
  History, User, ShieldCheck, Building2, LayoutDashboard,
} from "lucide-react";

const patientItems = [
  { title: "Home", url: "/app", icon: Home },
  { title: "Find Hospital", url: "/app/hospitals", icon: Hospital },
  { title: "Find Pharmacy", url: "/app/pharmacies", icon: Pill },
  { title: "Find Lab", url: "/app/labs", icon: FlaskConical },
  { title: "Talk to Doctor", url: "/app/doctor", icon: Stethoscope },
  { title: "Emergency", url: "/app/emergency", icon: Siren },
  { title: "My History", url: "/app/history", icon: History },
];

const portalItems = [
  { title: "Provider Portal", url: "/provider", icon: Building2 },
  { title: "Admin Console", url: "/admin", icon: ShieldCheck },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) =>
    url === "/app" ? path === "/app" : path.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-3">
        <Link to="/app" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt=""
            className="h-9 w-9 rounded-md object-cover ring-2 ring-sidebar-primary/30"
          />
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="font-display text-base font-bold text-sidebar-foreground">
              AwaHealth
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground/60">
              By Cytobiz
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Patient</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {patientItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Portals</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar p-3">
        <div className="flex items-center gap-2 text-sidebar-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold">
            A
          </div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-semibold">Amina B.</div>
            <div className="text-xs text-sidebar-foreground/60">+234 ••• 4421</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
