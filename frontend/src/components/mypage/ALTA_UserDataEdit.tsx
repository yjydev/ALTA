import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { LoginData } from '../../types/LoginDataType';

import ALTA_LanguageSelector from './ALTA_LanguageSelector';
import ALTA_InputItem from '../common/ALTA_InputItem';

type Props = {
  loginData: LoginData;
};

export default function ALTA_UserDataEdit({ loginData }: Props) {
  console.log(loginData);
  return (
    <Box>
      <ALTA_InputItem label="닉네임">
        <TextField
          id="닉네임"
          variant="standard"
          placeholder="새로운 닉네임을 적어주세요"
          sx={{ width: '90%' }}
        />
      </ALTA_InputItem>
      <ALTA_InputItem label="사용 언어">
        <ALTA_LanguageSelector />
      </ALTA_InputItem>
      <ALTA_InputItem label="자기소개">
        <TextArea id="자기소개"></TextArea>
      </ALTA_InputItem>
    </Box>
  );
}

const TextArea = styled.textarea`
  all: unset;
  width: 90%;
  height: 70px;
  padding: 10px;
  margin: 10px 0 20px;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: rgba(224, 212, 194, 0.6);
`;
