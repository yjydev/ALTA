import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { LoginData } from '../../types/LoginDataType';

import ALTA_LanguageSelector from './ALTA_LanguageSelector';
import ALTA_InputItem from '../common/ALTA_InputItem';

type Props = {
  loginData: LoginData;
};

export default function ALTA_UserDataEdit({ loginData }: Props) {
  return (
    <Box>
      <ALTA_InputItem label="닉네임">
        <TextField
          id="닉네임"
          variant="standard"
          placeholder="Repository 이름을 적어주세요"
          sx={{ width: '90%' }}
        />
      </ALTA_InputItem>
      <ALTA_InputItem label="사용 언어">
        <ALTA_LanguageSelector />
      </ALTA_InputItem>
      <ALTA_InputItem label="자기소개">
        <TextArea id="닉네임"></TextArea>
      </ALTA_InputItem>
    </Box>
  );
}

const TextArea = styled.textarea`
  all: unset;
  width: 90%;
  padding: 0 10px;
  margin: 10px 0 20px;
  border-radius: 5px;
  background-color: rgba(224, 212, 194, 0.6);
`;
