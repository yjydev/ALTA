import { Box, Card, Typography } from '@mui/material';

export default function ALTA_StudyMemberCard() {
  return (
    <Card variant="outlined" sx={card}>
      <Box sx={profile}></Box>
      <Box sx={nickname}>
        <Typography>닉네임</Typography>
      </Box>
    </Card>
  );
}

const card = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  padding: '5px',
  backgroundColor: 'primary.main',
};

const profile = {
  width: '40px',
  height: '40px',
  borderRadius: '50px',
  backgroundColor: 'black',
};

const nickname = {
  flex: '1 1 auto',
  marginLeft: '20px',
};
