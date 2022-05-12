import { Box, Button } from '@mui/material';
import { useContext, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styled from '@emotion/styled';

import defaultProfile from '../../images/user.png';
import { mainColor } from '../../modules/colorChart';
import { UserDataStore } from '../../context/UserDataContext';

import ALTA_AlertSetting from './ALTA_AlertSetting';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_UserDataEdit from './ALTA_UserDataEdit';
import ALTA_UserDataDisplay from './ALTA_UserDataDisplay';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

export default function ALTA_UserData() {
  const { userData } = useContext(UserDataStore);

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
          <Box sx={profileImgStyle}>
            <img
              src={userData.profileUrl || defaultProfile}
              alt="기본 프로필 이미지"
            />
          </Box>
          <ALTA_Tooltip title="프로필 사진 변경">
            <PhotoButton>
              <CameraAltIcon />
            </PhotoButton>
          </ALTA_Tooltip>
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
  height: '580px',
};

const profileImgStyle = {
  'width': '200px',
  'height': '200px',
  'overflow': 'hidden',
  'borderRadius': '100px',
  'backgroundColor': 'black',
  '& > img': {
    width: '100%',
  },
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

const PhotoButton = styled.button`
  all: unset;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  top: 150px;
  left: 5px;
  border-radius: 50px;
  cursor: pointer;
  background-color: ${mainColor};
  &:active {
    transform: scale(0.9);
  }
`;
