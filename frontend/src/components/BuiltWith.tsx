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
import githubLogo from "../assets/github.svg";
import reactLogo from "../assets/react.svg";
import terraformLogo from "../assets/terraform.svg";

export function BuiltWith(): ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: isMobile ? 8 : 26,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "flex-end",
        gap: 1,
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
          fontSize: "0.875rem !important",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          whiteSpace: "nowrap",
          mt: 1,
        }}
      >
        built with
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Tooltip title="AWS" arrow placement="left">
          <img
            src={awsLogo}
            alt="AWS"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title="Terraform" arrow placement="left">
          <img
            src={terraformLogo}
            alt="Terraform"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title="React" arrow placement="left">
          <img
            src={reactLogo}
            alt="React"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title="Contentful" arrow placement="left">
          <img
            src={contentfulLogo}
            alt="Contentful"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title="GitHub Actions" arrow placement="left">
          <img
            src={githubLogo}
            alt="GitHubActions"
            style={{ height: 20, width: "auto", cursor: "pointer" }}
          />
        </Tooltip>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: "0.875rem !important",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          whiteSpace: "nowrap",
          mt: 1,
          mb: 1,
        }}
      >
        by Konrad © 2024
      </Typography>
    </Box>
  );
}
