import ALTA_Notice from './ALTA_Notice';
import ALTA_Chat from './ALTA_Chat';
import { Box } from '@mui/material';

export default function ALTA_StudyBoard({ studyId }: { studyId: number }) {
  return (
    <Box sx={wrapper}>
      <ALTA_Notice studyId={studyId} />
      <ALTA_Chat />
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
};
