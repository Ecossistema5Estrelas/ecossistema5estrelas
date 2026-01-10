"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    try {
      localStorage.setItem("cookie_consent", "accepted");
    } catch {}

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }

    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 text-white px-6 py-4 text-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <p className="max-w-3xl">
        Utilizamos cookies para melhorar sua experiência e medir tráfego. Saiba
        mais em nossa{" "}
        <a href="/politica-de-cookies" className="underline">
          Política de Cookies
        </a>.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-white text-black px-4 py-2 rounded font-medium"
      >
        Aceitar cookies
      </button>
    </div>
  );
}

