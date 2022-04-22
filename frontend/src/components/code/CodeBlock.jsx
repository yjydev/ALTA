import { Box, Typography, Grid } from '@mui/material';

export default function ALTACodeBlock() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item sx={titleStyle}>
        <Box p={3}>
          <Typography sx={problemStyle}>2021.04.13 회문</Typography>
          <Typography sx={codeTitleStyle} my={2}>
            Chart.vue
          </Typography>
          <Typography sx={codeWritterStyle}>작성자</Typography>
        </Box>
      </Grid>
      <Grid item sx={codeBlockStyle}>
        <Box>code block</Box>
      </Grid>
    </Grid>
  );
}

const titleStyle = {
  display: 'flex',
  minWidth: '480px',
};

const problemStyle = {
  fontSize: '30px',
};

const codeTitleStyle = {
  fontSize: '50px',
  display: 'inline-block',
  width: '25rem',
};

const codeWritterStyle = {
  display: 'inline-block',
  fontSize: '25px',
};

const codeBlockStyle = {
  height: '90%',
  border: '1px solid', // 확인용
};
