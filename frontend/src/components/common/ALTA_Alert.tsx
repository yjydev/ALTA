import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Box, Menu, Badge, Tabs, Tab, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import { AlertData } from '../../types';
import ALTA_Tooltip from './ALTA_Tooltip';
import ALTA_AlertMenu from './ALTA_AlertMenu';
import { readAlertAllApi } from '../../api/apis';
import { checkLogin } from '../../modules/LoginTokenChecker';

import { AlertDataStore } from '../../context/AlertContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function ALTA_Alert() {
  const navigate: NavigateFunction = useNavigate();
  const { alertData, badgeCnt, setBadgeCnt } = useContext(AlertDataStore);
  const [open, setOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);
  const [allRead, setAllRead] = useState<boolean>(false);

  const anchorRef = useRef<SVGSVGElement>(null);

  let newAlert: AlertData[] = alertData.filter((d: AlertData): boolean => d.isChecked === false);

  useEffect((): void => {
    setAllRead(false);
    newAlert = alertData.filter((d: AlertData): boolean => d.isChecked === false);
    setBadgeCnt(newAlert.length);
  }, []);

  useEffect(() => {
    setBadgeCnt(newAlert.length);
  }, [newAlert]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const allChecked = async (): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    setAllRead(true);
    await readAlertAllApi();
    setOpen(false);
    setBadgeCnt(0);
    newAlert = alertData.filter((d: AlertData): boolean => d.isChecked === false);
  };

  return (
    <Box>
      <ALTA_Tooltip title="알림">
        <Badge
          badgeContent={badgeCnt}
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="안읽은 알림만 보기" {...a11yProps(0)} />
            <Tab label="전체 알림 보기" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={menuStyle}>
          <TabPanel value={tab} index={0}>
            {badgeCnt ? (
              <Box>
                전체 읽음
                {allRead ? (
                  <IconButton>{<CheckCircleRoundedIcon sx={resolvedStyle} />}</IconButton>
                ) : (
                  <IconButton onClick={allChecked}>{<CheckCircleOutlineRoundedIcon sx={unresolvedStyle} />}</IconButton>
                )}
                <ALTA_AlertMenu data={newAlert} setOpen={setOpen} />
              </Box>
            ) : (
              <Typography sx={{ color: 'error.main', fontSize: '20px' }}>새로운 알림이 없습니다</Typography>
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <ALTA_AlertMenu data={alertData} setOpen={setOpen} />
          </TabPanel>
        </Box>
      </Menu>
    </Box>
  );
}

const menuStyle = {
  width: '35rem',
  display: 'flex',
  height: '30rem',
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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
