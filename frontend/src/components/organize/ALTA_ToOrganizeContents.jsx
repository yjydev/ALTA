import {
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  Button,
} from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';

import ALTA_InputItem from './ALTA_InputItem';

export default function ALTA_ToOrganizeContents() {
  const languages = ['JAVA', 'Python', '기타'];

  const [language, setLanguage] = useState('JAVA');
  const [open, setOpen] = useState(true);

  const handleLanguage = (e) => setLanguage(e.target.value);
  const handleOpen = (e) => setOpen(e.target.value);

  return (
    <Box sx={wrapper}>
      <Box sx={organizationCard}>
        <ALTA_InputItem label="스터디 이름">
          <TextField
            required
            sx={{
              width: '100%',
            }}
            variant="standard"
            placeholder="스터디 이름을 정해주세요"
          />
        </ALTA_InputItem>
        <ALTA_InputItem label="풀이 언어" width="60%" right={200}>
          <Select
            id="standard-select-currency"
            value={language}
            variant="standard"
            onChange={handleLanguage}
            sx={{
              width: '60%',
            }}
          >
            {languages.map((lan) => (
              <MenuItem key={lan} value={lan}>
                {lan}
              </MenuItem>
            ))}
          </Select>
        </ALTA_InputItem>
        <ALTA_InputItem label="인원 수" width="20%" right={400}>
          <TextField
            required
            sx={{
              width: '20%',
              textAlign: 'center',
            }}
            type="number"
            variant="standard"
            defaultValue={0}
          />
        </ALTA_InputItem>
        <ALTA_InputItem label="공개 여부" width="40%" right={300}>
          <RadioGroup row value={open} onChange={handleOpen}>
            <FormControlLabel value="true" control={<Radio />} label="공개" />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="비공개"
            />
          </RadioGroup>
        </ALTA_InputItem>
        <ALTA_InputItem label="Repository 이름">
          <TextField
            required
            sx={{
              width: '100%',
            }}
            variant="standard"
            placeholder="Repository 이름을 적어주세요"
          />
        </ALTA_InputItem>
        <ALTA_InputItem label="스터디 소개">
          <StyledTextArea
            rows="4"
            placeholder="소개글을 써주세요. (최대 100자)"
          ></StyledTextArea>
        </ALTA_InputItem>
        <Box sx={btnGroup}>
          <Button variant="contained" sx={btn}>
            <span>생</span>
            <span>성</span>
          </Button>
          <Button variant="contained" color="error" sx={btn}>
            <span>취</span>
            <span>소</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const wrapper = {
  display: 'flex',
  width: '100%',
  height: '100vh',
  justifyContent: ' center',
  alignItems: 'center',
};

const organizationCard = {
  backgroundColor: '#fff',
  padding: '50px 20px',
  borderRadius: '5px',
};
const btnGroup = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '30px',
};
const btn = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '49%',
  height: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#F6F6F6',
};

const StyledTextArea = styled.textarea`
  all: unset;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  box-sizing: border-box;
  background-color: #d9cab3;
  border-radius: 5px;
`;
