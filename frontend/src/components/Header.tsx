import { Email, LinkedIn, X } from "@mui/icons-material";
import {
  AppBar,
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
      }}
    >
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            display: "flex",
            gap: "3px",
            zIndex: 1,
          }}
        >
          <IconButton
            href="mailto:zagozdakonrad@gmail.com"
            size="small"
            sx={{
              color: "grey.600",
              "&:hover": {
                color: "primary.main",
              },
            }}
            aria-label="Email"
          >
            <Email fontSize="small" />
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

      <div
        style={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          padding: "24px 16px",
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
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "text.primary",
              fontWeight: 500,
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
              mb: 1,
              wordBreak: "break-word",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Konrad Zagozda
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: isMobile ? 2 : 0,
              maxWidth: "600px",
              mx: "auto",
              wordBreak: "break-word",
            }}
          >
            {isMobile ? (
              <>
                Hello!� Here, I explore things,
                <br />
                sharing thoughts along the way.
              </>
            ) : (
              "Hello! 👋 Here, I explore things, sharing thoughts along the way."
            )}
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
                size="small"
                sx={{
                  color: "grey.600",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                aria-label="Email"
              >
                <Email fontSize="small" />
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