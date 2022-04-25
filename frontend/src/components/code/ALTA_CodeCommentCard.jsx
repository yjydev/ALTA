import { useState } from 'react';

import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
} from '@mui/material';

export default function ALTA_CodeCommentCard({ review }) {
  const [isResolved, setisResolved] = useState(review['completed']);

  const changeResolved = () => {
    setisResolved(!isResolved);
    // 백엔드로 요청보내서 completed 갱신
    review['completed'] = isResolved;
  };

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
            <Grid sx={infoStyle}>
              <Typography mb={2}>{review['comment']} </Typography>
              {isResolved ? (
                <Button onClick={changeResolved}>
                  <Typography sx={resolvedStyle}>해결됨</Typography>
                </Button>
              ) : (
                <Button onClick={changeResolved}>
                  <Typography sx={unresolvedStyle}> 미해결 </Typography>
                </Button>
              )}
            </Grid>
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
  minWidth: '2.5rem',
};

const resolvedStyle = {
  color: '#C6C6C6',
};

const unresolvedStyle = {
  color: 'primary.main',
};
