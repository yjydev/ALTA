import { Grid, Typography } from '@mui/material';

import { Study } from '../../types/UserDataType';

export default function ALTA_StudyCard({ study }: Props) {
  return (
    <Grid container sx={studyCardStyle}>
      <Grid item xs={9}>
        <Typography sx={[studyNameStyle, elipsisStyle]}>
          {study.name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ lineHeight: '50px' }}>
          인원수 {study.joined}/{study.maxPeople}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={elipsisStyle}>{study.introduction}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{study.language}</Typography>
      </Grid>
    </Grid>
  );
}

type Props = {
  study: Study;
};

const elipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const studyNameStyle = {
  fontSize: '25px',
  lineHeight: '50px',
};

const studyIntroStyle = {
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
