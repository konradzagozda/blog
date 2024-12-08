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
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const socialIcons = (
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
  );

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
      {/* Desktop social icons */}
      {!isMobile && !isTablet && (
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
          {socialIcons}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.875rem",
              mt: 0.5,
              position: "relative",
              right: "36px",
              "&::after": {
                content: '"Connect with me 👆"',
                position: "absolute",
                top: "-12px",
                right: 0,
                whiteSpace: "nowrap",
                transform: "translateX(24px)",
              },
            }}
          ></Typography>
        </div>
      )}

      {/* Tablet Layout */}
      {isTablet ? (
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            margin: "0 auto",
            p: 2,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              right: 0,
              top: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1,
              mb: 3,
              pr: 2,
            }}
          >
            {socialIcons}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                position: "relative",
                right: "36px",
                mt: 1,
                "&::after": {
                  content: '"Connect with me 👆"',
                  position: "absolute",
                  top: "-12px",
                  right: 0,
                  whiteSpace: "nowrap",
                  transform: "translateX(24px)",
                },
              }}
            ></Typography>
          </Box>
          <Box sx={{ maxWidth: "70%", pl: 3, pt: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: -0.5 }}
              >
                Hello! 👋 I&apos;m
              </Typography>
              <Typography
                variant="h4"
                color="text.primary"
                sx={{
                  fontSize: "1.75rem",
                  mt: 0.5,
                }}
              >
                Konrad Zagozda
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 0.5,
                mb: 2,
                whiteSpace: "nowrap",
                maxWidth: "500px",
              }}
            >
              Here, I explore things, sharing thoughts along the way.
            </Typography>
          </Box>
        </Box>
      ) : (
        /* Desktop and Mobile Layout */
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
              marginTop: "16px",
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
                mb: 1.5,
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
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.5rem", sm: "1.75rem" },
                  display: "inline",
                  mt: 0.5,
                  mb: -1.5,
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
                mt: 2,
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
                  marginTop: "8px",
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
                  size="small"
                  sx={{
                    color: "grey.700",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "grey.100",
                    },
                  }}
                  aria-label="LinkedIn profile"
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
                <IconButton
                  href="https://x.com/konrad_zagozda"
                  target="_blank"
                  rel="noreferrer"
                  size="small"
                  sx={{
                    color: "grey.700",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "grey.100",
                    },
                  }}
                  aria-label="X profile"
                >
                  <X fontSize="small" />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      )}
    </AppBar>
  );
}
