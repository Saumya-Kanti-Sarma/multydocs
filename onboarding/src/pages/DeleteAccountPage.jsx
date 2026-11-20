import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../lib/api";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { FaArrowLeft, FaUser, FaLock } from "react-icons/fa";
import { MdError } from "react-icons/md";

export default function DeleteAccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleConfirm = () => setConfirmed(true);
  const handleCancel = () => setConfirmed(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authAPI.deleteAccount({
        email: form.email,
        password: form.password,
      });
      logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Delete account"
      subtitle="This action is permanent and cannot be undone"
      className="max-w-md"
    >
      {!confirmed ? (
        <>
          <p className="text-sm text-(--text-gray) mb-8">
            Deleting your account will remove all your personal data and generated
            documents. This cannot be reversed.
          </p>

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

          <div className="flex items-center justify-between mb-8">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-medium text-(--text-gray) hover:text-(--text) transition-colors"
            >
              Cancel
            </button>
            <PrimaryButton
              type="button"
              variant="danger"
              onClick={handleConfirm}
              loading={loading}
              disabled={loading}
            >
              Delete my account
            </PrimaryButton>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-(--text-gray) mb-8">
            Type <strong>DELETE</strong> below to permanently delete your account
            for {user?.email || "this account"}.
          </p>

          <InputField
            id="confirm"
            label="Type DELETE to confirm"
            type="text"
            placeholder="DELETE"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            error={form.password !== "DELETE" ? 'Must type "DELETE"' : null}
          />

          <div className="flex items-center justify-between mb-8">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-medium text-(--text-gray) hover:text-(--text) transition-colors"
            >
              Cancel
            </button>
            <PrimaryButton
              type="button"
              variant="danger"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading || form.password !== "DELETE"}
            >
              Permanently delete
            </PrimaryButton>
          </div>
        </>
      )}

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
