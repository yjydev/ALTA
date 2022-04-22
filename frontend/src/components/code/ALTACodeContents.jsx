import { Box, Typography, Grid } from '@mui/material';

import ALTACodeBlock from './CodeBlock';

export default function ALTACodeContents() {
  return (
    <Box sx={wrapper}>
      <Grid container direction="column" columnGap={6} spacing={2}>
        <Grid item sx={codeTreeStyle}>
          <Box p={2}>
            <Typography>Code Tree</Typography>
            <Typography> &gt; Code Tree2</Typography>
          </Box>
        </Grid>
        <Grid item sx={codeBlock}>
          <Box p={2}>
            <ALTACodeBlock />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const wrapper = {
  height: '100vh',
  maxWidth: '1200px',
  display: 'flex',
};

const codeTreeStyle = {
  height: '100vh',
  border: '1px solid', // 확인용
};

const codeBlock = {
  border: '1px solid', // 확인용
  height: '100vh',
};
