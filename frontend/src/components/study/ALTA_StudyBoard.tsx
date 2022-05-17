import { Fragment, useContext, useState } from 'react';
import { Box, Drawer, Button, Typography } from '@mui/material';
import MoreIcon from '@mui/icons-material/More';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { blackColor } from '../../modules/colorChart';
import { StudyDetailStore } from '../../context/StudyDetailContext';

import ALTA_Notice from './ALTA_Notice';
import ALTA_Chat from './ALTA_Chat';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

export default function ALTA_StudyBoard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { studyName } = useContext(StudyDetailStore);

  const socketJS = new SockJS(`${process.env.REACT_APP_BASE_URL}:8000/chat`);
  const stompClient: Stomp.Client = Stomp.over(socketJS);

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Fragment key={'drawer'}>
        <Drawer
          anchor={'top'}
          open={isDrawerOpen}
          onClose={toggleDrawer()}
          PaperProps={{
            sx: { minWidth: '900px', maxWidth: '900px', margin: '100px auto 0' },
          }}
        >
          <Box sx={wrapper}>
            <ALTA_Notice />
            <ALTA_Chat stompClient={stompClient} />
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
    </div>
  );
}

const wrapper = {
  display: 'flex',
  // flexDirection: 'column',
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
