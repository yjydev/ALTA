import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { Box, Input, Button, Avatar, Grid, Typography } from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';
import { chat, chatResponse } from '../../types';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { generateError } from '../../modules/generateAlert';
import { displayAt } from '../../modules/displayAt';

// socket.io 가 아닌 sock js를 사용하는 이유는 spring 서버와 통신하기 때문
// node.js 를 사용한다면 socket.io를 주로 사용
// + 공식 깃헙에 따르면, 브라우저와 웹 서버 사이에서 짧은 지연시간, 크로스 브라우징 지원
// => 웹 소켓 프로토콜을 지원하지 않는 최신 브라우저에서도 해당 라이브러리 api가 잘 작동되도록 지원하는 라이브러리
// 그 중 sockjs-client는 소켓을 지원하지 않는 IE 9 이하 등의 브라우저 대응을 위함
// stomp 는 spring 에 종속적
// import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const headers = {
  ACCESS_TOKEN: `Bearer ${localStorage.getItem('jwt')}`,
};

type Params = {
  studyId: string | undefined;
};

type Props = {
  stompClient: Stomp.Client;
};

export default function ALTA_Chat({ stompClient }: Props) {
  const { studyId } = useParams<Params>();
  const navigate: NavigateFunction = useNavigate();
  const { chatContents, setChatContents, getChatContent } = useContext(StudyDetailStore);
  const chatInput: React.MutableRefObject<any> = useRef<any>(null);
  let name = '';
  const userData: string | null = localStorage.getItem('UserData');
  if (userData) {
    name = JSON.parse(userData)['nickname'];
  }

  const [message, setMessage] = useState<string>('');
  stompClient.debug = (): void => {
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
    stompClient.connect(headers, (): void => {
      // console.log('접속');
      stompClient.subscribe(`/topic/${studyId}`, (data: Stomp.Message): void => {
        // console.log('구독');
        const newMessage: chatResponse = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
    scrollBottom();
  }, [chatContents]);

  const scrollBottom = (): void => {
    if (chatInput.current) {
      chatInput.current.scrollTo({
        top: chatInput.current.scrollHeight,
      });
    }
  };

  const addMessage = (message: chatResponse): void => {
    setChatContents([...chatContents, message]);
  };

  const handleEnter = (): void => {
    if (message === '') generateError('채팅을 입력해주세요', '');
    else {
      const newMessage: chat = { content: message };
      stompClient.send(`/chat/${studyId}`, headers, JSON.stringify(newMessage));
      setMessage('');
    }
  };

  return (
    <Box>
      <Box sx={titleStyle}>소통창구</Box>
      <Box sx={[chatBoxStyle, scrollStyle]} ref={chatInput}>
        <Box>
          {chatContents.map(
            (mes: chatResponse, idx: number): JSX.Element => (
              <Grid container key={idx} sx={infoStyle} columns={14}>
                {name === mes.nickname ? (
                  <>
                    <Grid item md={12} sx={rightListStyle}>
                      <Grid item sx={chatRightStyle}>
                        <Typography sx={nameRightStyle}>{mes.nickname}</Typography>
                        <Grid container>
                          <Grid item sx={dateRightStyle}>
                            <Typography>{displayAt(new Date(mes.writeDate))}</Typography>
                          </Grid>
                          <Grid item sx={bubbleRightStyle}>
                            {mes.message}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={2} sx={profileRightStyle}>
                      <Avatar src={mes.image} />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item md={2} sx={profileLeftStyle}>
                      <Avatar src={mes.image} />
                    </Grid>
                    <Grid item md={12} sx={leftListStyle}>
                      <Grid item sx={chatLeftStyle}>
                        <Typography>{mes.nickname}</Typography>
                        <Grid container>
                          <Grid item sx={bubbleLeftStyle}>
                            {mes.message}
                          </Grid>
                          <Grid item sx={dateLeftStyle}>
                            <Typography>{displayAt(new Date(mes.writeDate))}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            ),
          )}
        </Box>
      </Box>
      <Box sx={chatInputStyle}>
        <Input
          fullWidth
          placeholder="메세지를 입력하세요"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => setMessage(e.target.value)}
          onKeyDown={(ev: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            if (ev.key === 'Enter') {
              handleEnter();
            }
          }}
        />
        <Button onClick={handleEnter}>입력</Button>
      </Box>
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

const chatBoxStyle = {
  minHeight: '300px',
  maxHeight: '300px',
  width: '100%',
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
  marginLeft: '5px',
};

const infoStyle = {
  alignItems: 'center',
  display: 'flex',
  marginBottom: '13px',
};

const profileRightStyle = {
  justifyContent: 'center',
};

const nameRightStyle = {
  marginBottom: '5px',
  marginRight: '5px',
};

const profileLeftStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const leftListStyle = {
  display: 'flex',
  justifyContent: 'start',
};

const bubbleLeftStyle = {
  border: '0.5px solid black',
  borderRadius: '10px',
  padding: '10px',
  display: 'inline-block',
};

const chatLeftStyle = {
  textAlign: 'left',
};

const rightListStyle = {
  display: 'flex',
  justifyContent: 'end',
};

const bubbleRightStyle = {
  border: '0.5px solid black',
  borderRadius: '10px',
  padding: '10px',
  display: 'inline-block',
};

const chatRightStyle = {
  marginRight: '10px',
  textAlign: 'right',
};

const dateRightStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
  marginRight: '5px',
  color: 'gray',
};

const dateLeftStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
  marginLeft: '5px',
  color: 'gray',
};
