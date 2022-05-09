import { useState, useContext, useEffect } from 'react';
import {
  Divider,
  Grid,
  Typography,
  Box,
  TextField,
  Switch,
  InputAdornment,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { postRequest, getRequest } from '../../api/request';
import { CodeReviewStore } from '../../context/CodeReviewContext';
import { ReviewData, PostReview } from '../../types/CodeBlockType';

import ALTA_CodeCommentCard from './ALTA_CodeCommentCard';

export default function ALTA_CodeCommentList({
  codeId,
}: {
  codeId: string | undefined;
}) {
  const [isCompleted, setisCompleted] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { codeLine, reviews, setReviews } = useContext(CodeReviewStore);

  let reviews_data: ReviewData[] = [];

  const getReview = async () => {
    const res = await getRequest(`/api/code/review/${codeId}`);
    console.log(res);
    setReviews(res);
  };

  if (reviews !== null) {
    reviews_data = isCompleted
      ? reviews
      : reviews.filter((rev: ReviewData) => rev.completed === false);
  }
  // console.log(reviews_data);
  const [newReview, setNewReview] = useState<string>('');

  useEffect(() => {
    getReview();
  }, []);

  useEffect(() => {
    getReview();
  }, [isCompleted]);

  useEffect(() => {
    if (newReview !== '' && codeLine !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newReview, codeLine]);

  const handleNewReview = async () => {
    // const startIdx: number = newReview.lastIndexOf(`${codeLine}`) + 5;
    // const review: string = newReview.substring(startIdx);
    if (typeof codeId !== 'undefined') {
      const codeIdx = parseInt(codeId);
      const newRequest: PostReview = {
        codeId: codeIdx,
        content: newReview,
        line: codeLine,
      };

      try {
        await postRequest('/api/code/review', JSON.stringify(newRequest));
        setNewReview('');
        getReview();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('fail');
      // 추후 예외처리 추가 예정
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="baseline">
          <Grid item mr={4}>
            <Typography fontSize={40}>Comments</Typography>
          </Grid>
          <Grid item>
            <Switch
              checked={isCompleted}
              onChange={() => setisCompleted(!isCompleted)}
              name="isCompleted"
            />
            <Typography sx={{ display: 'inline-block' }}>
              전체 댓글 보기
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
      <Grid item>
        <Box sx={addCommentStyle}>
          <Grid container sx={comment_wrapper} columns={17}>
            <Grid item xs={16}>
              <TextField
                id="outlined-multiline-static-comment"
                placeholder="리뷰를 입력해주세요"
                multiline
                rows={2}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={codeSelect}>
                      <Typography sx={adornStyle}>
                        {codeLine === 0
                          ? '코드를 선택해주세요.'
                          : `${codeLine}번 라인`}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                value={newReview}
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleNewReview} disabled={isDisabled}>
                <AddCircleIcon style={addButton} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        {reviews_data.map((review: ReviewData) => (
          <ALTA_CodeCommentCard key={review.reviewId} review={review} />
        ))}
      </Grid>
    </Grid>
  );
}

const addCommentStyle = {
  height: '7rem',
};

const addButton = {
  fontSize: '50',
};

const comment_wrapper = {
  justifyContent: 'center',
  alignItems: 'center',
};

const codeSelect = {
  alignItems: 'flex-end',
  paddingTop: '2px',
};

const adornStyle = {
  color: 'primary.main',
  fontWeight: 'bold',
};
