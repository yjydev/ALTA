import React, { useState } from 'react';
import {
  Box,
  Chip,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from '@mui/material';
import styled from '@emotion/styled';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import { generateCheck } from '../../modules/generateAlert';
import { feedbackApi } from '../../api/apis';
import ALTA_Dialog from './ALTA_Dialog';
import ALTA_Tooltip from './ALTA_Tooltip';

type Props = {
  header: React.ReactNode;
  contents: React.ReactNode;
};

export default function ALTA_Template({ header, contents }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<string>('피드백');

  const handleMail = async () => {
    await feedbackApi(content, type);
    setContent('');
    setType('피드백');
    setOpen(false);
    generateCheck('발송 완료', `피드백이 접수되었습니다. 감사합니다`, () => null);
  };

  return (
    <Box sx={layoutStyle}>
      <Box sx={headerStyle}>{header}</Box>
      <Box sx={contentsStyle}>
        {contents}
        <ALTA_Tooltip title="피드백">
          <StyledA onClick={() => setOpen(true)}>
            <Chip icon={<ForwardToInboxIcon style={iconStyle} />} sx={chipStyle}></Chip>
          </StyledA>
        </ALTA_Tooltip>
      </Box>
      <ALTA_Dialog open={open} setOpen={setOpen} title="피드백" handleComplete={handleMail}>
        <Box sx={commitStyle}>
          <FormControl sx={formStyle}>
            <FormLabel id="category">카테고리</FormLabel>
            <RadioGroup
              aria-labelledby="category"
              name="category-radio-group"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <FormControlLabel value="피드백" control={<Radio />} label="피드백" />
              <FormControlLabel value="버그 리포트" control={<Radio />} label="버그 리포트" />
              <FormControlLabel value="후기" control={<Radio />} label="후기" />
              <FormControlLabel value="기타" control={<Radio />} label="기타" />
            </RadioGroup>
          </FormControl>
          <InputLabel htmlFor="feedback">내용 :</InputLabel>
          <TextField
            id="feedback"
            variant="standard"
            // placeholder="내용을 입력해주세요"
            multiline
            rows="2"
            value={content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setContent(e.target.value)}
            sx={messageStyle}
          />
        </Box>
      </ALTA_Dialog>
    </Box>
  );
}

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  position: 'relative',
};

const headerStyle = {
  flex: '0 1 auto',
  width: '100%',
};
const contentsStyle = {
  flex: '1 1 auto',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
};

const StyledA = styled.button`
  all: unset;
  float: right;
  position: absolute;
  bottom: 50px;
  right: 40px;
`;

const iconStyle = {
  fontSize: '40px',
  cursor: 'pointer',
  color: 'white',
};

const chipStyle = {
  padding: '1.7rem 0rem 1.7rem 0.5rem',
  backgroundColor: 'primary.main',
};

const commitStyle = {
  marginBottom: 3,
  marginTop: 5,
};

const messageStyle = {
  width: '100%',
};

const formStyle = {
  marginBottom: '15px',
};
