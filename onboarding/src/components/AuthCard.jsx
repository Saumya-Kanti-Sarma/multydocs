import { useState } from "react";
import { MdError, MdCheckCircle, MdInfo } from "react-icons/md";

export default function AuthCard({ title, subtitle, children, className = "" }) {
  const [banner, setBanner] = useState(null);

  const iconByType = { error: <MdError />, success: <MdCheckCircle />, info: <MdInfo /> };
  const colorByType = {
    error: "text-(--error) border-(--error)/20 bg-(--error)/5",
    success: "text-(--success) border-(--success)/20 bg-(--success)/5",
    info: "text-(--text-gray) border-(--border)/30 bg-white",
  };

  return (
    <article
      className={[
        "rounded-(--radius-lg) border border-gray-200 bg-(--card-bg) shadow-(--shadow) p-8 md:p-10 w-full max-w-md mx-auto fade-in",
        className,
      ].join(" ")}
    >
      <div className="mb-2">
        <h2 className="text-center text-2xl md:text-3xl font-black text-(--text) tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className=" text-center mt-1 text-sm text-(--text-gray) leading-relaxed">
            {subtitle}
          </p>
        )}
        <br />
      </div>

      {banner && (
        <div
          className={[
            "flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-sm font-medium border",
            colorByType[banner.type],
          ].join(" ")}
        >
          <span aria-hidden="true" className="shrink-0">
            {iconByType[banner.type]}
          </span>
          <span>{banner.text}</span>
        </div>
      )}

      <div className="space-y-4">{children}</div>
    </article>
  );
}

