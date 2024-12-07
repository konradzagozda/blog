import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { type ArticleItem } from "../App";

interface ArticleProps {
  article: ArticleItem;
}

export function Article({ article }: ArticleProps): ReactElement {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", position: "relative", mt: 4, px: { xs: 0, md: 2 } }}>
      <Container maxWidth="md" sx={{ maxWidth: { xs: "100%", md: "800px" } }}>
        <Typography variant="h4" gutterBottom sx={{ px: { xs: 2, md: 0 }, textAlign: "center" }}>
          {article.title}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, px: { xs: 2, md: 0 } }}>
          <IconButton onClick={() => void navigate("/")} sx={{ ml: { xs: -1, md: 0 } }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1" color="text.secondary">
            {article.date}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", px: { xs: 2, md: 0 } }}>
          {article.content}
        </Typography>
      </Container>
    </Box>
  );
}
