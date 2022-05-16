import ALTA_Notice from './ALTA_Notice';
import ALTA_Chat from './ALTA_Chat';
import { Box } from '@mui/material';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function ALTA_StudyBoard() {
  const socketJS = new SockJS(`${process.env.REACT_APP_BUTTON_URL}:8000/chat`);
  const stompClient: Stomp.Client = Stomp.over(socketJS);
  return (
    <Box sx={wrapper}>
      <ALTA_Notice />
      <ALTA_Chat stompClient={stompClient} />
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
};
