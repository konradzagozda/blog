import { Box } from "@mui/material";
import { type ReactElement } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Article } from "./components/Article";
import { Header } from "./components/Header";
import { Timeline } from "./components/Timeline";

export const timelineItems = [
  {
    date: "Jan 15, 2024",
    title: "Advanced TypeScript Patterns",
    description:
      "Deep dive into advanced TypeScript patterns including mapped types, conditional types, and template literal types.",
    content: `TypeScript's type system is incredibly powerful, offering features that go well beyond simple type annotations. 
      In this article, we explore advanced patterns like mapped types for transforming existing types, conditional types for 
      type-level programming, and template literal types for string manipulation at the type level. We'll see how these 
      patterns can make our code more type-safe and maintainable.`,
    type: "article" as const,
  },
  {
    date: "Jan 10, 2024",
    title: "React Performance Optimization",
    description:
      "A comprehensive guide to optimizing React applications, from memo and useMemo to code splitting and bundle optimization.",
    content: `Performance optimization in React applications requires a multi-faceted approach. We'll explore how to 
      effectively use React.memo() for component memoization, useMemo() and useCallback() for expensive computations 
      and callbacks, and implement code splitting strategies. We'll also dive into bundle optimization techniques and 
      how to measure performance improvements.`,
    type: "article" as const,
  },
  {
    date: "Jan 5, 2024",
    title: "Building Accessible Components",
    description:
      "Learn how to create truly accessible React components following WCAG guidelines and best practices.",
    content: `Accessibility isn't just about adding ARIA labels - it's about creating components that work for everyone. 
      This guide covers semantic HTML structure, keyboard navigation, focus management, and ARIA attributes in React components. 
      We'll build common UI patterns with accessibility baked in from the start, ensuring our applications are usable by all.`,
    type: "article" as const,
  },
  {
    date: "Jan 1, 2024",
    title: "Guide to State Management",
    description:
      "A comprehensive exploration of state management concepts and techniques in modern web development.",
    content: `Modern web applications require thoughtful state management approaches. This guide examines different state 
      management patterns, from local component state to global application state. We'll compare solutions like Context API, 
      Redux, and Zustand, discussing when to use each and how to implement them effectively.`,
    type: "article" as const,
  },
  {
    date: "Dec 29, 2023",
    title: "Understanding DevOps",
    description:
      "A comprehensive exploration of devops concepts and techniques in modern web development.",
    type: "project" as const,
    link: "https://github.com/yourusername/devops-guide",
  },
  {
    date: "Dec 25, 2023",
    title: "Modern CSS Architecture",
    description:
      "Exploring modern CSS methodologies, from CSS Modules to CSS-in-JS solutions and utility-first frameworks.",
    content: `Today's CSS landscape offers numerous approaches to styling web applications. We'll dive deep into 
      CSS Modules for local scoping, CSS-in-JS libraries like styled-components and Emotion, and utility-first 
      frameworks like Tailwind CSS. Learn how to choose the right approach for your project and implement scalable 
      styling solutions that maintain code clarity and performance.`,
    type: "article" as const,
  },
  {
    date: "Dec 20, 2023",
    title: "Web Security Best Practices",
    description:
      "Essential security practices for modern web applications, from XSS prevention to CSRF protection.",
    content: `Security should never be an afterthought in web development. This comprehensive guide covers 
      critical security concerns including Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), 
      Content Security Policy (CSP), and secure authentication patterns. Learn practical strategies to protect 
      your applications and your users' data from common vulnerabilities.`,
    type: "article" as const,
  },
  {
    date: "Dec 15, 2023",
    title: "Testing React Applications",
    description:
      "A deep dive into testing strategies for React applications using Jest and React Testing Library.",
    content: `Effective testing is crucial for maintaining reliable React applications. This guide explores 
      unit testing with Jest, component testing with React Testing Library, and integration testing strategies. 
      Learn how to write meaningful tests that give you confidence in your code, set up continuous integration, 
      and maintain high test coverage without sacrificing development speed.`,
    type: "article" as const,
  },
  {
    date: "Dec 10, 2023",
    title: "API Design Patterns",
    description:
      "Best practices for designing robust and scalable APIs, including REST, GraphQL, and webhooks.",
    content: `Well-designed APIs are the backbone of modern web applications. This article explores different 
      API architectural styles, from RESTful services to GraphQL endpoints. We'll cover versioning strategies, 
      authentication patterns, rate limiting, and documentation approaches. Learn how to design APIs that are 
      both developer-friendly and maintainable.`,
    type: "article" as const,
  },
  {
    date: "Dec 5, 2023",
    title: "Web Performance Optimization",
    description:
      "Comprehensive guide to optimizing web application performance, from loading strategies to runtime optimization.",
    content: `Performance is a crucial aspect of user experience. This deep dive covers critical performance 
      optimization techniques including lazy loading, code splitting, caching strategies, and resource 
      optimization. Learn how to measure performance metrics, identify bottlenecks, and implement solutions 
      that significantly improve your application's speed and responsiveness.`,
    type: "article" as const,
  },
  {
    date: "Dec 28, 2023",
    title: "This Website Is Born! 🎉",
    type: "celebration" as const,
  },
];

// Create a wrapper component for the routes
function AnimatedRoutes() {
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
           overflow: "auto",
          }}
        >
          <Routes location={location}>
            <Route path="/" element={<Timeline items={timelineItems} />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </Box>
      </CSSTransition>
    </TransitionGroup>
  );
}

export function App(): ReactElement {
  return (
    <BrowserRouter>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  );
}
