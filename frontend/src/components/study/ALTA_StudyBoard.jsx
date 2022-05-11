import ALTA_Notice from './ALTA_Notice.tsx';
import ALTA_Chat from './ALTA_Chat';
import { Box } from '@mui/material';

export default function ALTA_StudyBoard() {
  return (
    <Box sx={wrapper}>
      <ALTA_Notice />
      <ALTA_Chat />
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
};
