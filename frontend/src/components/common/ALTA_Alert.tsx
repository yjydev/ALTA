import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Box, Menu, MenuItem, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { AlertData } from '../../types';
import { readAlertApi } from '../../api/apis';
import ALTA_Tooltip from './ALTA_Tooltip';

import { AlertDataStore } from '../../context/AlertContext';

export default function ALTA_Alert() {
  const navigate: NavigateFunction = useNavigate();
  const { alertData, getAlertData, setAlertData } = useContext(AlertDataStore);
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<SVGSVGElement>(null);

  const [listening, setListening] = useState<boolean>(false);
  const EventSource = EventSourcePolyfill;

  const changeChecked = async (d: AlertData): Promise<void> => {
    await readAlertApi(Number(d.alertId));
    d.isChecked = true;
  };

  useEffect((): void => {
    (async function (): Promise<void> {
      const status = await getAlertData();
      if (status.status === -1) navigate('/');
    })();
    if (!listening) {
      const eventSource = new EventSource(`${process.env.REACT_APP_BUTTON_URL}:8000/api/user/alert/subscribe`, {
        headers: {
          ACCESS_TOKEN: `Bearer ${localStorage.getItem('jwt')}`,
          heartbeatTimeout: '300 * 1000',
        },
      }); //구독

      eventSource.onmessage = (event) => {
        const result = JSON.parse(event.data);
        if (result['alertId'] !== -1) {
          setAlertData([...alertData, result]);
        }
      };

      setListening(true);
    }
  }, []);

  return (
    <Box>
      <ALTA_Tooltip title="알림">
        <Badge
          badgeContent={alertData.length}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          overlap="circular"
          sx={badgeStyle}
        >
          <NotificationsIcon
            ref={anchorRef}
            sx={{ fontSize: '40px', cursor: 'pointer' }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={() => setOpen(!open)}
          />
        </Badge>
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
        {alertData.map((d) => (
          <>
            <Box sx={menuStyle} key={d.alertId}>
              <MenuItem
                onClick={() => {
                  navigate(`${d.url}`);
                  setOpen(!open);
                }}
              >
                {d.content}
              </MenuItem>
              {d.isChecked ? (
                <IconButton>{<CheckCircleRoundedIcon sx={resolvedStyle} />}</IconButton>
              ) : (
                <IconButton onClick={() => changeChecked(d)}>
                  {<CheckCircleOutlineRoundedIcon sx={unresolvedStyle} />}
                </IconButton>
              )}
            </Box>
            <hr />
          </>
        ))}
      </Menu>
    </Box>
  );
}

const menuStyle = {
  width: '100%',
  backgroundColor: 'inherit',
  display: 'flex',
};

const badgeStyle = {
  '& .MuiBadge-badge': {
    color: 'text.primary',
    backgroundColor: 'secondary.main',
  },
};

const resolvedStyle = {
  color: 'primary.main',
};

const unresolvedStyle = {
  color: 'gray',
};
