import { Box, Grid, Divider } from '@mui/material';

import ALTA_CodeBlock from './ALTA_CodeBlock';
import ALTA_CodeTree from './ALTA_CodeTree';
import ALTA_CodeCommentList from './ALTA_CodeCommentList';

export default function ALTA_CodeContents() {
  return (
    <Grid container justify="center" spacing={8}>
      <Grid item sx={codeTree_wrapper} md={2}>
        <Box pt={4} pl={2}>
          <ALTA_CodeTree />
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Grid container direction="column" rowGap={3}>
          <Grid item sx={codeBlock_wrapper}>
            <ALTA_CodeBlock />
          </Grid>
          <Grid item sx={codeComment_wrapper}>
            <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
            <ALTA_CodeCommentList />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const codeComment_wrapper = {
  padding: '10px',
};

const codeBlock_wrapper = {
  minWidth: '550px',
};

const codeTree_wrapper = {
  display: { xs: 'none', md: 'block' },
};
