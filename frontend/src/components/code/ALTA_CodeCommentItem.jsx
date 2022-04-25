import { Divider, Avatar, Grid, Paper, Box, Typography } from '@mui/material';

export default function ALTA_CodeCommentItem() {
  return (
    <Box>
      <Paper>
        <Grid container direction="row" p={2} columns={16}>
          <Grid item pt={2} xs={1}>
            <Avatar src="profile_default.png" />
          </Grid>
          <Grid item xs={15}>
            <Grid sx={infoStyle}>
              <h4>yjydev</h4>
              <p style={{ color: 'gray' }}>posted 1 minute ago</p>
            </Grid>
            <Typography mb={2}> 댓글 내용 그렇습니다 </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </Box>
  );
}

const infoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};
