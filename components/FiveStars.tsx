"use client";
import * as React from "react";
import BrandMark from "@/components/BrandMark";

type Props = { className?: string; size?: number };

export default function FiveStars({ className = "", size = 22 }: Props) {
  const delays = [0, 0.15, 0.30, 0.45, 0.60];
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {delays.map((d, i) => (
        <BrandMark
          key={i}
          size={size}
          className="drop-shadow-[0_0_6px_rgba(250,204,21,0.75)]"
          // @ts-ignore
          style={{ animation: "pulseStar 1.4s ease-in-out infinite", animationDelay: `${d}s` }}
        />
      ))}
      <style jsx global>{`
        @keyframes pulseStar {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(250,204,21,0)); opacity: .95; }
          50%      { transform: scale(1.18); filter: drop-shadow(0 0 10px rgba(250,204,21,.9)); opacity: 1; }
        }
      `}</style>
    </div>
  );
}



