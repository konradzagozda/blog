import { Document } from "@contentful/rich-text-types";
import { Article, GitHub, Star } from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";

interface TimelineItemData {
  date: string;
  title: string;
  description?: string;
  type: "article" | "project" | "celebration";
  content?: string | Document;
  link?: string; // For projects
}

interface TimelineProps {
  items: TimelineItemData[];
}

export function Timeline({ items }: TimelineProps): ReactElement {
  const navigate = useNavigate();

  const getIcon = (type: TimelineItemData["type"]) => {
    switch (type) {
      case "article":
        return <Article />;
      case "project":
        return <GitHub />;
      case "celebration":
        return <Star />;
    }
  };

  const getDotStyles = (type: TimelineItemData["type"]) => {
    switch (type) {
      case "celebration":
        return {
          bgcolor: "#ffd700", // Golden yellow for celebration
          "& svg": { color: "#000" }, // Black icon
        };
      case "project":
        return {
          bgcolor: "#000", // Black for project
          "& svg": { color: "#fff" }, // White icon
        };
      case "article":
        return {
          bgcolor: "#fff", // White background
          border: "2px solid #000", // Black border
          "& svg": { color: "#000" }, // Black icon
        };
      default:
        return undefined;
    }
  };

  const handleItemClick = (item: TimelineItemData) => {
    if (item.type === "project" && item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    } else if (item.type === "article") {
      void navigate(`/article/${slugify(item.title)}`);
    }
  };

  const getItemSx = (item: TimelineItemData) => {
    if ((item.type === "project" && item.link) || item.type === "article") {
      return {
        cursor: "pointer",
        borderRadius: 1,
        transition: "background-color 0.2s ease-in-out",
        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.03)",
        },
        ...(item.type === "project" && {
          position: "relative",
          "&::after": {
            content: '"↗"',
            position: "absolute",
            top: "8px",
            right: "16px",
            fontSize: "1.2rem",
            color: "text.secondary",
            opacity: 0.7
          }
        })
      };
    }
    return undefined;
  };

  return (
    <>
      {/* Desktop/Tablet Timeline */}
      <MuiTimeline
        position="alternate"
        sx={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: { xs: "none", sm: "block" },
        }}
      >
        {items.map((item, index) => (
          <TimelineItem
            key={`${item.title}-${index}`}
            sx={{
              ...getItemSx(item),
              minHeight: "100px",
              "&::before": {
                padding: "6px 16px",
              },
            }}
            onClick={() => handleItemClick(item)}
          >
            <TimelineOppositeContent
              sx={{
                padding: "6px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                margin: 0,
              }}
              variant="body2"
              color="text.secondary"
            >
              {item.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector
                sx={{
                  visibility: index === 0 ? "hidden" : "visible",
                }}
              />
              <TimelineDot sx={getDotStyles(item.type)}>
                {getIcon(item.type)}
              </TimelineDot>
              <TimelineConnector
                sx={{
                  visibility: index === items.length - 1 ? "hidden" : "visible",
                }}
              />
            </TimelineSeparator>
            <TimelineContent
              sx={{
                padding: "6px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: 0,
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  color: "text.primary",
                  mb: item.description ? 1 : 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minWidth: 0,
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

      {/* Mobile Timeline */}
      <MuiTimeline
        position="right"
        sx={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: { xs: "block", sm: "none" },
          pl: 10,
        }}
      >
        {items.map((item, index) => (
          <TimelineItem
            key={`${item.title}-${index}-mobile`}
            sx={getItemSx(item)}
            onClick={() => handleItemClick(item)}
          >
            <TimelineOppositeContent
              sx={{
                m: "auto 0",
                ...(index === 0 && {
                  mt: -3,
                }),
                ...(index === items.length - 1 && {
                  mt: -2.5,
                }),
                transform: "rotate(-40deg)",
                transformOrigin: "right center",
                width: "90px",
                position: "absolute",
                left: "-100px",
                top: "20px",
                fontSize: "0.7125rem !important",
                whiteSpace: "nowrap",
              }}
              variant="body2"
              color="text.secondary"
            >
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector
                sx={{
                  visibility: index === 0 ? "hidden" : "visible",
                }}
              />
              <TimelineDot sx={getDotStyles(item.type)}>
                {getIcon(item.type)}
              </TimelineDot>
              <TimelineConnector
                sx={{
                  visibility: index === items.length - 1 ? "hidden" : "visible",
                }}
              />
            </TimelineSeparator>
            <TimelineContent
              sx={{
                py: "8px",
                px: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: item.description ? "flex-start" : "center",
                minHeight: 40,
                maxWidth: "600px",
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  color: "text.primary",
                  mb: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minWidth: 0,
                }}
              >
                {item.title}
              </Typography>
              {item.description && (
                <Typography
                  color="text.secondary"
                  sx={{
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                >
                  {item.description}
                </Typography>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </MuiTimeline>
    </>
  );
}
