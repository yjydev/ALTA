import { useState } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';

import { Box, Button, TextField } from '@mui/material';
import styled from '@emotion/styled';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { blackColor } from '../../modules/colorChart';
import { generateError } from '../../modules/generateAlert';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { editCodeApi, submitCodeApi } from '../../api/apis';

import ALTA_Tooltip from '../common/ALTA_Tooltip';
import ALTA_InputItem from '../common/ALTA_InputItem';
import ALTA_CodeBlock from '../common/ALTA_CodeBlock';

type ParamType = {
  problemId: string | undefined;
  studyId: string | undefined;
  codeId: string | undefined;
  problem: string | undefined;
};

export default function ALTA_CodeSubmitContents() {
  const navigate: NavigateFunction = useNavigate();

  const { problemId, studyId, codeId, problem } = useParams<ParamType>();

  const [commitMessage, setCommitMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [code, setCode] = useState<string>('코드를 업로드 해주세요.');

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = e.target.files;
    if (files) {
      const tmp: string[] = files[0].name.split('.');
      setFileName(tmp.slice(0, tmp.length - 1).join(''));

      const reader: FileReader = new FileReader();

      reader.onload = (): void => setCode(String(reader.result));
      reader.readAsText(files[0]);
    }
  };

  const goStudyDetail = (): void => navigate(`/study/${studyId}/detail`);
  const goCodeDetail = (): void => navigate(`/study/${studyId}/${problem}/code/${codeId}`);

  const summitCode = async (): Promise<void> => {
    if (code === '코드를 업로드 해주세요.') {
      generateError('코드를 업로드 해주세요', '');
      return;
    }

    if (!commitMessage) {
      generateError('커밋 메세지가 없습니다', '');
      return;
    }

    if (!(await checkLogin())) navigate('/');

    if (problemId && problemId !== '0') {
      if (studyId) {
        await submitCodeApi(parseInt(studyId), parseInt(problemId), commitMessage, fileName, code);
        goStudyDetail();
      }
    } else {
      if (codeId && studyId) {
        await editCodeApi(parseInt(studyId), parseInt(codeId), commitMessage, fileName, code);
        goCodeDetail();
      }
    }
  };

  const handleCancel = (): void => {
    if (problemId && problemId !== '0') goStudyDetail();
    else goCodeDetail();
  };

  return (
    <Box sx={wrapperStyle}>
      <ALTA_InputItem label="커밋 메세지" focused={false} focusHandler={(): null => null}>
        <TextField
          id="스터디 이름"
          variant="standard"
          placeholder="커밋 메세지를 입력해주세요"
          value={commitMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCommitMessage(e.target.value)}
          sx={{ width: '100%' }}
        />
      </ALTA_InputItem>
      <ALTA_InputItem label="코드 업로드" focused={false} focusHandler={(): null => null}>
        <FileInput id="file" type="file" onChange={uploadFile} />
        <ALTA_Tooltip title="PC에서 파일 찾기">
          <Button variant="contained" sx={uploadBtnStyle}>
            <Label htmlFor="file">
              <Box sx={uploadBtnStyle}>
                <AddCircleIcon sx={uploadIconStyle} />
              </Box>
            </Label>
          </Button>
        </ALTA_Tooltip>
      </ALTA_InputItem>
      <ALTA_CodeBlock code={code} language="javascript" />
      <Box sx={{ marginTop: 10, textAlign: 'right' }}>
        <Button variant="contained" sx={btnStyle} onClick={summitCode}>
          제 출
        </Button>
        <Button variant="contained" color="error" sx={btnStyle} onClick={handleCancel}>
          취 소
        </Button>
      </Box>
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

const uploadIconStyle = {
  color: blackColor,
  opacity: '0.5',
  fontSize: '25px',
};

const submitBtnGroupStyle = {
  textAlign: 'right',
};

const btnStyle = {
  width: '100px',
  color: '#fff',
  fontSize: '18px',
  marginLeft: '20px',
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
