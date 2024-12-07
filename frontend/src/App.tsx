import { Box } from "@mui/material";
import { useEffect, useState, type ReactElement } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Article } from "./components/Article";
import { Header } from "./components/Header";
import { Timeline } from "./components/Timeline";
import { getBlogEntries, type BlogEntryFields } from "./utils/contentful";

// Common properties for all timeline items
interface BaseTimelineItem {
  date: string;
  title: string;
  type: "article" | "project" | "celebration";
}

// Article specific properties
interface ArticleItem extends BaseTimelineItem {
  type: "article";
  description: string;
  content: string;
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

// Create a wrapper component for the routes
function AnimatedRoutes({ items }: { items: TimelineItem[] }) {
  const location = useLocation();
  const isArticlePage = location.pathname.startsWith("/article");

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        timeout={600}
        classNames={isArticlePage ? "slide-left" : "slide-right"}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            perspective: "2500px",
            transformStyle: "preserve-3d",
          }}
        >
          <Routes location={location}>
            <Route path="/" element={<Timeline items={items} />} />
            <Route path="/article/:id" element={<Article items={items} />} />
          </Routes>
        </Box>
      </CSSTransition>
    </TransitionGroup>
  );
}

export function App(): ReactElement {
  const [items, setItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    getBlogEntries()
      .then((response) => {
        const transformedItems = response.items.map(
          (entry: { fields: BlogEntryFields }) => ({
            date: entry.fields.date,
            title: entry.fields.title,
            type: entry.fields.type,
            ...(entry.fields.description && {
              description: entry.fields.description,
            }),
            ...(entry.fields.content && {
              content: entry.fields.content.content[0].content[0].value,
            }),
            ...(entry.fields.link && { link: entry.fields.link }),
          })
        ) as TimelineItem[];
        console.log("Transformed items:", transformedItems);
        setItems(transformedItems);
      })
      .catch((error) => console.error("Error fetching blog entries:", error));
  }, []);

  return (
    <BrowserRouter>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          <AnimatedRoutes items={items} />
        </Box>
      </Box>
    </BrowserRouter>
  );
}
