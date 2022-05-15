import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  TextField,
  Button,
  InputLabel,
  Autocomplete,
  CircularProgress,
  Typography,
} from '@mui/material';

import { sendMailApi, searchMemberApi } from '../../api/apis';
import { MemberStore } from '../../context/MemberContext';
import { checkLogin } from '../../modules/LoginTokenChecker';
import {
  generateCheck,
  generateError,
  generateTimer,
} from '../../modules/generateAlert';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberList({ studyId }: { studyId: number }) {
  const navigate = useNavigate();
  const { invitable } = useContext(MemberStore);

  const [userList, setUserList] = useState<userList[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(
    searchOpen && userList.length === 0,
  );
  const [inputValue, setInputValue] = useState<string>('');

  const [selectUser, setSelectUser] = useState<userList>(defaultUser);

  const searchName = async (nickname: string) => {
    setInputValue(nickname);
    if (!(await checkLogin()).status) navigate('/');
    setLoading(true);
    try {
      const res = await searchMemberApi(nickname);
      setUserList(res);
      setLoading(false);
      const select = userList.find((usr) => usr.nickname === nickname);
      if (select) {
        setSelectUser(select);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!(await checkLogin()).status) navigate('/');
    if (!invitable)
      generateError('초대가 불가합니다', '스터디 최대 인원에 도달하였습니다');
    else {
      generateTimer(
        '잠시 기다려 주세요',
        `${selectUser?.nickname} 님에게 보낼 초대메일을 작성중입니다`,
      );
      if (inputValue) {
        if (selectUser.email) {
          try {
            const res = await sendMailApi(studyId, parseInt(selectUser.id));
            generateCheck(
              '초대 완료',
              `${selectUser.nickname} 님에게 초대 메일을 발송하였습니다`,
              () => navigate(`/study/member`, { state: { studyId } }),
            );
          } catch (err: any) {
            generateError(
              `초대를 보낼 수 없습니다`,
              `${err.response.data.message}`,
            );
          }
        } else {
          generateError(
            `${selectUser.nickname} 님의 이메일이 존재하지 않습니다.`,
            ``,
          );
        }
      } else {
        generateError(`초대할 사람의 닉네임을 입력해주세요`, ``);
      }
      setInputValue('');
      setUserList([]);
    }
  };

  return (
    <Box pb={3}>
      <ALTA_ContentsTitle> 멤버 초대 </ALTA_ContentsTitle>
      <Box sx={wrapper} mt={4}>
        {invitable ? (
          <Grid container columns={14} pl={3} spacing={2}>
            <Grid item xs={11}>
              <Autocomplete
                open={searchOpen}
                onOpen={() => {
                  setSearchOpen(true);
                }}
                onClose={() => {
                  setSearchOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option === value}
                // 자동완성 기능으로 특정 옵션을 선택한 경우
                onChange={(e, obj) => {
                  if (obj) {
                    setSelectUser(obj);
                    setInputValue(obj.nickname);
                  }
                }}
                onInputChange={(e) => {
                  if (e) searchName((e.target as HTMLInputElement).value);
                }}
                inputValue={inputValue}
                getOptionLabel={(option) => option.nickname}
                options={[selectUser, ...userList]}
                noOptionsText={'일치하는 데이터가 없습니다'}
                loading={loading}
                renderInput={(params) => (
                  <Grid container alignItems="center">
                    <Grid item xs={2} sx={labelStyle}>
                      <InputLabel htmlFor="nickname-input" sx={nameLabel}>
                        닉네임
                      </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        {...params}
                        id="nickname-input"
                        placeholder="초대할 사람의 닉네임을 입력해주세요"
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                            </React.Fragment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
            <Grid item xs={3} sx={btnStyle}>
              <Button variant="contained" sx={inviteBtn} onClick={handleInvite}>
                초대
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography sx={messageStyle}>더이상 초대할 수 없습니다</Typography>
        )}
      </Box>
    </Box>
  );
}

// default btn color = primary'rgb(109,152,134,1)' / hover = 'rgb(76, 106, 93)'

const inviteBtn = {
  'backgroundColor': 'secondary.main',
  'color': '#000000',
  '&:hover': {
    backgroundColor: '#AFA291',
  },
};

const messageStyle = {
  fontSize: '17px',
  fontWeight: 'bold',
};

const nameLabel = {
  fontWeight: 'bold',
  color: '#000000',
};

const labelStyle = {
  paddingRight: 2,
  textAlign: 'right',
};

const btnStyle = {
  paddingLeft: 3,
  alignItems: 'left',
};

const wrapper = {
  backgroundColor: '#ffffff',
  height: '4.5rem',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

type userList = {
  id: string;
  email: string;
  nickname: string;
};

const defaultUser: userList = {
  id: '',
  email: '',
  nickname: '',
};
