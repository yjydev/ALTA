import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { mainColor, errorColor, whiteColor } from '../../modules/colorChart';

type Props = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleComplete: () => void;
};

export default function ALTA_Dialog({ title, children, open, setOpen, handleComplete }: Props) {
  return (
    <div>
      <Dialog fullWidth open={open} onClose={(): void => setOpen(false)}>
        <DialogTitle sx={titleStyle}>{title}</DialogTitle>
        <DialogContent sx={childrenStyle}>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleComplete} variant="contained" sx={submitBtnStyle}>
            완 료
          </Button>
          <Button onClick={(): void => setOpen(false)} sx={delBtnStyle}>
            취 소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const titleStyle = {
  marginBottom: 2,
  marginTop: 3,
  marginLeft: 2,
};

const childrenStyle = {
  marginX: 2,
};

const delBtnStyle = {
  'backgroundColor': errorColor,
  '&:hover': {
    backgroundColor: '#A28080',
  },
  'color': whiteColor,
  'marginBottom': 3,
  'marginRight': 4,
  'fontSize': '16px',
  'padding': '5px',
};

const submitBtnStyle = {
  backgroundColor: mainColor,
  color: whiteColor,
  marginBottom: 3,
  marginRight: 1,
  fontSize: '16px',
  padding: '5px',
};
