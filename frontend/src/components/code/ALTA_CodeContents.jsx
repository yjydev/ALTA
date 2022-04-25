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
        <Grid item>
          <Grid container direction="column" rowGap={3}>
            <Grid item sx={wrapper_inner}>
              <ALTA_CodeBlock />
            </Grid>
            <Grid item sx={wrapper_inner}>
              <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
              <ALTA_CodeCommentList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const wrapper = {
  height: '100%',
  maxWidth: '1200px',
  display: 'flex',
};

const wrapper_inner = {
  padding: '10px',
};
