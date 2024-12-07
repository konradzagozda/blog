import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { type ArticleItem } from "../App";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';

// Register languages you want to use
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);

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

        <Box sx={{ px: { xs: 2, md: 0 } }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({inline, className, children}) {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match ? match[1] : '';
                
                if (!inline && lang) {
                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={lang}
                      PreTag="div"
                      customStyle={{
                        margin: '1.5em 0',
                        borderRadius: '8px',
                        padding: '1em',
                        fontSize: '14px',
                        fontFamily: '"JetBrains Mono", Consolas, Monaco, monospace',
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  );
                }

                return (
                  <code className={className}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {article.content as string}
          </ReactMarkdown>
        </Box>
      </Container>
    </Box>
  );
}
