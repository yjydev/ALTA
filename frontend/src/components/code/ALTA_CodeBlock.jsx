import React, { useState } from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { CopyBlock, dracula } from 'react-code-blocks';

import TopBar from './ALTA_CodeBlock/TopBar';
import CodeTexts from './ALTA_CodeBlock/CodeTexts';

export default function ALTA_CodeBlock() {
  const [language, changeLanguage] = useState('jsx');
  const [languageDemo, changeDemo] = useState(CodeTexts['jsx']);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item sx={titleStyle}>
        <Box pt={3}>
          <Typography sx={problemStyle}>2021.04.13 회문</Typography>
          <Typography sx={codeTitleStyle}>Chart.vue</Typography>
          <Typography sx={codeWritterStyle}>작성자 : user</Typography>
        </Box>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
      <Grid item sx={codeBlockStyle}>
        <Box>
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
          <Box>
            <CopyBlock
              language={language}
              text={languageDemo}
              codeBlock
              showLineNumbers={true}
              theme={dracula}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const titleStyle = {
  display: 'flex',
  minWidth: '480px',
};

const problemStyle = {
  fontSize: '20px',
};

const codeTitleStyle = {
  fontSize: '50px',
  display: 'inline-block',
  width: '25rem',
};

const codeWritterStyle = {
  display: 'inline-block',
  fontSize: '20px',
};

const codeBlockStyle = {
  height: '90%',
};
