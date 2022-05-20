import React, { useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import { Box, Grid, Typography, Divider, Button, TextField, InputLabel } from '@mui/material';

import MonacoEditor from '@uiw/react-monacoeditor';

import { generateCheck, generateError, generateTimer } from '../../modules/generateAlert';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { CodeStore } from '../../context/CodeContext';
import { editCodeApi } from '../../api/apis';

import ALTA_Dialog from '../common/ALTA_Dialog';

type Props = {
  setIsCodeEdit: Dispatch<SetStateAction<boolean>>;
  studyId: string | undefined;
  codeId: string | undefined;
  problem: string | undefined;
};

export default function ALTA_CodeEditor({ setIsCodeEdit, studyId, codeId, problem }: Props) {
  const navigate: NavigateFunction = useNavigate();
  const { code } = useContext(CodeStore);

  const [fileName, setFileName] = useState<string>(`${code.fileName}`);
  const [content, setContent] = useState<string>(`${code.code}`);
  const [open, setOpen] = useState<boolean>(false);
  const [commitMessage, setCommitMessage] = useState<string>('');

  const handleEditBtn = (): void => {
    if (content === code.code && fileName === code.fileName) generateError('수정 내역이 없습니다.', '');
    else setOpen(true);
  };

  const handleEditCode = async (): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    if (studyId && codeId && problem) {
      generateTimer('잠시 기다려 주세요', `코드를 수정중입니다`);
      try {
        await editCodeApi(parseInt(studyId), parseInt(codeId), commitMessage, fileName, content);
        setIsCodeEdit(false);
        generateCheck('수정 완료', `${fileName} 을(를) 성공적으로 수정하였습니다`, (): void =>
          navigate(`/study/${studyId}/${problem}/code/${codeId}/${code.language}`),
        );
      } catch (err: any) {
        generateError(`수정에 실패하였습니다`, `${err.response.data.message}`);
      }
      setOpen(false);
    }
  };

  useEffect((): void => {
    setCommitMessage(`Update ${fileName}`);
  }, [fileName]);

  return (
    <>
      <ALTA_Dialog open={open} setOpen={setOpen} title="커밋 메세지" handleComplete={handleEditCode}>
        <Box sx={commitStyle}>
          <InputLabel htmlFor="code-edit">커밋메세지 :</InputLabel>
          <TextField
            id="code-edit"
            variant="standard"
            placeholder="커밋 메세지를 입력해주세요"
            value={commitMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCommitMessage(e.target.value)}
            sx={messageStyle}
          />
        </Box>
      </ALTA_Dialog>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Box sx={codeEditorHeaderStyle}>
            <Box sx={titleStyle}>
              <Typography sx={problemStyle}>{problem}</Typography>
              <Box>
                <Button onClick={handleEditBtn} variant="contained" sx={editBtnStyle}>
                  수정 완료
                </Button>
                <Button sx={cancelBtnStyle} onClick={(): void => setIsCodeEdit(false)} variant="contained">
                  취소
                </Button>
              </Box>
            </Box>
            <Box sx={titleStyle}>
              <TextField
                sx={titleInputStyle}
                defaultValue={code.fileName}
                inputProps={{ style: { fontSize: 35 } }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFileName(e.target.value)}
              />
              <Typography sx={codeWritterStyle}>작성자 : {code.writer}</Typography>
            </Box>
          </Box>
          <Divider style={{ width: '100%' }} />
        </Grid>
        <Grid item>
          <Box sx={codeBlockStyle} className="codeBlock">
            <MonacoEditor
              id="code-monaco-editor"
              language={code.language.toLowerCase()}
              value={code.code}
              options={{
                theme: 'vs-dark',
                smoothScrolling: true,
              }}
              onChange={(evn: string): void => {
                setContent(evn);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const codeEditorHeaderStyle = {
  paddingY: 3,
};

const codeBlockStyle = {
  height: '33rem',
  overflowY: 'scroll',
};

const commitStyle = {
  marginBottom: 3,
  marginTop: 5,
};

const messageStyle = {
  width: '100%',
};

const titleStyle = {
  minWidth: '480px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

const editBtnStyle = {
  marginRight: 2,
};

const cancelBtnStyle = {
  'backgroundColor': 'error.main',
  '&:hover': {
    backgroundColor: '#A28080',
  },
  'marginRight': 2,
};

const titleInputStyle = {
  width: '30rem',
};

const problemStyle = {
  fontSize: '20px',
  marginBottom: 3,
  marginTop: 2,
};

const codeWritterStyle = {
  fontSize: '20px',
  marginRight: '16px',
  textAlign: 'right',
};
