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
          alignSelf: "center",
        },
        [`& .MuiTimelineContent-root`]: {
          flex: 2,
          paddingRight: { xs: 2, sm: 6 },
          paddingY: 2,
        },
        px: { xs: 2, sm: 4 },
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      {items.map((item, index) => (
        <TimelineItem key={item.title}>
          <TimelineOppositeContent
            variant="body2"
            color="text.secondary"
            sx={{ pt: 0.5 }}
          >
            {item.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={
                item.type === "article"
                  ? "primary"
                  : item.type === "celebration"
                  ? "secondary"
                  : "secondary"
              }
              sx={
                item.type === "celebration"
                  ? {
                      bgcolor: "secondary.main",
                      color: "secondary.contrastText",
                    }
                  : undefined
              }
            >
              {item.type === "article" ? (
                <Article />
              ) : item.type === "celebration" ? (
                <Star />
              ) : (
                <Terminal />
              )}
            </TimelineDot>
            <TimelineConnector
              sx={{
                display: index === items.length - 1 ? "none" : "block",
              }}
            />
          </TimelineSeparator>
          <TimelineContent
            sx={{
              py: "12px",
              px: { xs: 2, sm: 3 },
              pr: { sm: 6 },
            }}
          >
            <Typography variant="h6" component="span">
              {item.title}
            </Typography>
            {item.description && <Typography>{item.description}</Typography>}
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
} 