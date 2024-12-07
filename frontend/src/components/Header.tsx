import { Email, LinkedIn, X } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type ReactElement } from "react";

export function Header(): ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "grey.50",
        borderBottom: 1,
        borderColor: "grey.200",
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: 0,
        margin: 0,
        "& > div": {
          margin: 0,
          padding: 0,
        },
      }}
    >
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "8px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "3px" }}>
            <IconButton
              href="mailto:zagozdakonrad@gmail.com"
              size={isMobile ? "medium" : "large"}
              sx={{
                color: "grey.600",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              aria-label="Email"
            >
              <Email />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/zagozda/"
              target="_blank"
              rel="noreferrer"
              size={isMobile ? "medium" : "large"}
              sx={{
                color: "grey.700",
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "grey.100",
                },
              }}
              aria-label="LinkedIn profile"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://x.com/konrad_zagozda"
              target="_blank"
              rel="noreferrer"
              size={isMobile ? "medium" : "large"}
              sx={{
                color: "grey.700",
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "grey.100",
                },
              }}
              aria-label="X profile"
            >
              <X />
            </IconButton>
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.875rem",
              mt: 0.5,
            }}
          >
            Connect with me 👆
          </Typography>
        </div>
      )}

      <div
        style={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          padding: "16px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginTop: "8px",
            maxWidth: "100%",
            padding: "0 24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: -2,
              }}
            >
              Hello! 👋 I&apos;m
            </Typography>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
                display: "inline",
                mt: -0.1,
                mb: -1,
              }}
            >
              Konrad Zagozda
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: isMobile ? 2 : 0,
              maxWidth: "600px",
              mx: "auto",
              wordBreak: "break-word",
              mt: 0.5,
            }}
          >
            Here, I explore things, sharing thoughts along the way.
          </Typography>

          {isMobile && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              <IconButton
                href="mailto:zagozdakonrad@gmail.com"
                size={isMobile ? "medium" : "large"}
                sx={{
                  color: "grey.600",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                aria-label="Email"
              >
                <Email />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/zagozda/"
                target="_blank"
                rel="noreferrer"
                size={isMobile ? "medium" : "large"}
                sx={{
                  color: "grey.700",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "grey.100",
                  },
                }}
                aria-label="LinkedIn profile"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href="https://x.com/konrad_zagozda"
                target="_blank"
                rel="noreferrer"
                size={isMobile ? "medium" : "large"}
                sx={{
                  color: "grey.700",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "grey.100",
                  },
                }}
                aria-label="X profile"
              >
                <X />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </AppBar>
  );
}
