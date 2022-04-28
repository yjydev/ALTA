import { useState } from 'react';

import { TextField, Typography, InputLabel, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  //   'border': `1px solid`,
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  'border': `1px solid`,
  'backgroundColor':
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  'flexDirection': 'row', // 아이콘 위치, 왼쪽이면 row-reverse
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginRight: '10px',
    justifyContent: 'left',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '16px',
}));

export default function ALTA_inviteAccordions() {
  const [isToggle, handleisToggle] = useState(false);

  return (
    <div>
      <Accordion
        expanded={isToggle}
        onChange={() => handleisToggle(!isToggle)}
        sx={accordionStyle}
      >
        <AccordionSummary>
          <Typography sx={{ fontWeight: 'bold' }}>초대 코드 입력</Typography>
        </AccordionSummary>
        <AccordionDetails align="left">
          <Grid container>
            <Grid item mb={1} pl={1}>
              <InputLabel htmlFor="invite-code-input" sx={accordionLabel}>
                초대 코드
              </InputLabel>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={1}
              columns={15}
            >
              <Grid item xs={11}>
                <TextField
                  id="invite-code-input"
                  variant="outlined"
                  placeholder="초대코드를 입력해주세요"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined">입력</Button>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const accordionStyle = {
  width: '17rem',
};

const accordionLabel = {
  fontWeight: 'bold',
  color: '#000000',
};
