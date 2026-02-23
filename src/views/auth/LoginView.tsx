import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "uper-ui/button";
import { Input } from "uper-ui/input";

export function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback((event: FormEvent) => {
    event.preventDefault();
    // Fake login - just store a token and redirect
    localStorage.setItem("auth_token", "fake-token-12345");
    navigate({ to: "/" });
  }, []);

  return (
    <div className="relative grid min-h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="bg-accent1 absolute inset-0 hidden w-1/2 origin-top-left -skew-x-6 transform md:block"></div>
      <div className="bg-accent1 absolute inset-0 h-1/2 origin-top-left -skew-y-6 transform md:hidden"></div>

      <div className="relative mt-4 flex flex-col items-center justify-center">
        <h1 className="font-quicksand mb-4 text-center text-2xl font-bold text-primary md:text-3xl">
          Pet Store Manager
        </h1>
        <img
          src="/images/Illustration.png"
          width={500}
          height={500}
          alt="Ilustration"
          loading="lazy"
          className="md:max-w-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center bg-white p-8">
        <div className="z-10 flex h-full w-full max-w-md flex-col items-center justify-center">
          <img
            src="/images/RAPIDnet-blue.png"
            width={200}
            height={200}
            alt="RAPIDnet-blue"
            className="mb-4"
            loading="lazy"
          />
          <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">
            Sign in to your account
          </h2>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full rounded-full bg-primary px-4 py-2 text-lg font-medium text-white shadow-md hover:bg-primary/90"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Demo credentials: any email and password will work
          </p>
        </div>
        <div className="mt-8 text-center md:mt-auto">
          <h5 className="text-sm font-bold text-primary md:text-base">
            Siakup
          </h5>
          <p className="text-xs text-primary md:text-sm">
            Developed by @sanakdam
          </p>
        </div>
      </div>
    </div>
  );
}
