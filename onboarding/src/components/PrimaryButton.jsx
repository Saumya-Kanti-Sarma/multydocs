export default function PrimaryButton({
  children,
  type = "button",
  disabled = false,
  loading = false,
  variant = "brand",
  className = "",
  onClick,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    brand: `bg-(--brand-orange) text-white hover:opacity-90 ${base}`,
    outline: `border border-gray-200 bg-white text-(--text) hover:bg-(--muted-bg) ${base}`,
    ghost: `text-(--text-gray) hover:bg-black/5 ${base}`,
    danger: `bg-(--error) text-white hover:opacity-90 ${base}`,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={variants[variant] + " " + className}
    >
      {loading ? (
        <>
          <span className="relative animate-pulse-ring block h-5 w-5 rounded-full border-2 border-current border-t-transparent" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
