import { Document } from "@contentful/rich-text-types";
import { createClient, type Entry } from "contentful";

const client = createClient({
  space: "5qd8uxunnv69",
  environment: "master",
  accessToken: "gkmni5rbKRJ2hnLNnxDlBMwgX9S2fsQP9WlmhIgyblI", // read only access token
});

// Define the possible types for blog entries
export interface BlogEntryFields {
  date: string;
  title: string;
  type: "article" | "project" | "celebration";
  description?: string;
  content?: Document;
  link?: string;
}

interface BlogEntry {
  contentTypeId: "blogEntry";
  fields: BlogEntryFields;
}

export async function getBlogEntries(): Promise<{
  items: Entry<BlogEntry>[];
}> {
  return client.getEntries<BlogEntry>({
    content_type: "blogEntry",
    order: ["-sys.createdAt"],
  });
}
