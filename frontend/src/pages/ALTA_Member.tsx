import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { checkLogin } from '../modules/LoginTokenChecker';
import MemberContext from '../context/MemberContext';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_MemberList from '../components/member/ALTA_MemberList';
import ALTA_MemberInvite from '../components/member/ALTA_MemberInvite';

export default function ALTA_Member() {
  const { studyId } = useParams<{
    studyId: string | undefined;
  }>();
  const Header = () => <ALTA_Header></ALTA_Header>;
  const Contents = () => (
    <MemberContext>
      <ALTA_Inner>
        <Box sx={{ position: 'relative' }}>
          <ALTA_MemberList studyId={studyId} />
          <ALTA_MemberInvite />
        </Box>
      </ALTA_Inner>
    </MemberContext>
  );

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin(() => navigate('/'));
  }, []);

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
