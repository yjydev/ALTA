import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppBar, Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from '../../images/logo.webp';

import ALTA_Tooltip from './ALTA_Tooltip';
import ALTA_Alert from './ALTA_Alert';
import AlertContext from '../../context/AlertContext';

export default function ALTA_Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <Box sx={wrapperStyle}>
      <AlertContext>
        <AppBar sx={navStyle}>
          <StyledImg src={Logo} alt="" />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <StyledA>
              <ALTA_Alert />
            </StyledA>
            <ALTA_Tooltip title="마이 페이지">
              <StyledA onClick={() => navigate('/mypage')}>
                <AccountBoxIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
              </StyledA>
            </ALTA_Tooltip>
            <ALTA_Tooltip title="로그아웃">
              <StyledA onClick={logout}>
                <LogoutIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
              </StyledA>
            </ALTA_Tooltip>
          </Box>
        </AppBar>
      </AlertContext>
    </Box>
  );
}

const wrapperStyle = {
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

const StyledImg = styled.img`
  width: 100px;
`;

const StyledA = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
`;
