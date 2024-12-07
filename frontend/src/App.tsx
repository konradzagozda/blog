import { type ReactElement } from "react";
import { Header } from "./components/Header";
import { Timeline } from "./components/Timeline";

const timelineItems = [
  {
    date: "Jan 15, 2024",
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into advanced TypeScript patterns including mapped types, conditional types, and template literal types.",
    type: "article" as const,
  },
  {
    date: "Jan 10, 2024",
    title: "React Performance Optimization",
    description: "A comprehensive guide to optimizing React applications, from memo and useMemo to code splitting and bundle optimization.",
    type: "article" as const,
  },
  {
    date: "Jan 5, 2024",
    title: "Building Accessible Components",
    description: "Learn how to create truly accessible React components following WCAG guidelines and best practices.",
    type: "article" as const,
  },
  {
    date: "Jan 1, 2024",
    title: "Guide to State Management",
    description: "A comprehensive exploration of state management concepts and techniques in modern web development.",
    type: "article" as const,
  },
  {
    date: "Dec 29, 2023",
    title: "Understanding DevOps",
    description: "A comprehensive exploration of devops concepts and techniques in modern web development.",
    type: "project" as const,
  },
  {
    date: "Dec 28, 2023",
    title: "This Website Is Born! 🎉",
    type: "celebration" as const,
  },
];

export function App(): ReactElement {
  return (
    <>
      <Header />
      <Timeline items={timelineItems} />
    </>
  );
}
