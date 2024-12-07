import { Article, Star } from "@mui/icons-material";
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
  return (
    <MuiTimeline
      position="right"
      sx={{
        [`& .MuiTimelineItem-root`]: {
          minHeight: "auto",
          pb: 2,
          "&:last-child": {
            pb: 0,
          },
          "&:before": {
            display: "none",
          },
        },
        [`& .MuiTimelineOppositeContent-root`]: {
          flex: "0 0 120px",
          textAlign: "right",
          paddingRight: 3,
          margin: "auto 0",
        },
        [`& .MuiTimelineContent-root`]: {
          padding: "12px 16px",
        },
        px: { xs: 2, sm: 4 },
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      {items.map((item, index) => (
        <TimelineItem key={`${item.title}-${index}`}>
          <TimelineOppositeContent color="text.secondary">
            {item.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {index !== 0 && <TimelineConnector />}
            <TimelineDot
              sx={{
                bgcolor:
                  item.type === "celebration"
                    ? "secondary.main"
                    : "primary.main",
                p: item.type === "celebration" ? 1 : undefined,
              }}
            >
              {item.type === "celebration" ? (
                <Star fontSize="small" />
              ) : (
                <Article />
              )}
            </TimelineDot>
            {index !== items.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="div">
              {item.title}
            </Typography>
            {item.description && (
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {item.description}
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
}
