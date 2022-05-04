import { useState, useContext } from 'react';
import {
  Divider,
  Grid,
  Typography,
  Box,
  TextField,
  Switch,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { postRequest } from '../../api/request';
import { CodeReviewStore } from '../../context/CodeReviewContext';
import { Review, PostReview } from '../../types/CodeBlockType';

import ALTA_CodeCommentCard from './ALTA_CodeCommentCard';

export default function ALTA_CodeCommentList({
  reviews_data,
  codeId,
}: {
  reviews_data: Review[];
  codeId: string | undefined;
}) {
  const [isCompleted, setisCompleted] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { codeLine } = useContext(CodeReviewStore);

  const reviews = isCompleted
    ? reviews_data
    : reviews_data.filter((review) => review['completed'] === false);

  // console.log(reviews_data);
  const [newReview, setNewReview] = useState<string>('');

  const handleNewReview = async () => {
    const startIdx: number = newReview.lastIndexOf(`${codeLine}`) + 5;
    const review: string = newReview.substring(startIdx);
    if (typeof codeId !== 'undefined') {
      const codeIdx = parseInt(codeId);
      const newRequest: PostReview = {
        code_id: codeIdx,
        content: review,
        line: codeLine,
      };

      try {
        await postRequest('/api/code/review', JSON.stringify(newRequest));
        setNewReview('');
        console.log(newRequest);
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
                id="outlined-multiline-static"
                multiline
                rows={2}
                placeholder="댓글을 입력해주세요."
                fullWidth
                required
                defaultValue={
                  codeLine === 0 ? null : `${codeLine}번 줄 ${newReview}`
                }
                onChange={(e) => {
                  setNewReview(e.target.value);
                  console.log(e.target.value);
                  if (newReview !== '') {
                    setIsDisabled(false);
                  }
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
        {reviews.map((review) => (
          <ALTA_CodeCommentCard key={review['review_id']} review={review} />
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
