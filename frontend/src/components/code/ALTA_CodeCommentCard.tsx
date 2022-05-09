import { useState, useContext } from 'react';

import {
  Avatar,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Link,
} from '@mui/material';
// import { scroller, Events } from 'react-scroll';

import { putRequest } from '../../api/request';
import { ReviewData } from '../../types/CodeBlockType';
import { CodeReviewStore } from '../../context/CodeReviewContext';

export default function ALTA_CodeCommentCard({
  review,
}: {
  review: ReviewData;
}) {
  const [isResolved, setisResolved] = useState<boolean | undefined>(
    review.completed,
  );

  const { setCodeLine } = useContext(CodeReviewStore);

  const changeResolved = async () => {
    setisResolved(!isResolved);
    // 백엔드로 요청보내서 completed 갱신
    await putRequest(`/api/code/review/${review.review_id}/solved`, {
      is_solved: !review.completed,
    });
  };

  const moveToLine = () => {
    setCodeLine(review['code_number']);
    const lineSpan = document.getElementById(
      `codeLine-${review['code_number']}`,
    );
    if (lineSpan !== null) {
      lineSpan.scrollIntoView({ behavior: 'smooth' });
    }
    // scroller.scrollTo(`codeLine-${review['code_number']}`, {
    //   duration: 800,
    //   delay: 0,
    //   smooth: 'easeInOutQuart',
    // });
    // 추후 해당 라인 스크롤링 이벤트 구현 예정
    // const goToContainer = new Promise((resolve, reject) => {
    //   Events.scrollEvent.register('end', () => {
    //     resolve;
    //     Events.scrollEvent.remove('end');
    //   });
    //   scroller.scrollTo('code-block', {
    //     duration: 800,
    //     delay: 0,
    //     smooth: 'easeInOutQuart',
    //   });
    // });
    // goToContainer.then(() =>
    //   scroller.scrollTo(`codeLine-${review['code_number']}`, {
    //     duration: 800,
    //     delay: 0,
    //     smooth: 'easeInOutQuart',
    //     containerId: 'code-block',
    //   }),
    // );
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
              <p style={{ color: 'gray' }}>{review.comment_date}</p>
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
                {/* <Link
                  to={`codeLine-${review['code_number']}`}
                  spy={true}
                  smooth={true}
                >
                  {review['code_number']}
                </Link> */}
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
