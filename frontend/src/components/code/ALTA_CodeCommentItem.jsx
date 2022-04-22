import { Divider, Avatar, Grid, Paper, Box } from '@mui/material';

export default function ALTA_CodeCommentItem() {
  return (
    <Box>
      <Paper style={{ padding: '40px 20px' }}>
        <Grid container wrap="nowrap" spacing={2}></Grid>
        <Grid item>
          <Avatar src="profile_default.png" />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>yjydev</h4>
          <p style={{ textAlign: 'left' }}>댓글 내용이 어쩌구저쩌구</p>
          <p style={{ textAlign: 'left', color: 'gray' }}>
            posted 1 minute ago
          </p>
        </Grid>
      </Paper>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </Box>
  );
}
