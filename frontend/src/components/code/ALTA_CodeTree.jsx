import { Box, Typography, Grid } from '@mui/material';

export default function ALTA_CodeTree() {
  return (
    <Grid item sx={codeTreeStyle}>
      <Box p={2}>
        <Typography>Code Tree</Typography>
        <Typography> &gt; Code Tree2</Typography>
      </Box>
    </Grid>
  );
}

const codeTreeStyle = {
  height: '90vh',
  border: '1px solid', // 확인용
};
