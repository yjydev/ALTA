import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { MemberStore } from '../../context/MemberContext';

import ALTA_MemberTable from './ALTA_MemberTable';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberList({ studyId }: { studyId: number }) {
  const { members, studyCode } = useContext(MemberStore);
  const navigate = useNavigate();

  return (
    <Box pt={4} pb={2}>
      <Button
        startIcon={<ChevronLeftIcon />}
        variant="contained"
        sx={backBtn}
        onClick={() => navigate('/study/detail', { state: { studyId } })}
      >
        Back
      </Button>
      <Grid container direction="row" sx={wrapper}>
        <Grid item sm={12}>
          <ALTA_ContentsTitle> 멤버 관리 </ALTA_ContentsTitle>
          <ALTA_MemberTable members={members} />
          <Grid container pl={1}>
            <Typography mt={3} fontSize="17px" sx={studyCode_wrapper}>
              스터디 고유 코드 :
              <Typography sx={studyCodeStyle} ml={2} mr={3}>
                {studyCode}
              </Typography>
              {/* <Button variant="contained" sx={refreshBtn}>
                코드 갱신
              </Button> */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const wrapper = {
  display: 'flex',
};

const backBtn = {
  fontSize: '15px',
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
