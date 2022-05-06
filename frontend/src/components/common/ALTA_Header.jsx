import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppBar, Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import Logo from '../../images/logo.png';

export default function ALTA_Header() {
  const navigate = useNavigate();
  return (
    <Box sx={wrapper}>
      <AppBar sx={navStyle}>
        <Img src={Logo} alt="" />
        <Box>
          <a onClick={() => navigate('/mypage')}>
            <AccountBoxIcon sx={{ fontSize: '35px', cursor: 'pointer' }} />
          </a>
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
