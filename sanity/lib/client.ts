import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isMock = !projectId || projectId === "placeholder";

export const sanityClient = createClient({
  projectId: isMock ? "placeholder" : projectId,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

// Wraps fetch — returns null silently if Sanity is not configured yet
export async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (isMock) return null;
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch {
    return null;
  }
}
