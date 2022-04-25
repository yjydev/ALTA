import { Divider, Avatar, Grid, Paper, Box, Typography } from '@mui/material';

export default function ALTA_CodeCommentCard({ review }) {
  return (
    <Box>
      <Paper>
        <Grid container direction="row" px={2} py={1} columns={20}>
          <Grid item pt={2} md={1} sx={profileStyle}>
            <Avatar src="profile_default.png" />
          </Grid>
          <Grid item xs={19}>
            <Grid sx={infoStyle}>
              <h4>{review['reviewer']}</h4>
              <p style={{ color: 'gray' }}>{review['comment_date']}</p>
            </Grid>
            <Typography mb={2}>{review['comment']} </Typography>
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

const profileStyle = {
  display: { xs: 'none', md: 'block' },
};
