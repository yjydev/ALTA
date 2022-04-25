import React, { useState } from 'react';
import { Box, Grid, Typography, Divider, Button } from '@mui/material';
import { CopyBlock, dracula } from 'react-code-blocks';

import TopBar from './ALTA_CodeBlock/TopBar';
import CodeTexts from './ALTA_CodeBlock/CodeTexts';

export default function ALTA_CodeBlock() {
  const [language, changeLanguage] = useState('jsx');
  const [languageDemo, changeDemo] = useState(CodeTexts['jsx']);
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Box pt={3} pb={3}>
          <Typography sx={problemStyle}>2021.04.13 회문</Typography>
          <Box sx={titleStyle}>
            <Typography sx={codeTitleStyle}>Chart.vue</Typography>
            <Box>
              <Button>재업로드</Button>
              <Button>수정</Button>
              <Button>삭제</Button>
              <Typography sx={codeWritterStyle} align="right">
                작성자 : user
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Divider variant="fullWidth" />
      <Grid item>
        <Box sx={{ display: 'none' }}>
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
        </Box>
        <Box sx={codeBlockStyle}>
          <CopyBlock
            language={language}
            text={languageDemo}
            codeBlock
            showLineNumbers={true}
            theme={dracula}
          />
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
};

const infoStyle = {
  display: 'flex',
  justifyContent: 'baseline',
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
