import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppBar, Box, Menu, MenuItem, Badge } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { EventSourcePolyfill } from 'event-source-polyfill';

import Logo from '../../images/logo.png';

import ALTA_Tooltip from './ALTA_Tooltip';

type alertData = {
  alertId: number;
  senderNickname: string;
  type: string;
  content: string;
  time: Date;
  url: string;
  isChecked: boolean;
};

export default function ALTA_Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<SVGSVGElement>(null);

  const [listening, setListening] = useState<boolean>(false);
  const [data, setData] = useState<alertData[]>([]);
  const EventSource = EventSourcePolyfill;

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userData');
    navigate('/');
  };

  useEffect(() => {
    setListening(false);
    if (!listening) {
      const eventSource = new EventSource('http://localhost:8000/api/user/alert/subscribe', {
        headers: {
          ACCESS_TOKEN: `Bearer ${localStorage.getItem('jwt')}`,
          heartbeatTimeout: '300 * 1000',
        },
      }); //구독
      eventSource.onopen = (ev) => {
        console.log(ev);
        console.log('connection opened');
      };

      eventSource.onmessage = (event) => {
        const result = JSON.parse(event.data);
        setData((prev) => [...prev, result]);
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log('eventsource closed (' + event.target.readyState + ')');
        }
        eventSource.close();
      };

      setListening(true);
    }

    // return () => {
    //   eventSource.close();
    //   console.log('eventsource closed');
    // };
  }, []);

  return (
    <Box sx={wrapperStyle}>
      <AppBar sx={navStyle}>
        <StyledImg src={Logo} alt="" />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StyledA>
            <ALTA_Tooltip title="알림">
              <NotificationsIcon
                ref={anchorRef}
                sx={{ fontSize: '40px', cursor: 'pointer' }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={() => setOpen(!open)}
              />
            </ALTA_Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorRef.current}
              open={open}
              onClose={() => setOpen(!open)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {data.map((d) => (
                <Box sx={menuStyle} key={d.alertId}>
                  <MenuItem onClick={() => navigate(`${d.url}`)}>{d.content}</MenuItem>
                </Box>
              ))}
            </Menu>
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

const menuStyle = {
  width: '100%',
  backgroundColor: 'inherit',
};
