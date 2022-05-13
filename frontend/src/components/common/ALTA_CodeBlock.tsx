import { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as code_themes from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeStore } from '../../context/CodeContext';

type Props = { code: string; language: string };

export default function ALTA_CodeBlock({ code, language }: Props) {
  const { codeLine, setCodeLine } = useContext(CodeStore);

  return (
    <Grid container direction="column" spacing={5} sx={codeBlockStyle} className="codeBlock">
      <Box>
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={code_themes['darcula']}
          className="highlighter"
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNum: number) => ({
            id: `codeLine-${lineNum}`,
            style: {
              display: 'block',
              background: codeLine === lineNum ? 'rgb(41,62,98)' : 'inherit',
            },
            onClick() {
              if (codeLine !== lineNum) {
                setCodeLine(lineNum);
                const c = document.getElementById('outlined-multiline-static-comment');
                if (c) {
                  c.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                setCodeLine(0);
              }
            },
          })}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Grid>
  );
}

const codeBlockStyle = {
  height: '33rem',
  overflowY: 'scroll',
  width: '100%',
  margin: '0 auto',
  boxSizing: 'content-box',
};
