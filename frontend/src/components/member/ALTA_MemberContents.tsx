import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { getRequest } from '../../api/request';
import { MemberStore } from '../../context/MemberContext';

import ALTA_MemberList from './ALTA_MemberList';
import ALTA_MemberInvite from './ALTA_MemberInvite';

export default function ALTA_MemberContents({
  studyId,
}: {
  studyId: string | undefined;
}) {
  const { setMembers, setStudyCode } = useContext(MemberStore);

  const getMembers = async () => {
    try {
      const res = await getRequest(`/api/study/${studyId}/members`);
      setMembers(res.members);
      setStudyCode(res.studyCode);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);
  return (
    <Box sx={{ position: 'relative' }}>
      <ALTA_MemberList />
      <ALTA_MemberInvite studyId={studyId} />
    </Box>
  );
}
