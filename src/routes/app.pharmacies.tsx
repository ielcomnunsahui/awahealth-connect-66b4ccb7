import { createFileRoute } from "@tanstack/react-router";
import { ProviderListPage } from "./app.hospitals";

export const Route = createFileRoute("/app/pharmacies")({
  component: () => (
    <ProviderListPage
      type="pharmacy"
      title="Find a Pharmacy"
      subtitle="Verified pharmacies — compare prices and check availability before you go."
    />
  ),
});
