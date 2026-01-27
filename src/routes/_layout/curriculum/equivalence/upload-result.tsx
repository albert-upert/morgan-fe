import { createFileRoute } from "@tanstack/react-router";
import { UploadEquivalenceResultView } from "@/views/curriculum/UploadEquivalenceResultView";

export const Route = createFileRoute(
  "/_layout/curriculum/equivalence/upload-result"
)({
  component: UploadEquivalenceResultView,
});
