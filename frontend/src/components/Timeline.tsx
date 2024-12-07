import { Article, Star, Terminal } from "@mui/icons-material";
import {
  Timeline as MuiTimeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { type ReactElement } from "react";

interface TimelineItemData {
  date: string;
  title: string;
  description?: string;
  type: "article" | "project" | "celebration";
}

interface TimelineProps {
  items: TimelineItemData[];
}

export function Timeline({ items }: TimelineProps): ReactElement {
  const getIcon = (type: TimelineItemData["type"]) => {
    switch (type) {
      case "article":
        return <Article />;
      case "project":
        return <Terminal />;
      case "celebration":
        return <Star fontSize="small" />;
    }
  };

  const getDotStyles = (type: TimelineItemData["type"]) => {
    switch (type) {
      case "celebration":
        return {
          bgcolor: "#ffd700",  // Golden yellow for celebration
          p: 1,
          "& svg": { color: "#000" }  // Black icon
        };
      case "project":
        return {
          bgcolor: "#000",  // Black for project
          "& svg": { color: "#fff" }  // White icon
        };
      case "article":
        return {
          bgcolor: "#fff",  // White background
          border: "2px solid #000",  // Black border
          "& svg": { color: "#000" }  // Black icon
        };
      default:
        return undefined;
    }
  };

  return (
    <MuiTimeline position="right">
      {items.map((item, index) => (
        <TimelineItem key={`${item.title}-${index}`}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            {item.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {index !== 0 && <TimelineConnector />}
            <TimelineDot
              sx={getDotStyles(item.type)}
            >
              {getIcon(item.type)}
            </TimelineDot>
            {index !== items.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent 
            sx={{ 
              py: "12px", 
              px: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: item.description ? "flex-start" : "center",
              minHeight: 40
            }}
          >
            <Typography 
              variant="h6" 
              component="span"
              sx={{
                mt: item.description ? 0 : "auto",
                mb: item.description ? 0.5 : "auto"
              }}
            >
              {item.title}
            </Typography>
            {item.description && (
              <Typography color="text.secondary">
                {item.description}
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
}
