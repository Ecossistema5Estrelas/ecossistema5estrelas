import React from "react";

export default function GradientBG({children}:{children:React.ReactNode}) {
  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-indigo-500/25 via-fuchsia-500/15 to-cyan-500/10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-24 h-64 bg-gradient-to-r from-fuchsia-500/30 via-sky-500/20 to-emerald-500/20 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
