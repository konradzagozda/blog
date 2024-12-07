import { type ReactElement } from "react";
import { Header } from "./components/Header";
import { Timeline } from "./components/Timeline";

const timelineItems = [
  {
    date: "Jan 15, 2024",
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into advanced TypeScript patterns including mapped types, conditional types, and template literal types.",
    content: `TypeScript's type system is incredibly powerful, offering features that go well beyond simple type annotations. 
      In this article, we explore advanced patterns like mapped types for transforming existing types, conditional types for 
      type-level programming, and template literal types for string manipulation at the type level. We'll see how these 
      patterns can make our code more type-safe and maintainable.`,
    type: "article" as const,
  },
  {
    date: "Jan 10, 2024",
    title: "React Performance Optimization",
    description: "A comprehensive guide to optimizing React applications, from memo and useMemo to code splitting and bundle optimization.",
    content: `Performance optimization in React applications requires a multi-faceted approach. We'll explore how to 
      effectively use React.memo() for component memoization, useMemo() and useCallback() for expensive computations 
      and callbacks, and implement code splitting strategies. We'll also dive into bundle optimization techniques and 
      how to measure performance improvements.`,
    type: "article" as const,
  },
  {
    date: "Jan 5, 2024",
    title: "Building Accessible Components",
    description: "Learn how to create truly accessible React components following WCAG guidelines and best practices.",
    content: `Accessibility isn't just about adding ARIA labels - it's about creating components that work for everyone. 
      This guide covers semantic HTML structure, keyboard navigation, focus management, and ARIA attributes in React components. 
      We'll build common UI patterns with accessibility baked in from the start, ensuring our applications are usable by all.`,
    type: "article" as const,
  },
  {
    date: "Jan 1, 2024",
    title: "Guide to State Management",
    description: "A comprehensive exploration of state management concepts and techniques in modern web development.",
    content: `Modern web applications require thoughtful state management approaches. This guide examines different state 
      management patterns, from local component state to global application state. We'll compare solutions like Context API, 
      Redux, and Zustand, discussing when to use each and how to implement them effectively.`,
    type: "article" as const,
  },
  {
    date: "Dec 29, 2023",
    title: "Understanding DevOps",
    description: "A comprehensive exploration of devops concepts and techniques in modern web development.",
    type: "project" as const,
    link: "https://github.com/yourusername/devops-guide",
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
