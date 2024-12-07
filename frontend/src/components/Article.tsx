import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { type ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { timelineItems } from "../App";
import { slugify } from "../utils/slugify";

export function Article(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = timelineItems.find(
    (item) => item.type === "article" && slugify(item.title) === (id ?? "")
  );

  if (!article || article.type !== "article") {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4">Article not found</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        mt: 4,
        px: 2, // Add padding for mobile
      }}
    >
      <IconButton
        onClick={() => void navigate("/")}
        sx={{
          position: { xs: "static", md: "absolute" },
          left: { md: "24px" },
          top: { md: "0" },
          mb: { xs: 2, md: 0 },
          mr: { xs: 1, md: 0 },
        }}
      >
        <ArrowBack />
      </IconButton>

      <Container
        maxWidth="md"
        sx={{
          maxWidth: { xs: "100%", md: "800px" },
        }}
      >
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {article.date}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 4 }}>
          {article.content}
        </Typography>
      </Container>
    </Box>
  );
}
