import { Box, Typography } from '@mui/material';

export default function ALTA_InputItem({
  label,
  children,
  focused,
  focusHandler,
}) {
  return (
    <Box
      sx={[wrapper, focused ? focus : null]}
      onClick={() => focusHandler(label)}
    >
      <label htmlFor={label}>
        <Typography sx={labelStyle}>{label}</Typography>
      </label>
      <Box sx={[fieldStyle]}>{children}</Box>
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  margin: '10px 0',
  minHeight: '50px',
  opacity: 0.5,
  transition: '.2s',
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

const focus = {
  transform: 'scale(1.03)',
  opacity: 1,
};
