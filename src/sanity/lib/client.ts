import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Create a standard client for normal usage
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: false,
  },
});

// Create a preview client for draft content
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "previewDrafts",
  stega: {
    enabled: true,
    studioUrl: "/studio", // This matches your basePath in sanity.config.ts
  },
});

// Helper function to use the appropriate client
export const getClient = (preview = false) =>
  preview ? previewClient : client;
