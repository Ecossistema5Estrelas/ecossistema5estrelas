// @ts-nocheck
import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import schemas from "../sanity/schemas";

export default defineConfig({
  name: "studio",
  title: "Ecossistema 5E - Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hf3nh9vb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
});

