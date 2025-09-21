// @ts-nocheck
import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import schemas from "./schemas";

export default defineConfig({
  name: "default",
  title: "Ecossistema 5 Estrelas",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hf3nh9vb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemas,
  },
});

