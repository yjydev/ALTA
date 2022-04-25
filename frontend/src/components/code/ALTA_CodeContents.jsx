import { Box, Grid, Divider } from '@mui/material';

import ALTA_CodeBlock from './ALTA_CodeBlock';
import ALTA_CodeTree from './ALTA_CodeTree';
import ALTA_CodeCommentList from './ALTA_CodeCommentList';

export default function ALTA_CodeContents() {
  return (
    <Box sx={wrapper}>
      <Grid container direction="column" columnGap={5}>
        <Grid item sx={wrapper_inner}>
          <Box pt={6} pl={2}>
            <ALTA_CodeTree />
          </Box>
        </Grid>
        <Grid item sx={wrapper_inner}>
          <Grid container direction="column-reverse">
            <Grid item>
              <Box p={2}>
                <ALTA_CodeBlock />
              </Box>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
          <Grid item>
            <Box>
              <ALTA_CodeCommentList />
            </Box>
          </Grid>
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

const wrapper_inner = {
  height: '100vh',
};
