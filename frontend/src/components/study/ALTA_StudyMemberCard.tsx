import { Box, Card, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { Member } from '../../types/StudyType';

export default function ALTA_StudyMemberCard({ member }: Props) {
  return (
    <Card
      variant="outlined"
      sx={[card, { opacity: `${member.email === '' ? '.5' : ''}` }]}
    >
      <Box sx={profile}></Box>
      <Typography sx={nickname}>
        <span>{member.nickname}</span>
        {member.position === '그룹장' ? (
          <StarIcon
            sx={{ fontSize: 'medium', margin: '5px', color: 'secondary.main' }}
          />
        ) : null}
      </Typography>
    </Card>
  );
}

type Props = {
  member: Member;
};

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
  display: 'flex',
  alignItems: 'center',
  flex: '1 1 auto',
  marginLeft: '20px',
};
