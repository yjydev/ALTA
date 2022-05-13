import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useContext, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styled from '@emotion/styled';

import defaultProfile from '../../images/user.png';
import { mainColor } from '../../modules/colorChart';
import { UserDataStore } from '../../context/UserDataContext';
import { generateError } from '../../modules/generateAlert';

import ALTA_AlertSetting from './ALTA_AlertSetting';
import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';
import ALTA_UserDataEdit from './ALTA_UserDataEdit';
import ALTA_UserDataDisplay from './ALTA_UserDataDisplay';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

export default function ALTA_UserData() {
  const { userData, changeProfile } = useContext(UserDataStore);
  const navigate = useNavigate();

  const [alertFold, setAlertFold] = useState<boolean>(false);
  const [isEditPage, setIsEditPage] = useState<boolean>(false);

  const openEditPage = (): void => {
    setAlertFold(true);
    setIsEditPage(!isEditPage);
  };

  const changeProfileImage = async (files: FileList | null) => {
    const img = new FormData();

    if (files) {
      const type = files[0].type;
      const regx = /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i;

      if (!regx.test(type)) generateError('이미지만 선택할 수 있습니다', '');

      img.append('profileImage', files[0]);

      const userStatus = await changeProfile(img);

      if (userStatus.status === -1) navigate('/');
      else if (userStatus.status === -2)
        generateError('프로필을 수정할 수 없습니다', '');
    }
  };

  return (
    <Box sx={wrapper}>
      <Input
        id="file"
        type="file"
        accept="image/*"
        onChange={(e) => changeProfileImage(e.target.files)}
      />
      <ALTA_ContentsTitle>내 정보</ALTA_ContentsTitle>
      <Box sx={[userDataStyle, alertFold && unfold]}>
        {isEditPage && (
          <ALTA_Tooltip title="내 정보 수정">
            <EditIcon sx={[editButtonStyle, inTop]} onClick={openEditPage} />
          </ALTA_Tooltip>
        )}
        <Box sx={userDataTopStyle}>
          <Box sx={profileImgStyle}>
            <img src={userData.profileUrl || defaultProfile} alt="기본 프로필 이미지" />
          </Box>
          <ALTA_Tooltip title="프로필 사진 변경">
            <PhotoButton>
              <Label htmlFor="file">
                <CameraAltIcon />
              </Label>
            </PhotoButton>
          </ALTA_Tooltip>
          <Box sx={profileDataStyle}>
            {isEditPage ? <ALTA_UserDataEdit setIsEditPage={setIsEditPage} /> : <ALTA_UserDataDisplay />}
          </Box>
        </Box>
        <Box>
          <ALTA_AlertSetting />
        </Box>
        {isEditPage ? (
          <></>
        ) : (
          <Button sx={[editButtonStyle, inBottom]} onClick={() => setAlertFold(!alertFold)}>
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
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'width': '200px',
  'height': '200px',
  'overflow': 'hidden',
  'borderRadius': '100px',
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

const Input = styled.input`
  all: unset;
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
`;
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;
