import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import author from "./sanity/schemas/author";
import category from "./sanity/schemas/category";
import post from "./sanity/schemas/post";

export default defineConfig({
  name: "ecossistema5estrelas",
  title: "ECOSSISTEMA 5ESTRELAS — Studio",
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  plugins: [structureTool()],
  schema: { types: [author, category, post] },
});
