import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Typography, TextField, Box } from '@mui/material';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { putRequest } from '../../api/request';
import { generateCheck, generateError, generateTimer } from '../../modules/generateAlert';

export default function ALTA_inviteInput() {
  const navigate = useNavigate();
  const [isToggle, handleisToggle] = useState(false);
  const [inviteCode, setInviteCode] = useState<string>('');

  const handleInvite = async () => {
    generateTimer('잠시 기다려 주세요', `초대코드 검증 중입니다.`);
    const request = { code: inviteCode };
    try {
      const res = await putRequest(`/api/study/invitation`, JSON.stringify(request));
      generateCheck('가입 완료', `${res.studyName}스터디에 가입되었습니다`, () => navigate('/mypage'));
      setInviteCode('');
    } catch (err) {
      generateError('이미 가입된 스터디거나 초대 코드가 유효하지 않습니다', ``);
    }
  };

  return (
    <Box sx={wrapperStyle}>
      <Box>
        <Button
          onClick={() => handleisToggle(!isToggle)}
          sx={inputBtnStyle}
          disableElevation
          disableRipple
          endIcon={isToggle ? <ArrowForwardIosSharpIcon /> : <ArrowBackIosNewIcon />}
        >
          <Typography sx={[inputTextStyle]}>초대코드</Typography>
        </Button>
      </Box>
      <Box sx={[fieldStyle, isToggle ? { width: '250px' } : { width: '0px' }]}>
        <Box>
          <TextField
            required
            sx={{
              width: '100%',
            }}
            variant="standard"
            placeholder="초대코드를 입력해주세요"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
        </Box>
        <Box sx={completeBtnStyle}>
          {isToggle && (
            <Button variant="outlined" onClick={handleInvite}>
              입력
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const wrapperStyle = {
  display: 'flex',
  margin: '10px 0',
  minHeight: '50px',
  justifyContent: 'right',
};

const inputTextStyle = {
  marginRight: 1,
  fontWeight: 'bold',
};

const inputBtnStyle = {
  color: '#212121',
};

const completeBtnStyle = {
  marginLeft: 2,
};

const fieldStyle = {
  display: 'flex',
  transition: '.4s',
  marginLeft: 2,
};
