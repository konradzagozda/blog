import { Article, Terminal } from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
import { type ReactElement } from "react";

const timelineItems = [
  {
    date: "Mar 15, 2024",
    title: "Building a Modern React App",
    description:
      "A comprehensive guide to building React applications with TypeScript and Tailwind CSS.",
    type: "article" as const,
  },
  {
    date: "Mar 10, 2024",
    title: "Timeline Component",
    description:
      "A reusable timeline component built with React and Tailwind CSS.",
    type: "project" as const,
  },
  {
    date: "Mar 5, 2024",
    title: "State Management in React",
    description:
      "Exploring different state management solutions in React applications.",
    type: "article" as const,
  },
];

export function App(): ReactElement {
  return (
    <Timeline position="alternate">
      {timelineItems.map((item) => (
        <TimelineItem key={item.title}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            {item.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={item.type === "article" ? "primary" : "secondary"}
            >
              {item.type === "article" ? <Article /> : <Terminal />}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {item.title}
            </Typography>
            <Typography>{item.description}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
