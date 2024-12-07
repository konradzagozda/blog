import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { type ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type TimelineItem } from "../App";
import { slugify } from "../utils/slugify";

interface ArticleProps {
  items: TimelineItem[];
}

export function Article({ items }: ArticleProps): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = items.find(
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
        px: { xs: 0, md: 2 }, // Remove padding on mobile
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          maxWidth: { xs: "100%", md: "800px" },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            px: { xs: 2, md: 0 }, // Match the padding of other elements
            textAlign: "center",
          }}
        >
          {article.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            px: { xs: 2, md: 0 }, // Add padding only on mobile
          }}
        >
          <IconButton
            onClick={() => void navigate("/")}
            sx={{ ml: { xs: -1, md: 0 } }} // Align with content on mobile
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1" color="text.secondary">
            {article.date}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            px: { xs: 2, md: 0 }, // Add padding only on mobile
          }}
        >
          {article.content}
        </Typography>
      </Container>
    </Box>
  );
}
