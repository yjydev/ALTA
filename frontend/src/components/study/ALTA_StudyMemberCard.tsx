import { Box, Card, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { StudyMember } from '../../types';

type Props = { member: StudyMember };

export default function ALTA_StudyMemberCard({ member }: Props) {
  return (
    <Card
      className="memberCard"
      variant="outlined"
      sx={[memberCardStyle, member.email === '' && memberCardStyle_Empth]}
    >
      <Box className="profileImg" sx={profileStyle}></Box>
      <Typography className="nickname" sx={nicknameStyle}>
        <span>{member.nickname}</span>
        {member.position === '그룹장' ? <StarIcon sx={LeaderIconStyle} /> : null}
      </Typography>
    </Card>
  );
}

const memberCardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  padding: '5px',
  backgroundColor: 'primary.main',
};

const memberCardStyle_Empth = {
  opacity: '.5',
};

const profileStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50px',
  backgroundColor: 'black',
};

const nicknameStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: '1 1 auto',
  marginLeft: '20px',
};

const LeaderIconStyle = { fontSize: 'medium', margin: '5px', color: 'secondary.main' };
