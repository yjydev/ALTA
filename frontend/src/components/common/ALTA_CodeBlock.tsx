import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as code_themes from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function ALTA_CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [codeLine, setCodeLine] = useState(0);

  return (
    <Grid container direction="column" spacing={5}>
      <Box sx={codeBlockStyle} className="codeBlock">
        <SyntaxHighlighter
          language={language}
          style={code_themes['darcula']}
          className="highlighter"
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNum: number) => ({
            style: {
              display: 'block',
              background: codeLine === lineNum ? 'rgb(41,62,98)' : 'inherit',
            },
            onClick() {
              setCodeLine(lineNum);
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
  marginTop: '5rem',
  height: '33rem',
  overflowY: 'scroll',
  minWidth: '900px',
  maxWidth: '900px',
};
