import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, NavigateFunction } from 'react-router-dom';

import { Grid, Box, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { MemberStore } from '../../context/MemberContext';
import { generateError } from '../../modules/generateAlert';

import ALTA_Loading from '../common/ALTA_Loading';
import ALTA_MemberInvite from './ALTA_MemberInvite';
import ALTA_MemberTable from './ALTA_MemberTable';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

type ParamType = {
  studyId: string | undefined;
};

export default function ALTA_MemberContents() {
  const navigate: NavigateFunction = useNavigate();

  const { studyId } = useParams<ParamType>();
  const { members, getMembers, isRefresh, setIsRefresh, studyCode, maxPeople } = useContext(MemberStore);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect((): void => {
    setIsRefresh(false);
    (async function (): Promise<void> {
      const status = await getMembers(Number(studyId));
      if (status.status === -1) navigate('/');
      else if (status.status === -2) generateError('멤버 정보를 불러오는데 실패하였습니다', '');
      else setLoading(false);
    })();
  }, [isRefresh, studyId]);

  return (
    <>
      {loading && <ALTA_Loading />}
      {!loading && (
        <Box>
          <Box sx={memberListBoxStyle}>
            <Button
              startIcon={<ChevronLeftIcon />}
              variant="contained"
              sx={backBtnStyle}
              onClick={(): void => navigate(`/study/${studyId}/detail`)}
            >
              Back
            </Button>
            <Grid container direction="row" sx={wrapperStyle}>
              <Grid item sm={12}>
                <ALTA_ContentsTitle> 멤버 관리 </ALTA_ContentsTitle>
                <ALTA_MemberTable studyId={Number(studyId)} />
                <Grid container>
                  <Box sx={studyCodeStyle}>
                    스터디 고유 코드 :<Typography sx={studyCodeTextStyle}>{studyCode}</Typography>
                    {/* <Button variant="contained" sx={refreshBtnStyle}>
                코드 갱신
              </Button> */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <ALTA_MemberInvite studyId={Number(studyId)} />
        </Box>
      )}
    </>
  );
}

const memberListBoxStyle = {
  paddingTop: 4,
  paddingBottom: 2,
};

const wrapperStyle = {
  display: 'flex',
};

const backBtnStyle = {
  fontSize: '15px',
};

const studyCodeTextStyle = {
  display: 'inline-block',
  fontWeight: 'bold',
  fontSize: '17px',
  marginLeft: 2,
  marginRight: 3,
};

const studyCodeStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 1,
  marginTop: 3,
  fontSize: '17px',
};

const refreshBtnStyle = {
  'backgroundColor': 'secondary.main',
  'color': '#000000',
  '&:hover': {
    backgroundColor: '#AFA291',
  },
};
