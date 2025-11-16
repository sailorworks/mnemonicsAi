// src/sanity/lib/live.ts

// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { apiVersion } from "../env";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
    // The perspective option determines which version of a document to display.
    // "raw" is the default and what should be used for live content.
    perspective: "raw",
  }),
});
