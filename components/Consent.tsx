"use client";
import { useState, useEffect } from "react";

export default function Consent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("consent")) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-3 inset-x-0 px-4 sm:px-0 z-[60]">
      <div className="mx-auto max-w-3xl rounded-2xl border shadow-lg
        bg-white text-slate-800 border-slate-200
        dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 p-4">
        <p className="mb-3 text-sm">
          Usamos cookies para melhorar sua experiência. Ao aceitar, você concorda com nossa política.
        </p>
        <button
          className="rounded-md px-4 py-2 text-sm font-medium
          bg-indigo-600 text-white hover:bg-indigo-700
          dark:bg-indigo-500 dark:hover:bg-indigo-600"
          onClick={() => { localStorage.setItem("consent","granted"); setShow(false); }}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
