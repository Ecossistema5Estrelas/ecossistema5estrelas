"use client";
import { useEffect, useState } from "react";

function Star({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 2l2.9 6.9L22 9.8l-5 5 1.2 7.2L12 18.6 5.8 22l1.2-7.2-5-5 7.1-1L12 2z"/>
    </svg>
  );
}

export default function Loading() {
  const [merge, setMerge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMerge(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const stars = [0, 1, 2, 3, 4];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600">
      {!merge ? (
        <div className="relative w-32 h-32">
          {stars.map((i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center animate-spin-slow"
              style={{
                transformOrigin: "50% 50%",
                transform: `rotate(${i * 72}deg) translate(0, -3.5rem)`,
              }}
            >
              <Star className="w-6 h-6 text-white drop-shadow" />
            </div>
          ))}
        </div>
      ) : (
        <Star className="w-12 h-12 text-white animate-pulse drop-shadow" />
      )}
    </div>
  );
}
