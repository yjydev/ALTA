import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
type Props = {
  children: React.ReactNode;
  targetStatus: boolean;
  setTarget: () => void;
};

export default function ALTA_ToggleBtn({ children, targetStatus, setTarget }: Props) {
  return (
    <Box sx={toggleButtonStyle}>
      <Typography sx={toggleLabelStyle}>{children}</Typography>
      <FormControlLabel
        label=""
        value={targetStatus}
        onChange={setTarget}
        control={<Switch sx={switchStyle} checked={targetStatus} />}
      />
    </Box>
  );
}

const switchStyle = {
  margin: '5px 0 0 10px',
};

const toggleButtonStyle = {
  display: 'flex',
  width: '50%',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const toggleLabelStyle = {
  display: 'inline',
  margin: '0 50px 0 20px',
};
