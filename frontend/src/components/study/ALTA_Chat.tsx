import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { Box, Input, Button, Avatar, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import scrollStyle from '../../modules/scrollStyle';
import { chatResponse } from '../../types';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { generateError } from '../../modules/generateAlert';
import { displayAt } from '../../modules/displayAt';
import { addChatApi } from '../../api/apis';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { subColor } from '../../modules/colorChart';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const headers = {
  ACCESS_TOKEN: `Bearer ${localStorage.getItem('jwt')}`,
};

type Params = {
  studyId: string | undefined;
};

export default function ALTA_Chat() {
  const { studyId } = useParams<Params>();
  const navigate: NavigateFunction = useNavigate();
  const { chatContents, setChatContents } = useContext(StudyDetailStore);
  const chatInput: React.MutableRefObject<any> = useRef<any>(null);
  const [buffer, setBuffer] = useState<any>('');

  let name = '';
  const userData: string | null = localStorage.getItem('UserData');
  if (userData) {
    name = JSON.parse(userData)['nickname'];
  }

  const [message, setMessage] = useState<string>('');
  const [connect, setConnect] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  useEffect((): void => {
    if (buffer !== '') {
      setChatContents([...chatContents, buffer]);
      setBuffer('');
    }
  }, [buffer]);
  let stompClient: Stomp.Client;
  useEffect(() => {
    if (!connect) {
      const socketJS = new SockJS(`${process.env.REACT_APP_BASE_URL}/api/ws`);
      stompClient = Stomp.over(socketJS);
      stompClient.debug = (): void => {
        '1';
      };
      stompClient.connect(headers, (): void => {
        stompClient.subscribe(`/api/topic/${studyId}`, (data: Stomp.Message): void => {
          const newMessage: chatResponse = JSON.parse(data.body);
          setBuffer(newMessage);
        });
        setConnect(true);
      });
    }
    return () => {
      stompClient.disconnect(() => setConnect(false));
    };
  }, []);

  window.onbeforeunload = function () {
    stompClient.disconnect(() => setConnect(false));
  };

  useEffect((): void => {
    scrollBottom();
  }, [chatContents]);

  const scrollBottom = (): void => {
    if (chatInput.current) {
      chatInput.current.scrollTo({
        top: chatInput.current.scrollHeight,
      });
    }
  };

  const handleEnter = async (): Promise<void> => {
    if (message === '') generateError('채팅을 입력해주세요', '');
    else {
      if (!(await checkLogin()).status) navigate('/');
      else {
        await addChatApi(Number(studyId), message);
        setMessage('');
      }
      setCheck(false);
    }
  };
  return (
    <Box sx={chatWrapper}>
      <h1>스터디 소통 창구</h1>
      <Box sx={titleStyle}>소통창구</Box>
      <Box sx={[chatBoxStyle, scrollStyle]} ref={chatInput}>
        <Box>
          {chatContents ? (
            <>
              {chatContents.map(
                (mes: chatResponse, idx: number): JSX.Element => (
                  <Grid container key={idx} sx={infoStyle} columns={14}>
                    {name === mes.nickname ? (
                      <>
                        <Grid item md={12} sx={rightListStyle}>
                          <Grid item sx={chatRightStyle}>
                            <Typography sx={nameRightStyle}>{mes.nickname}</Typography>
                            <Grid container sx={{ justifyContent: 'right' }}>
                              <Grid item sx={dateRightStyle}>
                                <Typography sx={{ fontSize: '12px' }}>{displayAt(new Date(mes.writeDate))}</Typography>
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
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Box sx={chatInputStyle}>
        <Input
          fullWidth
          placeholder="메세지를 입력하세요"
          value={message}
          sx={{ padding: '0 5px', marginRight: '5px' }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => setMessage(e.target.value)}
          onKeyDown={(ev: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
            if (ev.key === 'Enter' && !check) {
              handleEnter();
              setCheck(true);
            }
          }}
        />
        <Button variant="contained" sx={sendBtnStyle} onClick={handleEnter}>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
}

const chatWrapper = {
  width: '100%',
  height: '860px',
  padding: 2,
  margin: 2,
  boxSizing: 'border-box',
  borderRadius: '5px',
  backgroundColor: subColor,
};

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
  height: '88%',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  borderRadius: '5px',
  overflowY: 'scroll',
};

const chatInputStyle = {
  display: 'flex',
  marginTop: '10px',
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
  textAlign: 'right',
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
  margin: '0 10px',
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
  margin: '0 10px',
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

const sendBtnStyle = {
  minWidth: 3,
  height: '30px',
};
