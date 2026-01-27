import { createFileRoute } from "@tanstack/react-router";
import { UploadEquivalenceView } from "@/views/curriculum/UploadEquivalenceView";

export const Route = createFileRoute("/_layout/curriculum/equivalence/upload")({
  component: UploadEquivalenceView,
});
