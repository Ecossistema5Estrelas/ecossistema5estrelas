import { defineConfig } from 'sanity'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'datastore-only',
  title: 'ecossistema5estrelas-datastore',

  projectId: 'hf3nh9vb',
  dataset: 'production',

  /**
   * ⚠️ IMPORTANTE — Gate V2-5
   *
   * Nenhum plugin de UI é carregado.
   * Nenhum Studio é ativado.
   * Nenhuma interface humana é permitida.
   *
   * O Sanity atua SOMENTE como datastore,
   * acessado via @sanity/client (terminal / runtime).
   */
  plugins: [],

  schema: {
    types: schemaTypes,
  },
})
