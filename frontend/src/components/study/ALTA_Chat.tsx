import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Input, Button } from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';
import { chat, chatResponse } from '../../types';
import { StudyDetailStore } from '../../context/StudyDetailContext';

// socket.io 가 아닌 sock js를 사용하는 이유는 spring 서버와 통신하기 때문
// node.js 를 사용한다면 socket.io를 주로 사용
// + 공식 깃헙에 따르면, 브라우저와 웹 서버 사이에서 짧은 지연시간, 크로스 브라우징 지원
// => 웹 소켓 프로토콜을 지원하지 않는 최신 브라우저에서도 해당 라이브러리 api가 잘 작동되도록 지원하는 라이브러리
// 그 중 sockjs-client는 소켓을 지원하지 않는 IE 9 이하 등의 브라우저 대응을 위함
// stomp 는 spring 에 종속적
// import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

type Params = {
  studyId: string | undefined;
};

const headers = {
  ACCESS_TOKEN: `Bearer ${localStorage.getItem('jwt')}`,
};
// const socket: WebSocket = new SockJS(`${process.env.REACT_APP_BUTTON_URL}:8000/chat`);
// stompClient.debug = (...args: string[]): any => console.log(args);

type Props = {
  stompClient: Stomp.Client;
};

export default function ALTA_Chat({ stompClient }: Props) {
  const { studyId } = useParams<Params>();
  const navigate = useNavigate();
  const { chatContents, setChatContents, getChatContent } = useContext(StudyDetailStore);
  const chatInput = useRef<any>();

  const [message, setMessage] = useState<string>('');
  stompClient.debug = () => {
    'blank';
  };

  useEffect((): void => {
    (async function (): Promise<void> {
      if (studyId) {
        const chatStatus = await getChatContent(Number(studyId));
        // console.log(chatStatus);
        if (chatStatus.status === -1) navigate('/');
      }
    })();
  }, [studyId]);

  useEffect((): void => {
    stompClient.connect(headers, () => {
      // console.log('접속');
      stompClient.subscribe(`/topic/${studyId}`, (data) => {
        // console.log('구독');
        const newMessage: chatResponse = JSON.parse(data.body);
        setChatContents([...chatContents, newMessage]);
      });
    });
    scrollBottom();
  }, [chatContents]);

  const scrollBottom = () => {
    if (chatInput.current) {
      const { scrollHeight, clientHeight } = chatInput.current;
      chatInput.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  const handleEnter = () => {
    const newMessage: chat = { content: message };
    stompClient.send(`/chat/${studyId}`, headers, JSON.stringify(newMessage));
    setMessage('');
  };

  return (
    <>
      <Box sx={titleStyle}>소통창구</Box>
      <Box sx={[chatBoxStyle, scrollStyle]}>
        <Box>
          <div className="chatList" ref={chatInput}>
            {chatContents.map((mes, idx) => (
              <div key={idx} id="">
                {mes.nickname} : {mes.message}
              </div>
            ))}
          </div>
        </Box>
      </Box>
      <Box sx={chatInputStyle}>
        <Input placeholder="메세지를 입력하세요" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button onClick={handleEnter}>입력</Button>
      </Box>
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
  maxHeight: '300px',
  marginBottom: '10px',
  padding: '10px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  borderRadius: '5px',
  overflowY: 'scroll',
};

const chatInputStyle = {
  display: 'flex',
  marginBottom: '10px',
};
