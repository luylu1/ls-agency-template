import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "lmj3t29d";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Website CMS",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
  ],
});
