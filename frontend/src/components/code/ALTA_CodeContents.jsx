import { Box, Grid } from '@mui/material';

import ALTA_CodeBlock from './ALTA_CodeBlock';
import ALTA_CodeTree from './ALTA_CodeTree';

export default function ALTA_CodeContents() {
  return (
    <Box sx={wrapper}>
      <Grid container direction="column" columnGap={5}>
        <Grid item sx={codeTreeStyle}>
          <Box p={2}>
            <ALTA_CodeTree />
          </Box>
        </Grid>
        <Grid item sx={codeBlock}>
          <Box p={2}>
            <ALTA_CodeBlock />
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
};

const codeBlock = {
  height: '100vh',
};
