"use client";
return (
    <button
      onClick={()=>router.back()}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                 bg-gradient-to-r from-blue-600 to-indigo-500 text-white
                 shadow-md ring-1 ring-white/10 hover:brightness-110 active:translate-y-px transition"
      aria-label={label}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" className="stroke-white" fill="none" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label}
    </button>
  );
}

