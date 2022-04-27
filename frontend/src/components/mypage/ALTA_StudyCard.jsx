import { Grid, Typography } from '@mui/material';

export default function ALTA_StudyCard() {
  return (
    <Grid container sx={studyCardStyle}>
      <Grid item xs={9}>
        <Typography
          sx={{
            fontSize: '25px',
            lineHeight: '50px',
          }}
        >
          Algorithm Study
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ lineHeight: '50px' }}>인원수 3/6</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>테스트용 스터디 그룹</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>Java</Typography>
      </Grid>
    </Grid>
  );
}

const studyCardStyle = {
  width: '100%',
  height: '100px',
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: 'secondary.main',
};
