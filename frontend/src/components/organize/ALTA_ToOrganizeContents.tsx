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

import { OrganizeStudyRequset } from '../../types/StudyType';
import { postRequest } from '../../api/request';
import {
  generateCheck,
  generateError,
  generateTimer,
} from '../../modules/generateAlert';

import ALTA_InputItem from '../common/ALTA_InputItem';

export default function ALTA_ToOrganizeContents() {
  const languages = ['JAVA', 'Python', '기타'];

  const [sumitBtn, setSumitBtn] = useState<boolean>(false);
  const [focusedItem, setFocusedItem] = useState<string>('스터디 이름');
  const [requestData, setReqeustData] = useState<OrganizeStudyRequset>({
    introduction: '',
    isPublic: 'true',
    language: 'JAVA',
    maxPeople: '2',
    name: '',
    repositoryName: '',
  });

  const handleFocusedItem = (label: string) => setFocusedItem(label);
  const handleRequestData = (eventValue: string, key: string) => {
    const newData: OrganizeStudyRequset = { ...requestData };
    newData[key] = String(eventValue);

    //state 변경
    if (!Object.values(newData).includes('')) {
      setSumitBtn(true);
    } else {
      setSumitBtn(false);
    }
    setReqeustData(newData);
    console.log(newData);
  };

  const organize = async () => {
    generateTimer(
      '잠시 기다려 주세요',
      `Github에 ${requestData.name} Repository를 생성 중입니다`,
    );
    try {
      await postRequest('/api/study', JSON.stringify(requestData));
      generateCheck(
        '스터디가 생성되었습니다',
        `${requestData.name} Repository가 Github에 생성되었습니다.`,
      );
    } catch (error) {
      generateError('스터디를 생성할 수 없습니다.', ``);
    }
  };

  const itemList = [
    {
      label: '스터디 이름',
      children: (
        <TextField
          id="스터디 이름"
          autoFocus
          variant="standard"
          value={requestData.name}
          onChange={(e) => handleRequestData(e.target.value, 'name')}
          placeholder="스터디 이름을 정해주세요"
          sx={{ width: '100%' }}
        />
      ),
    },
    {
      label: '풀이 언어',
      children: (
        <Select
          variant="standard"
          value={requestData.language}
          onChange={(e) => handleRequestData(e.target.value, 'language')}
        >
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
          value={requestData.maxPeople}
          onChange={(e) => handleRequestData(e.target.value, 'maxPeople')}
        />
      ),
    },
    {
      label: '공개 여부',
      children: (
        <RadioGroup
          row
          value={requestData.isPublic}
          onChange={(e) => handleRequestData(e.target.value, 'isPublic')}
        >
          <FormControlLabel
            value="true"
            control={<Radio id="공개 여부" />}
            label="공개"
          />
          <FormControlLabel
            value="false"
            control={<Radio id="공개 여부" />}
            label="비공개"
          />
        </RadioGroup>
      ),
    },
    {
      label: 'Repo 이름',
      children: (
        <TextField
          id="Repo 이름"
          variant="standard"
          placeholder="Repository 이름을 적어주세요"
          value={requestData.repositoryName}
          onChange={(e) => handleRequestData(e.target.value, 'repositoryName')}
          sx={{ width: '100%' }}
        />
      ),
    },
    {
      label: '스터디 소개',
      children: (
        <StyledTextArea
          id="스터디 소개"
          rows={4}
          placeholder="소개글을 써주세요. (최대 100자)"
          value={requestData.introduction}
          onChange={(e) => handleRequestData(e.target.value, 'introduction')}
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
          <Button
            variant="contained"
            sx={btn}
            disabled={!sumitBtn}
            onClick={organize}
          >
            {sumitBtn ? (
              <>
                <span>생</span>
                <span>성</span>
              </>
            ) : (
              <span>모든 항목을 채워주세요</span>
            )}
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
  width: '100%',
  backgroundColor: '#fff',
  padding: '50px',
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
