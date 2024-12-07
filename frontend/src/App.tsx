import { type ReactElement } from "react";
import { Header } from "./components/Header";
import { Timeline } from "./components/Timeline";

const timelineItems = [
  {
    date: "Jan 1, 2024",
    title: "Guide to State Management",
    description:
      "A comprehensive exploration of state management concepts and techniques in modern web development.",
    type: "article" as const,
  },
  {
    date: "Dec 29, 2023",
    title: "Understanding DevOps",
    description:
      "A comprehensive exploration of devops concepts and techniques in modern web development.",
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
