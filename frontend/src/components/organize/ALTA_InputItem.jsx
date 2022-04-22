import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

export default function ALTA_InputItem({
  label,
  width = '100%',
  right = 0,
  children,
}) {
  const [isFold, setIsFold] = useState(true);

  const openTextField = () => setIsFold(false);
  const clearTextField = () => {
    console.log('clear');
  };

  return (
    <Box sx={wrapper}>
      <Typography sx={labelStyle}>{label}</Typography>
      <Box sx={[fieldStyle]}>
        {children}
        <Box sx={[curtain, { right }, isFold ? { width } : unfold]}>
          {isFold ? <EditIcon onClick={openTextField} /> : null}
        </Box>
      </Box>
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  margin: '10px 0',
  minHeight: '50px',
};

const labelStyle = {
  width: '200px',
  fontSize: '21px',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  position: 'relative',
  width: '500px',
  transition: '.4s',
};

const curtain = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'start',
  height: '100%',
  transition: '.4s',
  backgroundColor: '#fff',
  zIndex: 100,
};

const unfold = {
  width: '0',
};
