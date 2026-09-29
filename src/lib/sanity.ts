import { draftMode } from "next/headers";
import { createClient, type QueryParams } from "next-sanity";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
};

export const sanityEnabled = Boolean(sanityConfig.projectId);

export const sanityClient = sanityEnabled
  ? createClient({
      ...sanityConfig,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
): Promise<T | null> {
  if (!sanityClient) return null;
  const { isEnabled } = await draftMode();
  return sanityClient.fetch<T>(query, params, {
    cache: isEnabled ? "no-store" : "force-cache",
    next: { revalidate: isEnabled ? 0 : 3600 },
  });
}
