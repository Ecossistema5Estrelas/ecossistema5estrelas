"use client";
import { useEffect, useState } from "react";

export default function ConsentBar(){
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const forceShow = params.get("consent") === "show";
      const saved = localStorage.getItem("consent");
      if (forceShow || !saved) {
        setShow(true);
      }
    } catch {}
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-3 inset-x-0 px-4 sm:px-0 z-[60]">
      <div className="mx-auto max-w-3xl rounded-2xl border shadow-lg
        bg-white text-slate-800 border-slate-200
        dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 p-4">
        <p className="text-sm mb-3 font-medium">
          Usamos analytics para melhorar sua experiência. Você concorda?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 rounded-lg
              bg-slate-200 text-slate-900 hover:bg-slate-300
              dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            onClick={() => { localStorage.setItem("consent","denied"); setShow(false); }}
          >
            Negar
          </button>
          <button
            className="px-3 py-1 rounded-lg
              bg-indigo-600 text-white hover:bg-indigo-700
              dark:bg-indigo-500 dark:hover:bg-indigo-600"
            onClick={() => { localStorage.setItem("consent","granted"); setShow(false); }}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
