import { Document } from "@contentful/rich-text-types";
import { Box, Container, Typography } from "@mui/material";
import { Entry, EntrySkeletonType } from "contentful";
import { useEffect, useState, type ReactElement } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { Article } from "./components/Article";
import { BuiltWith } from "./components/BuiltWith";
import { Header } from "./components/Header";
import { Timeline } from "./components/Timeline";
import { getBlogEntries } from "./utils/contentful";
import { slugify } from "./utils/slugify";

// Common properties for all timeline items
interface BaseTimelineItem {
  date: string;
  title: string;
  type: "article" | "project" | "celebration";
}

// Article specific properties
export interface ArticleItem extends BaseTimelineItem {
  type: "article";
  description: string;
  content: Document | string;
}

// Project specific properties
interface ProjectItem extends BaseTimelineItem {
  type: "project";
  description: string;
  link: string;
}

// Celebration specific properties
interface CelebrationItem extends BaseTimelineItem {
  type: "celebration";
}

// Union type for all possible timeline items
type TimelineItem = ArticleItem | ProjectItem | CelebrationItem;

// Add these type definitions at the top with your other interfaces
interface BlogEntry extends EntrySkeletonType {
  fields: {
    date: string;
    title: string;
    type: "article" | "project" | "celebration";
    description?: string;
    content?: Document | string;
    link?: string;
  };
}

function ArticleRoute({ items }: { items: TimelineItem[] }) {
  const { id } = useParams();

  const article = items.find(
    (item) => item.type === "article" && slugify(item.title) === id
  );

  if (!article || article.type !== "article") {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4">Article not found</Typography>
      </Container>
    );
  }

  return <Article article={article} />;
}

function AnimatedRoutes({ items }: { items: TimelineItem[] }) {
  const location = useLocation();

  return (
    <div className="route-container" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Timeline items={items} />} />
        <Route path="/article/:id" element={<ArticleRoute items={items} />} />
      </Routes>
    </div>
  );
}

export function App(): ReactElement {
  const [items, setItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    getBlogEntries()
      .then((response) => {
        const transformedItems = response.items
          .map((entry: Entry<BlogEntry>) => {
            const date = new Date(
              entry.fields.date as unknown as string
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return {
              date,
              rawDate: new Date(entry.fields.date as unknown as string),
              title: entry.fields.title as unknown as string,
              type: entry.fields.type as unknown as
                | "article"
                | "project"
                | "celebration",
              ...(entry.fields.description && {
                description: entry.fields.description as unknown as string,
              }),
              ...(entry.fields.content && {
                content: entry.fields.content as unknown as Document | string,
              }),
              ...(entry.fields.link && {
                link: entry.fields.link as unknown as string,
              }),
            } as TimelineItem & { rawDate: Date };
          })
          .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ rawDate, ...item }) => item);

        setItems(transformedItems);
      })
      .catch((error) => console.error("Error fetching blog entries:", error));
  }, []);

  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            position: "relative",
          }}
        >
          <Header />
          <AnimatedRoutes items={items} />
        </Box>
        <BuiltWith />
      </Box>
    </BrowserRouter>
  );
}
