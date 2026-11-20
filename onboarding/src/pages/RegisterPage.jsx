import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../lib/api";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import GoogleButton from "../components/GoogleButton";
import { MdError } from "react-icons/md";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.terms) {
      setError("Please accept the terms of service.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const data = await authAPI.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setSession(data.token || data.accessToken || data.sessionToken, data.user || {});
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
      setError(err.message || "Google sign-up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create account" subtitle="Join MultyDocs to save your generated documents">
      <form onSubmit={handleSubmit} className="space-y-0">
        <InputField
          id="name"
          label="Full name"
          type="text"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <InputField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
          showPassword
          autoComplete="new-password"
        />

        <label className="flex items-center gap-2 text-sm text-(--text-gray) cursor-pointer select-none mb-8">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
            className="w-4 h-4 rounded border-gray-200 text-(--brand-orange) focus:ring-(--brand-orange)"
          />
          I agree to the <span className="text-(--brand-orange) hover:underline">Terms of Service</span>
          and <span className="text-(--brand-orange) hover:underline">Privacy Policy</span>
        </label>

        <PrimaryButton type="submit" loading={loading} disabled={loading}>
          Create account
        </PrimaryButton>

        <p className="mt-8 text-center text-sm text-(--text-gray)">
          Or continue with
        </p>

        <GoogleButton onClick={handleGoogle} loading={loading} disabled={loading} />

        <p className="mt-6 text-center text-sm text-(--text-gray)">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-(--brand-orange) hover:underline transition-colors"
          >
            Sign in
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
  );
}
