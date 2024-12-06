import { Article, Terminal } from "@mui/icons-material";
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
  description: string;
  type: "article" | "project";
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
          minHeight: 100,
          "&:before": {
            display: "none"
          }
        },
        [`& .MuiTimelineOppositeContent-root`]: {
          flex: "0 0 120px",
          textAlign: "right",
          paddingRight: 3,
        },
        [`& .MuiTimelineContent-root`]: {
          flex: 2,
          paddingRight: { xs: 2, sm: 6 },
        },
        px: { xs: 2, sm: 4 },
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      {items.map((item) => (
        <TimelineItem key={item.title}>
          <TimelineOppositeContent
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
          <TimelineContent sx={{ 
            py: "12px", 
            px: { xs: 2, sm: 3 }, 
            pr: { sm: 6 }
          }}>
            <Typography variant="h6" component="span">
              {item.title}
            </Typography>
            <Typography>{item.description}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
} 