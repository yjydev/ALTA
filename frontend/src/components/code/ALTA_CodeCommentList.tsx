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

import { Review } from '../../types/CodeBlockType';

import ALTA_CodeCommentCard from './ALTA_CodeCommentCard';

export default function ALTA_CodeCommentList({ reviews_data }: Props) {
  const [isCompleted, setisCompleted] = useState(false);

  const reviews = isCompleted
    ? reviews_data.filter((review) => review['completed'] === false)
    : reviews_data;

  // console.log(reviews_data);

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
          <Grid container sx={comment_wrapper} columns={17}>
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

const comment_wrapper = {
  justifyContent: 'center',
  alignItems: 'center',
};

type Props = {
  reviews_data: Review[];
};
