import type { QueryClient } from "@tanstack/react-query";

export const getTokenSync = () => {
  if (typeof window === "undefined") return;
  return localStorage.getItem("auth_token");
};

export const getToken = () => {
  return Promise.resolve(localStorage.getItem("auth_token"));
};

export const getUser = (_queryClient: QueryClient) => {
  // Fake user for demo purposes
  const token = getTokenSync();
  if (!token) return null;

  return {
    id: 1,
    name: "Demo User",
    email: "demo@petstore.com",
    type: "ADMIN",
    roles: [],
  };
};

export const clearToken = () => {
  localStorage.removeItem("auth_token");
};
