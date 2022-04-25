import { Divider, Grid, Typography, Box, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import ALTA_CodeCommentItem from './ALTA_CodeCommentItem';

export default function ALTA_CodeCommentList() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Box>
          <Typography fontSize={40}>Comments</Typography>
        </Box>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
      <Grid item>
        <Box sx={addCommentStyle}>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={2}
            placeholder="댓글을 입력해주세요."
            sx={addComment}
          />
          <IconButton>
            <AddCircleIcon style={addButton} />
          </IconButton>
        </Box>
      </Grid>
      <Grid item>
        <ALTA_CodeCommentItem />
      </Grid>
    </Grid>
  );
}

const addCommentStyle = {
  height: '7rem',
};

const addComment = {
  width: '85%',
};

const addButton = {
  fontSize: '50',
};
