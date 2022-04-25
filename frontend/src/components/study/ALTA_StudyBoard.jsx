import ALTA_StudyNotice from './ALTA_StudyNotice';
import ALTA_StudyChat from './ALTA_StudyChat';
import { Box } from '@mui/material';

export default function ALTA_StudyBoard() {
  return (
    <Box sx={wrapper}>
      <ALTA_StudyNotice />
      <ALTA_StudyChat />
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
};
