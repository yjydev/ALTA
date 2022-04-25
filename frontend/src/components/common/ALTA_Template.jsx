import { Box } from '@mui/material';

export default function ALTA_Template({ header, contents }) {
  return (
    <Box sx={layout}>
      <Box sx={headerStyle}>{header}</Box>
      <Box sx={contentsStyle}>{contents}</Box>
    </Box>
  );
}

const layout = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

const headerStyle = {
  flex: '0 1 auto',
  width: '100%',
};
const contentsStyle = {
  flex: '1 1 auto',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
};
