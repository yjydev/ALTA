import { Divider, Avatar, Grid, Paper, Box } from '@mui/material';

export default function ALTA_CodeCommentItem() {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Grid container wrap="nowrap" direction="column">
            <Grid item pt={2}>
              <Avatar src="profile_default.png" />
            </Grid>
            <Grid justifyContent="left" item>
              <h4>yjydev</h4>
              <p>댓글 내용이 어쩌구저쩌구</p>
              <p style={{ color: 'gray' }}>posted 1 minute ago</p>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </Box>
  );
}
