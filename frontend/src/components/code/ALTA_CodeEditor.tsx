import React, { useState, Dispatch, SetStateAction } from 'react';
import { putRequest } from '../../api/request';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
} from '@mui/material';

import MonacoEditor from '@uiw/react-monacoeditor';

export default function ALTA_CodeEditor({
  code,
  language,
  setIsCodeEdit,
}: {
  code: string;
  language: string;
  setIsCodeEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const problemName = 'Chart';

  const [editData, setEditData] = useState<editDataType>({
    file_name: `${problemName}`,
    content: `${code}`,
  });

  const handleEditData = (val: string, key: string) => {
    const newData: editDataType = { ...editData };
    newData[key] = String(val);
    setEditData(newData);
  };

  const handleEditCode = async () => {
    // console.log(editData);
    try {
      const res = await putRequest(
        '/api/study/37/code/26',
        JSON.stringify(editData),
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Box pt={3} pb={3}>
          <Box sx={titleStyle}>
            <Typography sx={problemStyle}>2021.04.13 회문</Typography>
            <Box>
              <Button onClick={handleEditCode}>수정 완료</Button>
              <Button onClick={() => setIsCodeEdit(false)}>취소</Button>
            </Box>
          </Box>
          <Box sx={titleStyle}>
            <TextField
              defaultValue={problemName}
              style={{
                width: '30rem',
              }}
              inputProps={{ style: { fontSize: 35 } }}
              onChange={(e) => handleEditData(e.target.value, 'file_name')}
            />
            <Typography sx={codeWritterStyle} align="right">
              작성자 : user
            </Typography>
          </Box>
        </Box>
        <Divider style={{ width: '100%' }} />
      </Grid>
      <Grid item>
        <Box sx={codeBlockStyle} className="codeBlock">
          <MonacoEditor
            language={language}
            value={code}
            options={{
              theme: 'vs-dark',
              smoothScrolling: true,
            }}
            onChange={(evn) => {
              handleEditData(evn, 'content');
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

const codeBlockStyle = {
  height: '33rem',
  overflowY: 'scroll',
};

const titleStyle = {
  minWidth: '480px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

const problemStyle = {
  fontSize: '20px',
};

const codeWritterStyle = {
  fontSize: '20px',
  marginRight: '16px',
};

type editDataType = {
  [index: string]: string;
  file_name: string;
  content: string;
};
