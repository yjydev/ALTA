import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ALTA_StudyNotice() {
  return (
    <Box sx={notice}>
      <EditIcon />
    </Box>
  );
}
const notice = {
  height: '200px',
  marginBottom: '10px',
  padding: '10px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
};
