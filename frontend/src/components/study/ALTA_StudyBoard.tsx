import { Fragment, useContext, useState } from 'react';
import { Box, Drawer, Button, Typography, Grid } from '@mui/material';
import MoreIcon from '@mui/icons-material/More';

import { blackColor } from '../../modules/colorChart';
import { StudyDetailStore } from '../../context/StudyDetailContext';

import ALTA_Notice from './ALTA_Notice';
import ALTA_Chat from './ALTA_Chat';
import ALTA_Tooltip from '../common/ALTA_Tooltip';
import ALTA_StudyMembers from './ALTA_StudyMembers';

export default function ALTA_StudyBoard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { studyName } = useContext(StudyDetailStore);
  const toggleDrawer = () => () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Box>
      <Fragment key={'drawer'}>
        <Drawer
          anchor={'top'}
          open={isDrawerOpen}
          onClose={toggleDrawer()}
          PaperProps={{
            sx: { minWidth: '900px', maxWidth: '900px', margin: '30px auto 0' },
          }}
        >
          <Box sx={wrapper}>
            <Grid container sx={topBoxStyle}>
              <Grid item xs={6}>
                <ALTA_StudyMembers />
              </Grid>
              <Grid item xs={6}>
                <ALTA_Chat />
              </Grid>
            </Grid>
          </Box>
          <Box sx={bottomBoxStyle}>
            <ALTA_Notice />
          </Box>
        </Drawer>
      </Fragment>
      <Box>
        <Typography sx={studyNameStyle}>
          {studyName}
          <ALTA_Tooltip title="스터디 정보">
            <Button sx={menuBtnStyle} onClick={toggleDrawer()}>
              <MoreIcon />
            </Button>
          </ALTA_Tooltip>
        </Typography>
      </Box>
    </Box>
  );
}

const wrapper = {
  width: '90%',
  display: 'flex',
  boxSizing: 'border-box',
  justifyContent: 'center',
};

const topBoxStyle = {
  display: 'flex',
  boxSizing: 'border-box',
};

const bottomBoxStyle = {
  marginTop: '2rem',
  width: '90%',
  display: 'flex',
  justifyContent: 'center',
};

const studyNameStyle = {
  position: 'relative',
  fontSize: '25px',
  fontWeight: 'bold',
  textAlign: 'center',
};

const menuBtnStyle = {
  width: '0',
  position: 'absolute',
  minWidth: '32px',
  padding: '4px',
  top: 3,
  right: 0,
  color: blackColor,
};
