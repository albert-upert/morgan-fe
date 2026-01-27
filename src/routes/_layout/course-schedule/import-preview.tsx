import { createFileRoute } from "@tanstack/react-router";
import { ImportPreviewView } from "@/views/course-schedule/ImportPreviewView";

export const Route = createFileRoute("/_layout/course-schedule/import-preview")(
  {
    component: ImportPreviewView,
  }
);
