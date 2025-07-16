'use client';

import { useEffect } from "react";
import { db, auth } from "@/lib/firebase";

export default function FirebaseTest() {
  useEffect(() => {
    console.log("🔥 Firebase DB:", db);
    console.log("🔐 Firebase Auth:", auth);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Teste do Firebase 🔥</h1>
      <p>Veja o console do navegador para confirmar se tudo está funcionando.</p>
    </div>
  );
}
