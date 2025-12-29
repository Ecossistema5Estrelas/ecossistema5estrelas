import { defineConfig } from "sanity"
import { schemaTypes } from "./sanity/schema"

export default defineConfig({
  name: "default",
  title: "ECOSSISTEMA 5ESTRELAS",

  projectId: "df3uyd06",
  dataset: "production",
  apiVersion: "2024-01-01",

  schema: {
    types: schemaTypes,
  },
})
