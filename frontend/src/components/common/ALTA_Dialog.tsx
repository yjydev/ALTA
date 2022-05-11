import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export default function ALTA_Dialog({
  title,
  children,
  open,
  setOpen,
  handleComplete,
}: Props) {
  return (
    <div>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={titleStyle}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleComplete} variant="contained" sx={submitBtn}>
            완 료
          </Button>
          <Button onClick={() => setOpen(false)} sx={delBtn}>
            취 소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const titleStyle = {
  marginBottom: 2,
};

const delBtn = {
  backgroundColor: 'error.main',
  color: '#000000',
};

const submitBtn = {
  color: '#000000',
};

type Props = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleComplete: () => void;
};
