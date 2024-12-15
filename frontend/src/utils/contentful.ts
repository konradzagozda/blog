import { Document } from "@contentful/rich-text-types";
import { createClient, type Entry } from "contentful";
import { config } from "../config";

const client = createClient({
  space: config.contentful.spaceId,
  environment: "master",
  accessToken: config.contentful.accessToken,
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
