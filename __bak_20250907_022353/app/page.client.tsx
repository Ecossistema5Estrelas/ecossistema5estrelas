"use client";
import BrandStars from "@/components/brand/brand-stars";
export default function ClientPage(){
  return (
    <div className="py-6">
      <div className="mb-2"><BrandStars large /></div>
      <h1 className="text-2xl font-extrabold">Bem-vindo ao ecossistema5estrelas</h1>
      <p className="opacity-80 mt-2">Plataforma unificada com blog, loja e mais.</p>
    </div>
  );
}
