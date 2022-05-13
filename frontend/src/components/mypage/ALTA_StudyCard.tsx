import { Grid, Typography } from '@mui/material';

import { Study } from '../../types/UserDataType';

type Props = {
  study: Study;
};

export default function ALTA_StudyCard({ study }: Props) {
  return (
    <Grid container sx={studyCardStyle}>
      <Grid item xs={9}>
        <Typography sx={studyNameStyle}>{study.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ lineHeight: '50px' }}>
          인원수 {study.joined}/{study.maxPeople}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={studyIntroStyle}>{study.introduction}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{study.language}</Typography>
      </Grid>
    </Grid>
  );
}

const studyNameStyle = {
  marginRight: '5px',
  fontSize: '20px',
  lineHeight: '50px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const studyIntroStyle = {
  marginRight: '20px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const studyCardStyle = {
  width: '100%',
  height: '100px',
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: 'secondary.main',
  cursor: 'pointer',
};
