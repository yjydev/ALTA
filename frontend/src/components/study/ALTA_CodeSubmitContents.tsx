import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ALTA_CodeBlock from '../common/ALTA_CodeBlock';
import ALTA_InputItem from '../common/ALTA_InputItem';
import { blackColor } from '../../modules/colorChart';

export default function ALTA_CodeSubmitContents() {
  const [commit, setCommit] = useState<string>('');
  const [test, setTest] = useState<string>('코드를 업로드 해주세요.');

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (files) {
      const reader = new FileReader();

      reader.onload = () => setTest(String(reader.result));
      reader.readAsText(files[0]);
    }
  };

  return (
    <Box sx={wrapperStyle}>
      <ALTA_InputItem
        label="커밋 메세지"
        focused={false}
        focusHandler={() => null}
      >
        <TextField
          id="스터디 이름"
          variant="standard"
          placeholder="커밋 메세지를 입력해주세요"
          value={commit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setCommit(e.target.value)
          }
          sx={{ width: '100%' }}
        />
      </ALTA_InputItem>
      <ALTA_InputItem
        label="코드 업로드"
        focused={false}
        focusHandler={() => null}
      >
        <FileInput id="file" type="file" onChange={uploadFile} />
        <Button variant="contained" sx={uploadBtnStyle}>
          <Label htmlFor="file">
            <Box sx={uploadBtnStyle}>
              <AddCircleIcon
                sx={{ color: blackColor, opacity: '0.5', fontSize: '25px' }}
              />
            </Box>
          </Label>
        </Button>
      </ALTA_InputItem>
      <ALTA_CodeBlock code={test} language="javascript" />
    </Box>
  );
}

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '40px',
};

const uploadBtnStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '30px',
  padding: 0,
};

const FileInput = styled.input`
  all: unset;
  position: absolute;
  left: 0;
  z-index: -10;
`;

const Label = styled.label`
  width: 100%;
`;
