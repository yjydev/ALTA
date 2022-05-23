import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import {
  Grid,
  Box,
  TextField,
  Button,
  InputLabel,
  Autocomplete,
  CircularProgress,
  Typography,
  AutocompleteRenderInputParams,
} from '@mui/material';

import { sendMailApi, searchMemberApi } from '../../api/apis';
import { userList, defaultUser } from '../../types';
import { MemberStore } from '../../context/MemberContext';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { generateCheck, generateError, generateTimer } from '../../modules/generateAlert';
import _ from 'lodash';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberList({ studyId }: { studyId: number }) {
  const navigate: NavigateFunction = useNavigate();
  const { setIsRefresh, members, maxPeople } = useContext(MemberStore);

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [userList, setUserList] = useState<userList[]>([]);
  const [loading, setLoading] = useState<boolean>(searchOpen && userList.length === 0);
  const [selectUser, setSelectUser] = useState<userList>(defaultUser);

  const searchName = async (nickname: string): Promise<void> => {
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
    } catch {
      setLoading(false);
    }
  };

  const handleInvite = async (): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    else {
      generateTimer('잠시 기다려 주세요', `${selectUser?.nickname} 님에게 보낼 초대메일을 작성중입니다`);
      if (inputValue) {
        if (selectUser.email) {
          try {
            const res = await sendMailApi(studyId, parseInt(selectUser.id));
            generateCheck('초대 완료', `${selectUser.nickname} 님에게 초대 메일을 발송하였습니다`, () =>
              setIsRefresh(true),
            );
          } catch (err: any) {
            generateError(`초대를 보낼 수 없습니다`, `${err.response.data.message}`);
          }
        } else {
          generateError(`${selectUser.nickname} 님의 이메일이 존재하지 않습니다.`, ``);
        }
      } else {
        generateError(`초대할 사람의 닉네임을 입력해주세요`, ``);
      }
      setInputValue('');
      setUserList([]);
    }
  };

  return (
    <Box sx={inviteBoxStyle}>
      <ALTA_ContentsTitle> 멤버 초대 </ALTA_ContentsTitle>
      <Box sx={inputBoxStyle}>
        <Grid container columns={14} spacing={2}>
          <Grid item xs={11}>
            <Autocomplete
              open={searchOpen}
              onOpen={(): void => {
                setSearchOpen(true);
              }}
              onClose={(): void => {
                setSearchOpen(false);
              }}
              isOptionEqualToValue={(option, value): boolean => option === value}
              // 자동완성 기능으로 특정 옵션을 선택한 경우
              onChange={(e: React.SyntheticEvent<Element, Event>, obj: userList | null): void => {
                if (obj) {
                  setSelectUser(obj);
                  setInputValue(obj.nickname);
                }
              }}
              onInputChange={(e: React.SyntheticEvent<Element, Event>): void => {
                if (e) searchName((e.target as HTMLInputElement).value);
              }}
              inputValue={inputValue}
              getOptionLabel={(option: userList): string => option.nickname}
              options={[selectUser, ...userList]}
              noOptionsText={'일치하는 데이터가 없습니다'}
              loading={loading}
              renderInput={(params: AutocompleteRenderInputParams): JSX.Element => (
                <Grid container alignItems="center">
                  <Grid item xs={2} sx={labelStyle}>
                    <InputLabel htmlFor="nickname-input" sx={nameLabelStyle}>
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
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
            <Button variant="contained" sx={inviteBtnStyle} onClick={_.debounce(handleInvite, 500)}>
              초대
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const inviteBoxStyle = {
  paddingBottom: 3,
};

// default btn color = primary'rgb(109,152,134,1)' / hover = 'rgb(76, 106, 93)'

const inviteBtnStyle = {
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

const nameLabelStyle = {
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

const inputBoxStyle = {
  backgroundColor: '#ffffff',
  height: '4.5rem',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginTop: 4,
};
