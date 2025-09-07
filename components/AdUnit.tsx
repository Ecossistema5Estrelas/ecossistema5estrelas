"use client";
'use client';
import { useEffect } from 'react';

declare global { interface Window { adsbygoogle?: any[] } }

export default function AdUnit({ slot, className }:{ slot:string; className?:string }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, []);
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT || !slot) return null;
  return (
    <ins
      className={`adsbygoogle ${className ?? ''}`}
      style={{ display:'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
