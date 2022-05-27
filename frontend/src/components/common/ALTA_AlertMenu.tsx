import { Dispatch, SetStateAction } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import { Grid, Paper, Box, Typography, Button, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { readAlertApi } from '../../api/apis';
import { AlertData } from '../../types';
import { displayAt } from '../../modules/displayAt';
import { checkLogin } from '../../modules/LoginTokenChecker';

type Props = {
  data: AlertData[];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const map = new Map();
map.set('SITE_CODE', '풀이 등록');
map.set('SITE_COMMENT', '리뷰 등록');

export default function ALTA_AlertMenu({ data, setOpen }: Props) {
  const navigate: NavigateFunction = useNavigate();

  const changeChecked = async (d: AlertData): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    await readAlertApi(Number(d.alertId));
    d.isChecked = true;
  };

  const handleClick = (d: AlertData): void => {
    if (!d.isChecked) {
      changeChecked(d);
    }
    navigate(`${d.url}`);
    setOpen(false);
  };

  return (
    <>
      {data.map((d) => (
        <MenuItem
          key={d.alertId}
          onClick={() => {
            handleClick(d);
          }}
        >
          <Box sx={codeCommentBoxStyle}>
            <Paper sx={paperBoxStyle}>
              <Button startIcon={<CloseIcon />} disableRipple sx={delBtnStyle} />
              <Grid container direction="row" sx={infoGridStyle}>
                <Grid item sx={d.isChecked ? readStyle : null}>
                  <Grid sx={infoStyle}>
                    <Box>
                      <p style={{ color: '#6d9886' }}>
                        {d.senderNickName} - {map.get(d.type)}
                      </p>
                    </Box>
                    <Typography sx={dateStyle}>{displayAt(d.time)}</Typography>
                  </Grid>
                  <Typography sx={commentContentStyle}>{d.content}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </MenuItem>
      ))}
    </>
  );
}

const codeCommentBoxStyle = {
  position: 'relative',
  marginBottom: 3,
};

const paperBoxStyle = {
  width: '30rem',
  whiteSpace: 'normal',
  wordBreak: 'normal',
};

const infoGridStyle = {
  paddingLeft: 2,
  paddingRight: 6,
  paddingY: 2,
};

const delBtnStyle = {
  color: '#212121',
  position: 'absolute',
  right: '10px',
  top: '35px',
  padding: 0,
  minWidth: '10px',
};

const infoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const dateStyle = {
  color: 'gray',
  marginRight: '10px',
  marginTop: '17px',
};

const unreadStyle = {
  color: 'primary.main',
};

const readStyle = {
  color: 'gray',
  textDecoration: 'line-through',
  cursor: 'default',
};

const commentCodeLineStyle = {
  color: 'primary.main',
  cursor: 'pointer',
  marginRight: 1,
  textDecorationLine: 'none',
};

const commentStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
};

const commentContentStyle = {
  marginBottom: 2,
};

const editCommentInput = {
  paddingBottom: 2,
  paddingLeft: 0,
  width: '70%',
};

const adornStyle = {
  color: 'primary.main',
  fontWeight: 'bold',
};
