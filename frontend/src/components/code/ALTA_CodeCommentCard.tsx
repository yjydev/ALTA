import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Avatar,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Link,
  TextField,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
  generateError,
  generateCheck,
  generateConfirm,
} from '../../modules/generateAlert';

import { toggleSolved, editReviewApi, deleteReviewApi } from '../../api/apis';
import { ReviewData } from '../../types/CodeBlockType';
import { CodeStore } from '../../context/CodeContext';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { displayAt } from '../../modules/displayAt';

export default function ALTA_CodeCommentCard({
  review,
}: {
  review: ReviewData;
}) {
  const navigate = useNavigate();
  const [isResolved, setisResolved] = useState<boolean>(review.completed);
  const { setCodeLine, user, code } = useContext(CodeStore);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [commentValue, setCommentValue] = useState<string>(review.comment);
  const { studyId, codeId } = JSON.parse(JSON.stringify(useLocation().state));
  const userData = localStorage.getItem('UserData');
  const profile = userData
    ? JSON.parse(userData)['profileUrl']
    : 'profile_default.png';

  const changeResolved = async () => {
    if (!(await checkLogin()).status) navigate('/');
    if (user !== code.writer)
      generateError('코드 작성자만 변경할 수 있습니다', '');
    else {
      try {
        await toggleSolved(review.reviewId, !review.completed);
        setisResolved(!isResolved);
      } catch (err: any) {
        generateError(
          '상태 변경에 실패하였습니다',
          `${err.response.data.message}`,
        );
      }
    }
  };

  const handleEditComment = async () => {
    if (!(await checkLogin()).status) navigate('/');
    if (commentValue === '') generateError('내용을 작성해주세요', '');
    else {
      try {
        await editReviewApi(review.reviewId, commentValue, review.codeNumber);
        setIsEdit(false);
        navigate('/study/code', { state: { studyId, codeId } });
      } catch (err: any) {
        generateError(`수정에 실패하였습니다`, `${err.response.data.message}`);
      }
    }
  };

  const handleDelComment = async () => {
    if (!(await checkLogin()).status) navigate('/');
    generateConfirm(
      '정말 삭제하시겠습니까?',
      '한 번 삭제하면 되돌릴 수 없습니다',
      '삭제 완료!',
      `${review.codeNumber} 에 대한 리뷰가 삭제되었습니다`,
      async () => delComment(),
    );
  };

  const delComment = async () => {
    try {
      await deleteReviewApi(review.reviewId);
      navigate('/study/code', { state: { studyId, codeId } });
    } catch (err: any) {
      generateError(
        '리뷰 삭제에 실패하였습니다',
        `${err.response.data.message}`,
      );
    }
  };

  const moveToLine = () => {
    setCodeLine(review.codeNumber);
    const lineSpan = document.getElementById(`codeLine-${review.codeNumber}`);
    if (lineSpan !== null) {
      lineSpan.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Box>
      <Paper style={{ margin: '30px 0' }}>
        <Grid container direction="row" px={2} py={1} columns={16}>
          <Grid item pt={2} md={1} sx={profileStyle}>
            <Avatar src={profile} />
          </Grid>
          <Grid item md={15}>
            <Grid sx={infoStyle}>
              <Box sx={editStyle}>
                <h4>{review.reviewerName}</h4>
                {user === review.reviewerName ? (
                  <>
                    {isEdit ? (
                      <>
                        <Button
                          disableRipple
                          sx={[btnStyle, cancelBtn]}
                          onClick={handleEditComment}
                        >
                          수정 완료
                        </Button>
                        <Button
                          disableRipple
                          onClick={() => {
                            setIsEdit(false);
                            setCommentValue(review.comment);
                          }}
                          sx={[btnStyle, cancelBtn]}
                        >
                          취소
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          startIcon={<EditIcon />}
                          sx={[btnStyle, editBtn]}
                          disableRipple
                          onClick={() => setIsEdit(true)}
                        />
                        <Button
                          startIcon={<DeleteForeverIcon />}
                          disableRipple
                          sx={btnStyle}
                          onClick={handleDelComment}
                        />
                      </>
                    )}
                  </>
                ) : null}
              </Box>
              <Typography sx={dateStyle}>
                {displayAt(review.commentDate)}
              </Typography>
            </Grid>
            <Grid sx={infoStyle}>
              <Grid container sx={commentStyle}>
                {isEdit ? (
                  <TextField
                    value={commentValue}
                    multiline
                    size="small"
                    sx={editCommentInput}
                    onChange={(e) => setCommentValue(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography sx={adornStyle}>
                            {`${review.codeNumber}번 라인 `}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <>
                    <Link
                      onClick={moveToLine}
                      sx={commentCodeLine}
                      underline="none"
                      mr={1}
                    >
                      {review['codeNumber']}번
                    </Link>
                    <Typography mb={2}>{review['comment']}</Typography>
                  </>
                )}
              </Grid>
              {isResolved ? (
                <Button onClick={changeResolved}>
                  <Typography sx={resolvedStyle}>해결됨</Typography>
                </Button>
              ) : (
                <Button onClick={changeResolved}>
                  <Typography sx={unresolvedStyle}> 미해결 </Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

const infoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

const dateStyle = {
  color: 'gray',
  paddingRight: '10px',
};

const editStyle = {
  display: 'flex',
};

const btnStyle = {
  'color': '#000000',
  '&:hover': {
    color: 'primary.main',
    backgroundColor: 'inherit',
  },
  'minWidth': '20px',
};

const editBtn = {
  paddingLeft: '16px',
  paddingRight: 0,
};

const cancelBtn = {
  paddingLeft: '16px',
  paddingRight: 1,
  paddingBottom: 0,
};

const profileStyle = {
  display: { xs: 'none', md: 'block' },
  minWidth: '2.5rem',
};

const resolvedStyle = {
  color: '#C6C6C6',
};

const unresolvedStyle = {
  color: 'primary.main',
};

const commentCodeLine = {
  color: 'primary.main',
  cursor: 'pointer',
};

const commentStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
};

const editCommentInput = {
  paddingBottom: 2,
  paddingLeft: 0,
  width: '70%',
};

const codeSelect = {
  alignItems: 'flex-end',
  paddingTop: '2px',
};

const adornStyle = {
  color: 'primary.main',
  fontWeight: 'bold',
};
