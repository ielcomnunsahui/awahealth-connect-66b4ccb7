import { createFileRoute } from "@tanstack/react-router";
import { ProviderListPage } from "./app.hospitals";

export const Route = createFileRoute("/app/labs")({
  component: () => (
    <ProviderListPage
      type="lab"
      title="Find a Lab"
      subtitle="Book diagnostic tests instantly and receive your digital report."
    />
  ),
});
