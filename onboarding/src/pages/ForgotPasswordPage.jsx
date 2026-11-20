import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../lib/api";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { FaArrowLeft } from "react-icons/fa";
import { MdError } from "react-icons/md";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard
        title="Reset link sent"
        subtitle="Check your inbox for a link to reset your password"
      >
        <div className="text-center">
          <InputField
            id="email"
            label="Email address"
            type="email"
            value={email}
            readOnly
            className="bg-(--muted-bg)"
          />
          <p className="mt-6 text-sm text-(--text-gray)">
            If an account exists for {email || "this address"}, you&apos;ll receive
            a password reset link shortly.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-8 w-full rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-(--text) hover:bg-(--muted-bg) transition-colors"
          >
            <FaArrowLeft className="h-4 w-4 mr-2" /> Back to sign in
          </button>
        </div>
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
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Forgot password" subtitle="Enter your email and we&apos;ll send you a reset link">
      <form onSubmit={handleSubmit} className="space-y-0">
        <InputField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <PrimaryButton type="submit" loading={loading} disabled={loading}>
          Send reset link
        </PrimaryButton>

        <p className="mt-8 text-center text-sm text-(--text-gray)">
          Remember your password?{" "}
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
