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
        pb: 1,
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
            top: 14,
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
            maxWidth: 800,
            width: "100%",
            margin: "0 auto",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "70% 30%",
            gridTemplateRows: "auto auto",
            gap: 0,
            px: 0,
            py: 2,
          }}
        >
          {/* Top Left */}
          <Box
            sx={{
              gridColumn: "1 / 2",
              gridRow: "1 / 2",
              pl: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Hello! 👋 I&apos;m
            </Typography>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{
                fontSize: "1.75rem",
              }}
            >
              Konrad Zagozda
            </Typography>
          </Box>

          {/* Top Right */}
          <Box
            sx={{
              gridColumn: "2 / 3",
              gridRow: "1 / 2",
              display: "flex",
              justifyContent: "flex-end",
              pr: 2,
              mr: "-12px",
              mb: 1,
            }}
          >
            {socialIcons}
          </Box>

          {/* Bottom Left */}
          <Box
            sx={{
              gridColumn: "1 / 2",
              gridRow: "2 / 3",
              pl: 3,
              mt: -0.5,
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                whiteSpace: "nowrap",
                maxWidth: "500px",
              }}
            >
              Here, I explore things, sharing thoughts along the way.
            </Typography>
          </Box>

          {/* Bottom Right */}
          <Box
            sx={{
              gridColumn: "2 / 3",
              gridRow: "2 / 3",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              pr: 2,
              mr: "-12px",
              mt: -0.5,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
                pr: 1.5,
              }}
            >
              Connect with me 👆
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
            padding: "4px 0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginTop: "4px",
              maxWidth: "100%",
              padding: "0 12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.25,
                mb: 0.5,
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
