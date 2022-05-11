import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppBar, Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from '../../images/logo.png';

import ALTA_Tooltip from './ALTA_Tooltip';

export default function ALTA_Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userData');
    navigate('/');
  };
  return (
    <Box sx={wrapper}>
      <AppBar sx={navStyle}>
        <Img src={Logo} alt="" />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ALTA_Tooltip title="마이 페이지">
            <A onClick={() => navigate('/mypage')}>
              <AccountBoxIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
            </A>
          </ALTA_Tooltip>
          <ALTA_Tooltip title="로그아웃">
            <A onClick={logout}>
              <LogoutIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
            </A>
          </ALTA_Tooltip>
        </Box>
      </AppBar>
    </Box>
  );
}

const wrapper = {
  height: '55px',
};

const navStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '55px',
  padding: '0 20px',
};

const Img = styled.img`
  width: 100px;
`;

const A = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
`;
