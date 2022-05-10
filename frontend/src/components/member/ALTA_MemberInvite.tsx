import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  TextField,
  Button,
  InputLabel,
  Autocomplete,
  CircularProgress,
} from '@mui/material';

import { postRequest, getRequest } from '../../api/request';
import {
  generateCheck,
  generateError,
  generateTimer,
} from '../../modules/generateAlert';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MemberList({
  studyId,
}: {
  studyId: string | undefined;
}) {
  const navigate = useNavigate();

  const [userList, setUserList] = useState<userList[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(
    searchOpen && userList.length === 0,
  );

  const [selectName, setSelectName] = useState<string>('');
  const [selectUser, setSelectUser] = useState<userList | null>({
    id: '',
    email: '',
    nickname: '',
  });

  const handleEmail = async (nickname: string) => {
    setSelectName(nickname);
    // console.log(nickname);
    setLoading(true);
    try {
      const res = await getRequest(`/api/user/search?q=${nickname}`);
      setUserList(res);
      setLoading(false);
      // console.log(userList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInvite = async () => {
    const request = {
      userId: '',
    };
    if (!selectUser) {
      const select = userList.find((usr) => usr.nickname === selectName);
      if (select) {
        setSelectUser(select);
      }
    }
    generateTimer(
      '잠시 기다려 주세요',
      `${selectUser?.nickname} 님에게 보낼 초대메일을 작성중입니다`,
    );
    if (selectUser) {
      if (selectUser.email) {
        request.userId = selectUser.id;
        try {
          const res = await postRequest(
            `/api/study/${studyId}/invitation`,
            JSON.stringify(request),
          );
          console.log(res);
          generateCheck(
            '초대 완료',
            `${selectUser.nickname} 님에게 초대 메일을 발송하였습니다`,
            () => navigate(`/study/${studyId}/member`),
          );
        } catch (err) {
          generateError(`초대를 보낼 수 없습니다`, ``);
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
  };

  return (
    <Box pt={3}>
      <ALTA_ContentsTitle> 멤버 초대 </ALTA_ContentsTitle>
      <Box sx={wrapper} mt={4}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columns={14}
          pl={1}
          spacing={2}
        >
          <Grid item xs={2} sx={labelStyle}>
            <InputLabel htmlFor="email-input" sx={emailLabel}>
              이메일
            </InputLabel>
          </Grid>
          <Grid item xs={9}>
            <Autocomplete
              open={searchOpen}
              onOpen={() => {
                setSearchOpen(true);
              }}
              onClose={() => {
                setSearchOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.nickname === value.nickname
              }
              // 자동완성 기능으로 특정 옵션을 선택한 경우
              onChange={(e, obj) => setSelectUser(obj)}
              getOptionLabel={(option) => option.nickname}
              options={userList}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="email-input"
                  variant="outlined"
                  placeholder="초대할 사람의 닉네임을 입력해주세요"
                  size="small"
                  fullWidth
                  // 자동완성 사용 없이 직접 작성할 경우
                  onChange={(e) => handleEmail(e.target.value)}
                  // 자동완성 기능을 활용하여 옵션 선택을 위해 엔터를 칠 경우
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      setSelectName((e.target as HTMLInputElement).value);
                    }
                  }}
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
              )}
            />
          </Grid>
          <Grid item xs={3} sx={btnStyle}>
            <Button variant="contained" sx={inviteBtn} onClick={handleInvite}>
              초대
            </Button>
          </Grid>
        </Grid>
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

const emailLabel = {
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
};

type userList = {
  id: string;
  email: string;
  nickname: string;
};
