import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { type ComponentPropsWithoutRef, type ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { type ArticleItem } from "../App";

interface ArticleProps {
  article: ArticleItem;
}

const CODE_FONTS =
  "'Source Code Pro', 'JetBrains Mono', 'Fira Code', monospace";

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("bash", bash);

export function Article({ article }: ArticleProps): ReactElement {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        mt: 4,
        px: { xs: 0, md: 2 },
      }}
    >
      <Container maxWidth="md" sx={{ maxWidth: { xs: "100%", md: "1040px" } }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            px: { xs: 2, md: 0 },
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
            px: { xs: 2, md: 0 },
          }}
        >
          <IconButton
            onClick={() => void navigate("/")}
            sx={{ ml: { xs: -1, md: 0 } }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1" color="text.secondary">
            {article.date}
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 0, md: 0 } }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  sx={{ mt: 6, mb: 2 }}
                >
                  {children}
                </Typography>
              ),
              h2: ({ children }) => (
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  sx={{ mt: 5, mb: 2 }}
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant="h4"
                  component="h4"
                  gutterBottom
                  sx={{ mt: 4, mb: 2 }}
                >
                  {children}
                </Typography>
              ),
              h4: ({ children }) => (
                <Typography
                  variant="h5"
                  component="h5"
                  gutterBottom
                  sx={{ mt: 3, mb: 2 }}
                >
                  {children}
                </Typography>
              ),
              h5: ({ children }) => (
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  sx={{ mt: 2.5, mb: 2 }}
                >
                  {children}
                </Typography>
              ),
              h6: ({ children }) => (
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  sx={{ mt: 2, mb: 2 }}
                >
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography paragraph sx={{ mb: 3 }}>
                  {children}
                </Typography>
              ),
              ul: ({ children }) => (
                <Box component="ul" sx={{ pl: { xs: 4, md: 4 }, my: 2 }}>
                  {children}
                </Box>
              ),
              ol: ({ children }) => (
                <Box component="ol" sx={{ pl: { xs: 4, md: 4 }, my: 2 }}>
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Box component="li" sx={{ pl: 0.5, my: 0.5 }}>
                  {children}
                </Box>
              ),
              iframe: (props) => (
                <Box sx={{ my: 4, width: "100%" }}>
                  <iframe
                    {...props}
                    style={{
                      border: "none",
                      width: "100%",
                      minHeight: "500px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                    }}
                  />
                </Box>
              ),
              code: function Code(
                props: ComponentPropsWithoutRef<"code"> & { inline?: boolean }
              ) {
                const { inline, className, children } = props;
                const match = /language-(\w+)/.exec(className ?? "");
                const lang = match ? match[1] : "";

                if (!inline && lang) {
                  return (
                    // @ts-expect-error - known issue with SyntaxHighlighter types
                    <SyntaxHighlighter
                      style={oneDark}
                      language={lang}
                      PreTag="div"
                      customStyle={{
                        margin: "1.5em 0",
                        borderRadius: "8px",
                        fontFamily: CODE_FONTS,
                        padding: "1em 0.75em",
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: CODE_FONTS,
                        },
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  // @ts-expect-error - known issue with SyntaxHighlighter types
                  <SyntaxHighlighter
                    style={oneDark}
                    PreTag="span"
                    customStyle={{
                      padding: "0.1em 0.2em",
                      borderRadius: "6px",
                      fontFamily: CODE_FONTS,
                    }}
                  >
                    {String(children)}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {article.content as string}
          </ReactMarkdown>
        </Box>
      </Container>
    </Box>
  );
}
