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

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);

interface ArticleProps {
  article: ArticleItem;
}

const CODE_FONTS = "'Source Code Pro', 'JetBrains Mono', 'Fira Code', monospace";

export function Article({ article }: ArticleProps): ReactElement {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", position: "relative", mt: 4, px: { xs: 0, md: 2 } }}>
      <Container maxWidth="md" sx={{ maxWidth: { xs: "100%", md: "800px" } }}>
        <Typography 
          variant="h1" 
          component="h1"
          gutterBottom 
          sx={{ 
            px: { xs: 2, md: 0 }, 
            textAlign: "center" 
          }}
        >
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
              h1: ({ children }) => (
                <Typography variant="h2" component="h2" gutterBottom>
                  {children}
                </Typography>
              ),
              h2: ({ children }) => (
                <Typography variant="h3" component="h3" gutterBottom>
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography variant="h4" component="h4" gutterBottom>
                  {children}
                </Typography>
              ),
              h4: ({ children }) => (
                <Typography variant="h5" component="h5" gutterBottom>
                  {children}
                </Typography>
              ),
              h5: ({ children }) => (
                <Typography variant="h6" component="h6" gutterBottom>
                  {children}
                </Typography>
              ),
              h6: ({ children }) => (
                <Typography variant="h6" component="h6" gutterBottom>
                  {children}
                </Typography>
              ),
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
                        fontFamily: CODE_FONTS,
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: CODE_FONTS,
                        }
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
