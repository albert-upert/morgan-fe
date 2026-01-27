import { createFileRoute } from "@tanstack/react-router";
import { LoginView } from "@/views/auth/LoginView";

export const Route = createFileRoute("/login")({
  component: LoginView,
});
