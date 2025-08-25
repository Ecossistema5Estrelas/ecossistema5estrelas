"use client";
import { MotionDiv } from "./MotionPrimitives";

export default function TesteAnimado() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      className="text-center space-y-4"
    >
      <h1 className="text-5xl font-bold">🌟 Teste Animado</h1>
      <p className="text-lg text-zinc-400">Animação de exemplo com tipagem segura.</p>
    </MotionDiv>
  );
}
