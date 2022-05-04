import { Box, Button } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

import ALTA_AlertSetting from './ALTA_AlertSetting';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_UserDataEdit from './ALTA_UserDataEdit';
import ALTA_UserDataDisplay from './ALTA_UserDataDisplay';

export default function ALTA_UserData() {
  const [alertFold, setAlertFold] = useState<boolean>(true);
  const [isEditPage, setIsEditPage] = useState<boolean>(false);

  const openEditPage = () => {
    setAlertFold(true);
    setIsEditPage(!isEditPage);
  };

  const submitUserData = () => {
    setIsEditPage(false);
  };

  return (
    <Box sx={wrapper}>
      <ALTA_ContentsTitle>내 정보</ALTA_ContentsTitle>
      <Box sx={[userDataStyle, alertFold ? null : unfold]}>
        {isEditPage ? null : (
          <EditIcon sx={[editButtonStyle, inTop]} onClick={openEditPage} />
        )}
        <Box sx={userDataTopStyle}>
          <Box sx={profileImgStyle}></Box>
          <Box sx={profileDataStyle}>
            {isEditPage ? <ALTA_UserDataEdit /> : <ALTA_UserDataDisplay />}
          </Box>
        </Box>
        <Box>
          <ALTA_AlertSetting />
        </Box>
        {isEditPage ? (
          <Box sx={[editButtonStyle, inBottom]}>
            <Button onClick={submitUserData}>수정 완료</Button>
            <Button onClick={submitUserData} color="error">
              수정 취소
            </Button>
          </Box>
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
  marginBottom: '100px',
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
  marginBottom: '120px',
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
};

const inTop = {
  top: '10px',
  right: '10px',
};
const inBottom = {
  bottom: '10px',
  right: '10px',
};
