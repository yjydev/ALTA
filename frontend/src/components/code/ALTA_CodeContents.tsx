import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Grid, Divider, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { deleteCodeApi } from '../../api/apis';
import { CodeStore } from '../../context/CodeContext';
import { generateError, generateConfirm } from '../../modules/generateAlert';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { displayAt } from '../../modules/displayAt';

import ALTA_Loading from '../common/ALTA_Loading';
import ALTA_CodeEditor from './ALTA_CodeEditor';
import ALTA_CodeBlock from '../common/ALTA_CodeBlock';
import ALTA_CodeTree from './ALTA_CodeTree';
import ALTA_CodeCommentList from './ALTA_CodeCommentList';

type ParamType = {
  studyId: string | undefined;
  codeId: string | undefined;
  problem: string | undefined;
};

export default function ALTA_CodeContents() {
  const navigate = useNavigate();
  const { studyId, codeId, problem } = useParams<ParamType>();
  const [loading, setLoading] = useState<boolean>(true);
  const { code, getCode, user, getCodeTree } = useContext(CodeStore);
  const [isCodeEdit, setIsCodeEdit] = useState(false);

  const handleDelete = async () => {
    if (!(await checkLogin()).status) navigate('/');
    generateConfirm(
      '정말 삭제하시겠습니까?',
      '한번 삭제하면 되돌릴 수 없습니다.',
      '코드가 삭제되었습니다.',
      `${code.fileName} 이(가) 성공적으로 삭제되었습니다`,
      async () => delCode(),
    );
  };

  const delCode = async () => {
    if (studyId && codeId) {
      try {
        await deleteCodeApi(parseInt(studyId), parseInt(codeId));
        goToDetail();
      } catch (err: any) {
        generateError('코드 삭제에 실패하였습니다', `${err.response.data.message}`);
      }
    }
  };

  const goToDetail = () => navigate(`/study/${studyId}/detail`);

  const goToresubmit = () => navigate(`/study/${studyId}/0/${problem}/${codeId}/code-submit`);

  useEffect(() => {
    setLoading(true);
    (async function () {
      if (studyId && codeId) {
        const [codeStatus, TreeStatus] = await Promise.all([
          getCode(parseInt(studyId), parseInt(codeId)),
          getCodeTree(parseInt(studyId)),
        ]);
        if (codeStatus.status === -1 || TreeStatus.status === -1) navigate('/');
        else if (codeStatus.status === -2) generateError('코드 정보를 불러오는데 실패하였습니다', '');
        else if (TreeStatus.status === -2) generateError('폴더 구조를 불러오는데 실패하였습니다', '');
        else setLoading(false);
      } else {
        navigate('/code/404-not-found');
      }
    })();
  }, [codeId]);

  return (
    <>
      {loading && <ALTA_Loading />}
      {!loading && (
        <Grid container sx={wrapper} spacing={8}>
          <Grid item sx={codeTree_wrapper} md={3}>
            <Box pt={4} pl={2}>
              <ALTA_CodeTree />
            </Box>
          </Grid>
          <Grid item md={9}>
            <Box pr={10}>
              <Grid container direction="column" rowGap={3}>
                <Grid item sx={codeBlock_wrapper}>
                  {isCodeEdit ? (
                    <ALTA_CodeEditor setIsCodeEdit={setIsCodeEdit} />
                  ) : (
                    <Grid container direction="column" spacing={5}>
                      <Grid item>
                        <Box pt={3} pb={3}>
                          <Box sx={titleStyle}>
                            <Button
                              startIcon={<ChevronLeftIcon />}
                              variant="contained"
                              sx={backBtn}
                              onClick={goToDetail}
                            >
                              Back
                            </Button>
                            {code.writer === user ? (
                              <Box>
                                <Button sx={reupBtn} variant="contained" onClick={goToresubmit}>
                                  재업로드
                                </Button>
                                <Button
                                  variant="contained"
                                  sx={editBtn}
                                  onClick={() => {
                                    setIsCodeEdit(true);
                                  }}
                                >
                                  수정
                                </Button>
                                <Button sx={delBtn} variant="contained" onClick={handleDelete}>
                                  삭제
                                </Button>
                              </Box>
                            ) : null}
                          </Box>
                          <Typography sx={problemStyle}>{problem}</Typography>
                          <Box sx={titleStyle}>
                            <Typography sx={codeTitleStyle}>{code.fileName}</Typography>
                            <Box>
                              <Typography sx={codeWritterStyle} align="right">
                                작성자 : {code.writer}
                              </Typography>
                              <Typography sx={dateStyle}>마지막 수정 : {displayAt(code.createDate)}</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Divider style={{ width: '100%' }} />
                      </Grid>
                      <Grid item id="code-block">
                        <ALTA_CodeBlock code={code.code} language={code.language} />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid item sx={codeComment_wrapper}>
                  <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
                  <ALTA_CodeCommentList />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const codeComment_wrapper = {
  padding: '10px',
};

const codeBlock_wrapper = {
  // maxWidth: '100vw',
};

const codeTree_wrapper = {
  display: { xs: 'none', md: 'block' },
};

const wrapper = {
  width: '100%',
};

const backBtn = {
  fontSize: '15px',
  marginBottom: '18px',
};

const editBtn = {
  'fontSize': '15px',
  'marginRight': ' 10px',
  'backgroundColor': 'secondary.main',
  '&:hover': {
    backgroundColor: '#AFA291',
  },
  'color': '#212121',
};

const delBtn = {
  'fontSize': '15px',
  'marginRight': ' 10px',
  'backgroundColor': 'error.main',
  'color': '#212121',
  '&:hover': {
    backgroundColor: '#A28080',
  },
};

const reupBtn = {
  fontSize: '15px',
  marginRight: ' 10px',
};

const titleStyle = {
  minWidth: '480px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const problemStyle = {
  fontSize: '20px',
};

const dateStyle = {
  fontSize: '16px',
  marginRight: '16px',
  color: 'gray',
  marginTop: '8px',
};

const codeTitleStyle = {
  fontSize: '50px',
};

const codeWritterStyle = {
  fontSize: '20px',
  marginRight: '16px',
  marginTop: '8px',
};
