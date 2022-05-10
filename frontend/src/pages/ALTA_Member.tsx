import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { checkLogin } from '../modules/LoginTokenChecker';
import MemberContext from '../context/MemberContext';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_MemberContents from '../components/member/ALTA_MemberContents';

export default function ALTA_Member() {
  const { studyId } = useParams<{
    studyId: string | undefined;
  }>();
  const Header = () => <ALTA_Header></ALTA_Header>;
  const Contents = () => (
    <MemberContext>
      <ALTA_Inner>
        <Box sx={{ position: 'relative' }}>
          <ALTA_MemberContents studyId={studyId} />
        </Box>
      </ALTA_Inner>
    </MemberContext>
  );

  useEffect(() => {
    document.title = 'ALTA | 멤버 관리';
  }, []);

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
