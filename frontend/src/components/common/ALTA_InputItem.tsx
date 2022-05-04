import { Box, Typography } from '@mui/material';

export default function ALTA_InputItem({
  label,
  labelSize = 'm',
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
        <Typography sx={labelSize === 'm' ? labelstyle_m : labelstyle_s}>
          {label}
        </Typography>
      </label>
      <Box sx={[fieldStyle]}>{children}</Box>
    </Box>
  );
}

type Props = {
  label: string;
  labelSize?: string;
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

const labelstyle_m = {
  width: '120px',
  marginRight: '10px',
  fontSize: '21px',
};

const labelstyle_s = {
  width: '80px',
  marginRight: '10px',
  fontSize: '18px',
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
