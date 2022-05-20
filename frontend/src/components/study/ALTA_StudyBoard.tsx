import { Fragment, useContext, useState } from 'react';
import { Box, Drawer, Button, Typography, Grid } from '@mui/material';
import MoreIcon from '@mui/icons-material/More';

import { blackColor, whiteColor } from '../../modules/colorChart';
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
            <Box sx={left}>
              <ALTA_Notice />
              <ALTA_StudyMembers />
            </Box>
            <Box sx={right}>
              <ALTA_Chat />
            </Box>
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
  width: '100%',
  display: 'flex',
  boxSizing: 'border-box',
  justifyContent: 'center',
};

const left = {
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  boxSizing: 'border-box',
};
const right = {
  display: 'flex',
  width: '50%',
  boxSizing: 'border-box',
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
