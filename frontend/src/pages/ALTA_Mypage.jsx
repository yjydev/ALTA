import { Box } from '@mui/material';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_UserData from '../components/mypage/ALTA_UserData';
import ALTA_StudyList from '../components/mypage/ALTA_StudyList';

export default function ALTA_Mypage() {
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

//template에 prop로 넘겨줄 컴포넌트
function Header() {
  return <ALTA_Header />;
}

function Contents() {
  return (
    <ALTA_Inner>
      <Box sx={{ position: 'relative' }}>
        <ALTA_UserData />
        <ALTA_StudyList />
      </Box>
    </ALTA_Inner>
  );
}
