import { Box } from '@mui/material';

import ALTA_UserData from './ALTA_UserData';
import ALTA_StudyList from './ALTA_StudyList';

export default function ALTA_MypageContents() {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ALTA_UserData />
        <ALTA_StudyList />
      </Box>
    </>
  );
}
