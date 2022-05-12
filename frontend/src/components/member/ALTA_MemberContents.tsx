import { Box } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MemberStore } from '../../context/MemberContext';

import ALTA_MemberList from './ALTA_MemberList';
import ALTA_MemberInvite from './ALTA_MemberInvite';
import { generateError } from '../../modules/generateAlert';

export default function ALTA_MemberContents({ studyId }: { studyId: number }) {
  const navigate = useNavigate();
  const { getMembers } = useContext(MemberStore);
  useEffect(() => {
    (async function () {
      const status = await getMembers(studyId);
      // -1이면 토큰 에러,
      // -2 이면 get 요청 실패
      // 1이면 성공
      if (status === -1) navigate('/');
      else if (status === -2)
        generateError('멤버 정보를 불러오는데 실패하였습니다', '');
    })();
  }, []);
  return (
    <Box>
      <ALTA_MemberList studyId={studyId} />
      <ALTA_MemberInvite studyId={studyId} />
    </Box>
  );
}
