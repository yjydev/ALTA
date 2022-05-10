import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkLogin } from '../modules/LoginTokenChecker';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_MemberList from '../components/member/ALTA_MemberList';
import ALTA_MemberInvite from '../components/member/ALTA_MemberInvite';

export default function ALTA_ToOrganize() {
  const Header = () => <ALTA_Header></ALTA_Header>;
  const Contents = () => (
    <ALTA_Inner>
      <Box sx={{ position: 'relative' }}>
        <ALTA_MemberList />
        <ALTA_MemberInvite />
      </Box>
    </ALTA_Inner>
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'ALTA | 멤버 관리';

    (async function () {
      await checkLogin(() => navigate('/'));
    })();
  }, []);

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
