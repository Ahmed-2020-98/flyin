"use client";

import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  gradient?: string;
  label?: string;
};

// Renders a remote image but degrades gracefully to a branded gradient if the
// URL fails to load, so the layout never shows a broken-image icon.
export default function SmartImage({
  src,
  alt,
  className = "",
  gradient = "from-brand-400 to-brand-700",
  label,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}
        aria-label={alt}
        role="img"
      >
        {label ? (
          <span className="px-3 text-center text-sm font-semibold text-white/90">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
