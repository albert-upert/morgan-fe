import type { QueryClient } from "@tanstack/react-query";

export const getTokenSync = () => {
  if (typeof window === "undefined") return;
  let token = localStorage.getItem("auth_token");
  // Auto-set demo token for FE Slicing
  if (!token) {
    token = "demo-token-dev-" + Date.now();
    localStorage.setItem("auth_token", token);
  }
  return token;
};

export const getToken = () => {
  return Promise.resolve(getTokenSync());
};

export const getUser = (_queryClient: QueryClient) => {
  // Fake user for demo purposes
  const token = getTokenSync();
  if (!token) return null;

  return {
    id: 1,
    name: "Agus Kurniawan",
    email: "agus@pertamina.ac.id",
    type: "ADMIN",
    roles: [],
  };
};

export const clearToken = () => {
  localStorage.removeItem("auth_token");
};
