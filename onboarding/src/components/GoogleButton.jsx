import { FaGoogle } from "react-icons/fa";

export default function GoogleButton({ onClick, disabled = false, loading = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-(--text) shadow-(--shadow) hover:bg-(--muted-bg) hover:border-(--text-gray)/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaGoogle className="h-4 w-4 shrink-0" />
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}
