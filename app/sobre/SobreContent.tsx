'use client'

import Link from 'next/link'

import type { Route } from 'next'

import BotaoVoltar from '@/components/BotaoVoltar'

export default function SobreContent() {
  return (
    <section className="max-w-4xl mx-auto space-y-8 px-4 py-12 text-white">
      <div className="text-center">
        <div className="text-5xl mb-2">ℹ️</div>
        <h1 className="text-3xl font-bold">SOBRE O PROJETO</h1>
        <p className="text-gray-400 mt-2">
          Uma visão clara e ética para transformar o mundo digital.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">🌟 Missão</h2>
          <p>
            Democratizar o acesso à inovação, empoderando pessoas por meio de tecnologia, ética e criatividade.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🔭 Visão</h2>
          <p>
            Ser referência global em inclusão, inteligência artificial e transformação digital com impacto social positivo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🧭 Propósito</h2>
          <p>
            Criar pontes entre pessoas, ideias e oportunidades — gerando novas formas de viver, trabalhar e aprender com dignidade e inovação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📜 Ética</h2>
          <p>
            Baseamos cada decisão em respeito, equidade, transparência e compromisso com o bem coletivo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">💼 Investidores e Parceiros</h2>
          <p>
            Acesse nossa área especial para quem deseja investir ou colaborar:
          </p>
          <Link
            href={"/investidores" as Route}
            className="inline-block mt-2 px-4 py-2 rounded bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            Acessar área de investidores
          </Link>
        </section>
      </div>

      <div className="text-center">
        <BotaoVoltar>Voltar ao Início</BotaoVoltar>
      </div>
    </section>
  )
}
