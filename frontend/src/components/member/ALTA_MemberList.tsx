import { useContext, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';

import { getRequest } from '../../api/request';
import { MemberStore } from '../../context/MemberContext';

import ALTA_MemberTable from './ALTA_MemberTable';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberList({
  studyId,
}: {
  studyId: string | undefined;
}) {
  const { members, setMembers, studyCode, setStudyCode } =
    useContext(MemberStore);

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
    <Box py={4}>
      <Grid container direction="row" sx={wrapper}>
        <Grid item sm={12}>
          <ALTA_ContentsTitle> 멤버 관리 </ALTA_ContentsTitle>
          <ALTA_MemberTable members={members} studyCode={studyCode} />
          {studyCode ? (
            <Grid container pl={1}>
              <Typography mt={3} fontSize="17px" sx={studyCode_wrapper}>
                스터디 고유 코드 :
                <Typography sx={studyCodeStyle} ml={2} mr={3}>
                  {studyCode}
                </Typography>
                <Button variant="contained" sx={refreshBtn}>
                  코드 갱신
                </Button>
              </Typography>
            </Grid>
          ) : (
            <p></p>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

const wrapper = {
  display: 'flex',
};

const studyCodeStyle = {
  display: 'inline-block',
  fontWeight: 'bold',
  fontSize: '17px',
};

const studyCode_wrapper = {
  display: 'flex',
  alignItems: 'center',
};

const refreshBtn = {
  'backgroundColor': 'secondary.main',
  'color': '#000000',
  '&:hover': {
    backgroundColor: '#AFA291',
  },
};
