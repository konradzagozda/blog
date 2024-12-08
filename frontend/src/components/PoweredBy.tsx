import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type ReactElement } from "react";
import awsLogo from "../assets/aws.svg";
import contentfulLogo from "../assets/contentful.svg";
import reactLogo from "../assets/react.svg";

export function PoweredBy(): ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: isMobile ? 16 : 16,
        right: isMobile ? 8 : 16,
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "row",
        alignItems: isMobile ? "flex-end" : "center",
        gap: isMobile ? 1 : 2,
        opacity: 0.7,
        transition: "opacity 0.2s ease-in-out",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: "0.875rem",
          mr: isMobile ? 0 : 1,
          mt: isMobile ? 1 : 0,
          writingMode: isMobile ? "vertical-rl" : "horizontal-tb",
          transform: isMobile ? "rotate(180deg)" : "none",
        }}
      >
        built with
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 1 : 2,
          alignItems: "center",
        }}
      >
        <Tooltip title="AWS" arrow placement={isMobile ? "left" : "top"}>
          <img
            src={awsLogo}
            alt="AWS"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title="React" arrow placement={isMobile ? "left" : "top"}>
          <img
            src={reactLogo}
            alt="React"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title="Contentful" arrow placement={isMobile ? "left" : "top"}>
          <img
            src={contentfulLogo}
            alt="Contentful"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
