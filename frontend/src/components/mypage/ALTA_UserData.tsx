import { Box, Button } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

import ALTA_AlertSetting from './ALTA_AlertSetting';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_UserDataEdit from './ALTA_UserDataEdit';
import ALTA_UserDataDisplay from './ALTA_UserDataDisplay';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

export default function ALTA_UserData() {
  const [alertFold, setAlertFold] = useState<boolean>(true);
  const [isEditPage, setIsEditPage] = useState<boolean>(false);

  const openEditPage = () => {
    setAlertFold(true);
    setIsEditPage(!isEditPage);
  };

  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>내 정보</ALTA_ContentsTitle>
      <Box sx={[userDataStyle, alertFold ? null : unfold]}>
        {isEditPage ? null : (
          <ALTA_Tooltip title="내 정보 수정">
            <EditIcon sx={[editButtonStyle, inTop]} onClick={openEditPage} />
          </ALTA_Tooltip>
        )}
        <Box sx={userDataTopStyle}>
          <Box sx={profileImgStyle}></Box>
          <Box sx={profileDataStyle}>
            {isEditPage ? (
              <ALTA_UserDataEdit setIsEditPage={setIsEditPage} />
            ) : (
              <ALTA_UserDataDisplay />
            )}
          </Box>
        </Box>
        <Box>
          <ALTA_AlertSetting />
        </Box>
        {isEditPage ? (
          <></>
        ) : (
          <Button
            sx={[editButtonStyle, inBottom]}
            onClick={() => setAlertFold(!alertFold)}
          >
            {alertFold ? '알림 설정' : '설정 완료'}
          </Button>
        )}
      </Box>
    </Box>
  );
}

const wrapper = {
  position: 'absolute',
  minWidth: '100%',
  top: '20px',
  zIndex: 100,
};

const userDataStyle = {
  position: 'relative',
  height: '300px',
  marginBottom: '30px',
  padding: '40px 20px',
  borderRadius: '10px',
  transition: 'height .3s',
  backgroundColor: '#fff',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const userDataTopStyle = {
  display: 'flex',
  position: 'relative',
};

const unfold = {
  height: '650px',
};

const profileImgStyle = {
  width: '200px',
  height: '200px',
  borderRadius: '100px',
  backgroundColor: 'black',
};

const profileDataStyle = {
  flex: '1 1 auto',
  marginLeft: '50px',
};
const editButtonStyle = {
  position: 'absolute',
  cursor: 'pointer',
};

const inTop = {
  top: '10px',
  right: '10px',
};
const inBottom = {
  bottom: '10px',
  right: '10px',
};
