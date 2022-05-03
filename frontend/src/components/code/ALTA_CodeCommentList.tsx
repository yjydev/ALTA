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
  codeId: string;
}) {
  const [isCompleted, setisCompleted] = useState<boolean>(false);

  const { codeLine } = useContext(CodeReviewStore);

  const reviews = isCompleted
    ? reviews_data
    : reviews_data.filter((review) => review['completed'] === false);

  // console.log(reviews_data);
  const [newReview, setNewReview] = useState<PostReview>({
    code_id: parseInt(codeId),
    content: '',
    line: codeLine,
  });

  const handleRequest = (e: string, key: string) => {
    const newRequest: PostReview = { ...newReview };
    // newReview[key] = String(e);
    // console.log(newReview);
  };

  const handleNewReview = async () => {
    const startIdx: number = newReview.content.lastIndexOf(`${codeLine}`) + 5;
    const review: string = newReview.content.substring(startIdx);
    // try {
    //   await postRequest('/api/code/review', JSON.stringify);
    // } catch (err) {
    //   console.log(err);
    // }
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
                defaultValue={codeLine === 0 ? null : `${codeLine}번 줄 `}
                fullWidth
                required
                onChange={(e) => handleRequest(e.target.value, 'content')}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleNewReview}>
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
