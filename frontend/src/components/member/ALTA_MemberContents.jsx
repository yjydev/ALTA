import { Grid, Box, Typography, Button } from '@mui/material';

import ALTA_MemberTable from './ALTA_MemberTable';
import ALTA_MemberInvite from './ALTA_MemberInvite';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberContents() {
  const study_code = 'esfsad';
  return (
    <Box pt={3}>
      <Grid container direction="row" sx={wrapper}>
        <Grid item sm={12}>
          <ALTA_ContentsTitle> 멤버 관리 </ALTA_ContentsTitle>
          <ALTA_MemberTable />
          {study_code ? (
            <Grid container>
              <Typography mt={3} fontSize="19px" sx={studyCode_wrapper}>
                스터디 고유 코드 :
                <Typography sx={studyCodeStyle} ml={2} mr={3}>
                  {study_code}
                </Typography>
                <Button variant="contained">코드 갱신</Button>
              </Typography>
            </Grid>
          ) : (
            <p></p>
          )}
        </Grid>
        <Grid item sm={12}>
          <ALTA_ContentsTitle> 멤버 초대 </ALTA_ContentsTitle>
          <ALTA_MemberInvite />
        </Grid>
      </Grid>
    </Box>
  );
}

const wrapper = {
  height: '90vh',
  display: 'flex',
};

const studyCodeStyle = {
  display: 'inline-block',
  fontWeight: 'bold',
  fontSize: '19px',
};

const studyCode_wrapper = {
  display: 'flex',
  alignItems: 'center',
};
