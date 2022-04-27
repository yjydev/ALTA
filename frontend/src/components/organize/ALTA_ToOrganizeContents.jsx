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

  const [focusedItem, setFocusedItem] = useState('스터디 이름');
  const [studyName, setStudyName] = useState('');
  const [language, setLanguage] = useState('JAVA');
  const [maxMember, setMaxMember] = useState(0);
  const [open, setOpen] = useState(true);
  const [repositoryName, setRepositoryName] = useState('');
  const [studyIntro, setStudyIntro] = useState('');

  const handleFocusedItem = (label) => setFocusedItem(label);
  const handleStudyName = (e) => setStudyName(e.target.value);
  const handleLanguage = (e) => setLanguage(e.target.value);
  const handleMaxMember = (e) => setMaxMember(e.target.value);
  const handleOpen = (e) => setOpen(e.target.value);
  const handleRepositoryName = (e) => setRepositoryName(e.target.value);
  const handleStudyIntro = (e) => setStudyIntro(e.target.value);

  const itemList = [
    {
      label: '스터디 이름',
      children: (
        <TextField
          id="스터디 이름"
          autoFocus
          variant="standard"
          value={studyName}
          onChange={handleStudyName}
          placeholder="스터디 이름을 정해주세요"
          sx={{ width: '100%' }}
        />
      ),
    },
    {
      label: '풀이 언어',
      children: (
        <Select variant="standard" value={language} onChange={handleLanguage}>
          {languages.map((lan) => (
            <MenuItem key={lan} value={lan}>
              {lan}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      label: '인원 수',
      children: (
        <TextField
          id="인원 수"
          type="number"
          variant="standard"
          value={maxMember}
          onChange={handleMaxMember}
        />
      ),
    },
    {
      label: '공개 여부',
      children: (
        <RadioGroup row value={open} onChange={handleOpen}>
          <FormControlLabel value="true" control={<Radio />} label="공개" />
          <FormControlLabel value="false" control={<Radio />} label="비공개" />
        </RadioGroup>
      ),
    },
    {
      label: 'Repository 이름',
      children: (
        <TextField
          id="Repository 이름"
          variant="standard"
          placeholder="Repository 이름을 적어주세요"
          value={repositoryName}
          onChange={handleRepositoryName}
          sx={{ width: '100%' }}
        />
      ),
    },
    {
      label: '스터디 소개',
      children: (
        <StyledTextArea
          id="스터디 소개"
          rows="4"
          placeholder="소개글을 써주세요. (최대 100자)"
          value={studyIntro}
          onChange={handleStudyIntro}
        ></StyledTextArea>
      ),
    },
  ];

  return (
    <Box sx={wrapper}>
      <Box sx={organizationCard}>
        {itemList.map((item) => (
          <ALTA_InputItem
            key={item.label}
            label={item.label}
            focused={focusedItem === item.label}
            focusHandler={handleFocusedItem}
          >
            {item.children}
          </ALTA_InputItem>
        ))}
        <Box sx={btnGroup}>
          <Button variant="contained" sx={btn} disabled>
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
  height: '100%',
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
