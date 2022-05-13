import { useState } from 'react';
import { Box } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MemberStore } from '../../context/MemberContext';
import { generateError } from '../../modules/generateAlert';

import ALTA_MemberList from './ALTA_MemberList';
import ALTA_MemberInvite from './ALTA_MemberInvite';
import ALTA_Loading from '../common/ALTA_Loading';

export default function ALTA_MemberContents() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [loading, setLoading] = useState(true);
  const { getMembers } = useContext(MemberStore);

  useEffect(() => {
    (async function () {
      const status = await getMembers(Number(studyId));
      if (status.status === -1) navigate('/');
      else if (status.status === -2)
        generateError('멤버 정보를 불러오는데 실패하였습니다', '');
      else setLoading(false);
    })();
  }, []);
  return (
    <>
      {loading && <ALTA_Loading />}
      {!loading && (
        <Box>
          <ALTA_MemberList studyId={Number(studyId)} />
          <ALTA_MemberInvite studyId={Number(studyId)} />
        </Box>
      )}
    </>
  );
}
