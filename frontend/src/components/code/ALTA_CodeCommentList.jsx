import { useState } from 'react';

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

import ALTA_CodeCommentCard from './ALTA_CodeCommentCard';

export default function ALTA_CodeCommentList() {
  // 테스트용 데이터
  const reviews_data = [
    {
      review_id: '1',
      reviewer: 'jyj',
      comment: '댓글 내용',
      comment_date: '2022/04/18',
      code_number: '4',
      completed: true,
    },
    {
      review_id: '2',
      reviewer: 'jyj2',
      comment: '댓글 내용2',
      comment_date: '2022/04/26',
      code_number: '6',
      completed: false,
    },
  ];

  const [isCompleted, setisCompleted] = useState(false);

  var reviews = isCompleted
    ? reviews_data.filter((review) => review['completed'] === false)
    : reviews_data;

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
              UnResolved View
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
      <Grid item>
        <Box sx={addCommentStyle}>
          <Grid container justify="center" align="center" columns={17}>
            <Grid item xs={16}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={2}
                placeholder="댓글을 입력해주세요."
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton>
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
