import styled from '@emotion/styled';
import { AppBar, Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function ALTA_Header() {
  return (
    <Box sx={wrapper}>
      <AppBar sx={navStyle}>
        <Img src="logo.png" alt="" />
        <Box>
          <AccountBoxIcon sx={{ fontSize: '35px' }} />
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
