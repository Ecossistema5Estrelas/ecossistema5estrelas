import * as React from "react";

type Props = { className?: string; size?: number; color?: string };

export default function BrandMark({ className = "", size = 28, color = "#facc15" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      role="img"
      className={className}
      style={{ width: size, height: size, color }}
    >
      <path d="M12 2.5l2.69 5.45 6.01.87-4.35 4.24 1.03 5.99L12 16.98l-5.38 2.87 1.03-5.99L3.3 8.82l6.01-.87L12 2.5z"/>
    </svg>
  );
}
