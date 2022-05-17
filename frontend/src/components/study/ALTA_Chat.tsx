import { Box } from '@mui/material';

export default function ALTA_Chat() {
  return (
    <Box>
      <Box sx={titleStyle}>소통창구</Box>
      <Box>채팅란</Box>
      <Box>채팅창</Box>
    </Box>
  );
}

const titleStyle = {
  position: 'relative',
  marginBottom: '10px',
  padding: '5px 10px',
  boxSizing: 'border-box',
  borderBottom: '1px solid black',
  fontSize: '20px',
  textAlign: 'center',
};
