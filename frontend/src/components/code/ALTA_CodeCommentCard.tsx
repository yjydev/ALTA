import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Link,
} from '@mui/material';

import { toggleSolved } from '../../api/apis';
import { ReviewData } from '../../types/CodeBlockType';
import { CodeStore } from '../../context/CodeContext';
import { checkLogin } from '../../modules/LoginTokenChecker';

export default function ALTA_CodeCommentCard({
  review,
}: {
  review: ReviewData;
}) {
  const navigate = useNavigate();
  const [isResolved, setisResolved] = useState<boolean>(review.completed);
  const { setCodeLine, user } = useContext(CodeStore);

  const userData = localStorage.getItem('UserData');
  const profile = userData
    ? JSON.parse(userData)['profileUrl']
    : 'profile_default.png';

  const changeResolved = async () => {
    if (!(await checkLogin()).status) navigate('/');
    setisResolved(!isResolved);
    await toggleSolved(review.reviewId, !review.completed);
  };

  const moveToLine = () => {
    setCodeLine(review.codeNumber);
    const lineSpan = document.getElementById(`codeLine-${review.codeNumber}`);
    if (lineSpan !== null) {
      lineSpan.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Box>
      <Paper style={{ margin: '30px 0' }}>
        <Grid container direction="row" px={2} py={1} columns={16}>
          <Grid item pt={2} md={1} sx={profileStyle}>
            <Avatar src={profile} />
          </Grid>
          <Grid item md={15}>
            <Grid sx={infoStyle}>
              <h4>{review.reviewerName}</h4>
              <p style={{ color: 'gray' }}>{review.commentDate}</p>
            </Grid>
            <Grid sx={infoStyle}>
              <Grid container sx={commentStyle}>
                <Link
                  onClick={moveToLine}
                  sx={commentCodeLine}
                  underline="none"
                  mr={1}
                >
                  {review['codeNumber']}번
                </Link>
                <Typography mb={2}>{review['comment']}</Typography>
              </Grid>
              {user === review.reviewerName ? (
                <Box>
                  {isResolved ? (
                    <Button onClick={changeResolved}>
                      <Typography sx={resolvedStyle}>해결됨</Typography>
                    </Button>
                  ) : (
                    <Button onClick={changeResolved}>
                      <Typography sx={unresolvedStyle}> 미해결 </Typography>
                    </Button>
                  )}
                </Box>
              ) : null}
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
