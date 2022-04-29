import { useState } from 'react';

import { Button, Typography, TextField, Box, Grid } from '@mui/material';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function ALTA_inviteInput() {
  const [isToggle, handleisToggle] = useState(false);

  return (
    <Box sx={wrapper}>
      <Box>
        <Button
          onClick={() => handleisToggle(!isToggle)}
          sx={inputBtn}
          disableElevation
          disableRipple
          endIcon={
            isToggle ? <ArrowBackIosNewIcon /> : <ArrowForwardIosSharpIcon />
          }
        >
          {/* {isToggle ? null : (
            <Typography sx={inputText}>초대코드 입력</Typography>
          )} */}
          <Typography sx={[inputText]}>초대코드</Typography>
        </Button>
      </Box>
      <Box sx={[fieldStyle, isToggle ? { width: '250px' } : { width: '0px' }]}>
        <Box>
          <TextField
            required
            sx={{
              width: '100%',
            }}
            variant="standard"
            placeholder="초대코드를 입력해주세요"
          />
        </Box>
        <Box sx={completeBtn}>
          {isToggle ? <Button variant="outlined">입력</Button> : null}
        </Box>
      </Box>
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  margin: '10px 0',
  minHeight: '50px',
  justifyContent: 'right',
};

const inputText = {
  marginRight: 1,
  fontWeight: 'bold',
};

const inputBtn = {
  color: '#212121',
};

const completeBtn = {
  marginLeft: 2,
};

const fieldStyle = {
  display: 'flex',
  transition: '.4s',
  marginLeft: 2,
};
