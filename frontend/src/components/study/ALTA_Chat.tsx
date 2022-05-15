import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Input, Button } from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';
import { chat, chatResponse } from '../../types';

// socket.io 가 아닌 sock js를 사용하는 이유는 spring 서버와 통신하기 때문
// node.js 를 사용한다면 socket.io를 주로 사용
// + 공식 깃헙에 따르면, 브라우저와 웹 서버 사이에서 짧은 지연시간, 크로스 브라우징 지원
// => 웹 소켓 프로토콜을 지원하지 않는 최신 브라우저에서도 해당 라이브러리 api가 잘 작동되도록 지원하는 라이브러리
// 그 중 sockjs-client는 소켓을 지원하지 않는 IE 9 이하 등의 브라우저 대응을 위함
import SockJS from 'sockjs-client';
// stomp 는 spring 에 종속적
import Stomp from 'stompjs';

type Params = {
  studyId: string | undefined;
};

const headers = {
  ACCESS_TOKEN: `Bearer ${localStorage.getItem('jwt')}`,
};

export default function ALTA_Chat() {
  const { studyId } = useParams<Params>();

  // const socket: WebSocket = new SockJS(`${process.env.REACT_APP_BUTTON_URL}:8000/chat`);
  const socket: WebSocket = new SockJS(`http://localhost:8000/chat`);
  const stompClient: Stomp.Client = Stomp.over(socket);
  // stompClient.debug = (...args: string[]): any => console.log(args);

  const [contents, setContents] = useState<chatResponse[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const userData: string | null = localStorage.getItem('UserData');
    if (userData) {
      setUserId(JSON.parse(userData)['id']);
      stompClient.connect(headers, () => {
        console.log('접속');
        stompClient.subscribe(`/topic/${studyId}`, (data) => {
          console.log('구독');
          // console.log(data);
          const newMessage: chatResponse = JSON.parse(data.body) as chatResponse;
          setContents([...contents, newMessage]);
          console.log(contents);
        });
      });
    } else {
      console.log('not user');
    }
  }, [contents]);

  const handleEnter = () => {
    const newMessage: chat = { userId, content: message };
    stompClient.send(`/chat/${studyId}`, headers, JSON.stringify(newMessage));
    setMessage('');
  };

  return (
    <>
      <Box sx={titleStyle}>소통창구</Box>
      <Box sx={[chatBoxStyle, scrollStyle]}>
        <Box>{userId} :</Box>
      </Box>
      <Input placeholder="메세지를 입력하세요" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={handleEnter}>입력</Button>
      <Box>채팅창</Box>
    </>
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

const chatBoxStyle = {
  display: 'flex',
  minHeight: '300px',
  marginBottom: '10px',
  padding: '10px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  borderRadius: '5px',
};
