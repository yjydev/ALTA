import { Box, CircularProgress } from '@mui/material';

export default function ALTA_Loading() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={70} />
    </Box>
  );
}
