"use client";

import { useRouter } from "next/navigation";

export default function BotaoVoltar() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <button onClick={handleClick}>
      Voltar
    </button>
  );
}