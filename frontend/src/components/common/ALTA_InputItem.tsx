import { Box, Typography } from '@mui/material';

export default function ALTA_InputItem({
  label,
  children,
  focused,
  focusHandler,
}: Props) {
  return (
    <Box
      sx={[wrapper, focused ? focus : null]}
      onFocus={() => (focusHandler ? focusHandler(label) : null)}
    >
      <label htmlFor={label}>
        <Typography sx={labelStyle}>{label}</Typography>
      </label>
      <Box sx={[fieldStyle]}>{children}</Box>
    </Box>
  );
}

type Props = {
  label: string;
  children: React.ReactNode;
  focused?: boolean;
  focusHandler?: (label: string) => void;
};

const wrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '10px 0',
  minHeight: '50px',
  transition: '.2s',
};

const labelStyle = {
  width: '120px',
  marginRight: '10px',
  fontSize: '21px',
};

const fieldStyle = {
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  alignItems: 'start',
  position: 'relative',
  transition: '.4s',
};

const focus = {
  transform: 'scale(1.03)',
};
