import React, { useState, useContext } from 'react';
import { Box, Grid, Typography, Divider, Button } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as code_themes from 'react-syntax-highlighter/dist/esm/styles/hljs';

// import TopBar from './ALTA_CodeBlock/TopBar';
import CodeTexts from './ALTA_CodeBlock/CodeTexts';
import { CodeBlockContext } from '../../context/CodeBlockContext';

export default function ALTA_CodeBlock() {
  const [language] = useState('jsx');
  // const [languageDemo, changeDemo] = useState(CodeTexts['jsx']);

  const { codeLine, setCodeLine } = useContext(CodeBlockContext);
  console.log(codeLine);

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Box pt={3} pb={3}>
          <Box sx={titleStyle}>
            <Typography sx={problemStyle}>2021.04.13 회문</Typography>
            <Box>
              <Button>재업로드</Button>
              <Button>수정</Button>
              <Button>삭제</Button>
            </Box>
          </Box>
          <Box sx={titleStyle}>
            <Typography sx={codeTitleStyle}>Chart.vue</Typography>
            <Typography sx={codeWritterStyle} align="right">
              작성자 : user
            </Typography>
          </Box>
        </Box>
        <Divider fullWidth />
      </Grid>
      <Grid item>
        {/* <Box sx={{ display: 'none' }}>
          <TopBar
            language={{
              value: language,
              onChange: (e) => {
                changeDemo(CodeTexts[e.target.value]);
                return changeLanguage(e.target.value);
              },
              options: Object.keys(CodeTexts).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              )),
            }}
          />
        </Box> */}
        <Box sx={codeBlockStyle} className="codeBlock">
          <SyntaxHighlighter
            language={language}
            style={code_themes['darcula']}
            className="highlighter"
            showLineNumbers="true"
            wrapLines={true}
            lineProps={(lineNum) => ({
              style: {
                display: 'block',
                background: codeLine === lineNum ? 'rgb(41,62,98)' : 'inherit',
              },
              onClick() {
                setCodeLine(lineNum);
              },
            })}
          >
            {CodeTexts[language]}
          </SyntaxHighlighter>
        </Box>
      </Grid>
    </Grid>
  );
}

const codeBlockStyle = {
  height: '33rem',
  overflowY: 'scroll',
};

const titleStyle = {
  minWidth: '480px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

const problemStyle = {
  fontSize: '20px',
};

const codeTitleStyle = {
  fontSize: '50px',
};

const codeWritterStyle = {
  fontSize: '20px',
  marginRight: '16px',
};
