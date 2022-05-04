import { useState } from 'react';

import {
  Avatar,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Link,
} from '@mui/material';

export default function ALTA_CodeCommentCard({ review }) {
  const [isResolved, setisResolved] = useState(review['completed']);
  // const { setCodeLine } = useContext(CodeBlockContext);

  const changeResolved = () => {
    setisResolved(!isResolved);
    // 백엔드로 요청보내서 completed 갱신
    review['completed'] = isResolved;
  };

  const moveToLine = () => {
    // setCodeLine(review['code_number']);
    // 추후 해당 라인 스크롤링 이벤트 구현 예정
  };

  return (
    <Box>
      <Paper style={{ margin: '30px 0' }}>
        <Grid container direction="row" px={2} py={1} columns={16}>
          <Grid item pt={2} md={1} sx={profileStyle}>
            <Avatar src="profile_default.png" />
          </Grid>
          <Grid item md={15}>
            <Grid sx={infoStyle}>
              <h4>{review['reviewer_name']}</h4>
              <p style={{ color: 'gray' }}>{review['comment_date']}</p>
            </Grid>
            <Grid sx={infoStyle}>
              <Grid container sx={commentStyle}>
                <Link
                  onClick={moveToLine}
                  sx={commentCodeLine}
                  underline="none"
                  mr={1}
                >
                  {review['code_number']}번
                </Link>
                <Typography mb={2}>{review['comment']}</Typography>
              </Grid>
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
    </Box>
  );
}

const infoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
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

const commentCodeLine = {
  color: 'primary.main',
  cursor: 'pointer',
};

const commentStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
};
