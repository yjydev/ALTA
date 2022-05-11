import { Typography } from '@mui/material';
import React from 'react';

export default function ALTA_ContentsTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Typography sx={title}>{children}</Typography>;
}

const title = {
  width: '100%',
  height: '50px',
  margin: '20px 0 ',
  textAlign: 'center',
  fontSize: '25px',
  fontWeight: 'bold',
  lineHeight: '50px',
  borderRadius: '5px',
  backgroundColor: 'rgba(138, 172, 158, .5)',
};
