import { useSearch } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "uper-ui/button";
import { Input } from "uper-ui/input";
import { Typography } from "uper-ui/typography";
import { loginFn } from "@/lib/auth";
import { applyDevSessionClient } from "@/lib/cookie";

const TEST_USERS = [
  { username: "lecturer", label: "Lecturer" },
  { username: "fm-it", label: "IT Support" },
  { username: "hk", label: "House Keeping" },
  { username: "supervisor", label: "Supervisor" },
  { username: "admin", label: "Admin Sistem" },
];

function navigateAfterLogin(redirect: string | undefined) {
  if (redirect) {
    try {
      const redirectUrl = /^https?:\/\//i.test(redirect)
        ? new URL(redirect)
        : new URL(redirect, window.location.origin);
      if (redirectUrl.origin === window.location.origin) {
        window.location.assign(
          `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`
        );
        return;
      }
    } catch {
      /* ke beranda */
    }
  }
  window.location.assign("/");
}

export function LoginView() {
  const search = useSearch({ from: "/login" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const performLogin = async (user: string, pass: string) => {
    setError("");
    setLoading(true);
    try {
      const result = await loginFn({
        data: { username: user, password: pass },
        fetch: (url, init) => fetch(url, { ...init, credentials: "include" }),
      });
      if (!result.success) {
        setError("message" in result ? result.message : "Login failed");
        return;
      }
      if (import.meta.env.DEV) {
        applyDevSessionClient(user);
      }
      navigateAfterLogin(search.redirect);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    void performLogin(username, password);
  };

  const handleQuickLogin = (testUsername: string) => {
    setUsername(testUsername);
    setPassword(testUsername);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <Typography variant="h5">MORGAN</Typography>
          <p className="mt-1 text-sm text-muted-foreground">
            Sistem Pelaporan Aset Universitas Pertamina
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full"
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
            variant="primary"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="space-y-3 border-t pt-4">
          <p className="text-center text-xs font-medium text-muted-foreground">
            Test Users (klik untuk isi form, lalu Sign In)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TEST_USERS.map((user) => (
              <Button
                key={user.username}
                type="button"
                variant="outline"
                size="md"
                className="w-full text-xs"
                onClick={() => handleQuickLogin(user.username)}
              >
                {user.label}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Developed by MORGAN Team
        </p>
      </div>
    </div>
  );
}
