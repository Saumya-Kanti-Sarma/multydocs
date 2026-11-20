import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdError } from "react-icons/md";

export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  showPassword = false,
  autoComplete,
}) {
  const [pwVisible, setPwVisible] = useState(false);
  const hasError = !!error;

  const toggle = () => setPwVisible((prev) => !prev);
  const inputType = showPassword && type === "password" ? (pwVisible ? "text" : "password") : type;

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-1.5 text-sm font-semibold text-(--text) tracking-tight"
      >
        {label} {required && <span className="text-(--brand-orange)" aria-label="required">*</span>}
      </label>

      <div className="relative">
        {showPassword && type === "password" && (
          <button
            type="button"
            onClick={toggle}
            aria-label={pwVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-(--text-gray) hover:text-(--brand-orange) transition-colors"
          >
            {pwVisible ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
          </button>
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={[
            "w-full rounded-xl border px-4 py-3 text-(--text) placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-1",
            hasError
              ? "border-(--error) focus:ring-(--error)"
              : "border-gray-200 hover:border-(--text-gray)/50 focus:ring-(--brand-orange)",
          ].join(" ")}
        />
      </div>

      {hasError && (
        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-(--error)">
          <MdError className="h-3 w-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
