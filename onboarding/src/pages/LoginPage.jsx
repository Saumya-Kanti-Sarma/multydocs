import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../lib/api";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import GoogleButton from "../components/GoogleButton";
import { MdError } from "react-icons/md";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authAPI.login(form);
      setSession(data.token || data.accessToken || data.sessionToken, data.user || {});
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await authAPI.google({ provider: "google" });
      setSession(data.token || data.accessToken, data.user || {});
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-10 fade-in">
        <div className="flex flex-col items-center gap-4">
          <a href="https://multydocs.in" target="_blank">
            <img
              src="/logo.svg"
              alt="MultyDocs"
              width={96}
              height={96}
              className="shrink-0"
            />
          </a>
          <h2 className="text-3xl font-black text-(--text) tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-(--text-gray)">
            Sign in to your MultyDocs account
          </p>
        </div>

        <AuthCard title="Sign in" subtitle="Enter your email and password below">
          <form onSubmit={handleSubmit} className="space-y-0">
            <InputField
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              showPassword
              autoComplete="current-password"
            />

            <div className="flex items-center justify-end mb-8">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm font-medium text-(--brand-orange) hover:underline hover:opacity-90 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <PrimaryButton type="submit" loading={loading} disabled={loading} className="w-full">
              Sign in
            </PrimaryButton>
            <br />
            <p className="mt-8 text-center text-sm text-(--text-gray)">
              Or continue with
            </p>
            <br />
            <GoogleButton
              onClick={handleGoogle}
              loading={loading}
              disabled={loading}
              className="w-full" />

            <p className="mt-6 text-center text-sm text-(--text-gray)">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-medium text-(--brand-orange) hover:underline transition-colors"
              >
                Create an account
              </button>
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-medium text-(--error) border border-(--error)/20 bg-(--error)/5"
                aria-live="polite"
              >
                <MdError className="h-3 w-3 shrink-0" aria-hidden="true" />
                {error}
              </div>
            )}
          </form>
        </AuthCard>
      </div>
    </section>
  );
}
