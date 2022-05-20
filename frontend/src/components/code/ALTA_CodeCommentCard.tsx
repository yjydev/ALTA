import { useState, useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

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
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import { generateError, generateConfirm } from '../../modules/generateAlert';

import { toggleSolved, editReviewApi, deleteReviewApi } from '../../api/apis';
import { ReviewData } from '../../types';
import { CodeStore } from '../../context/CodeContext';
import { checkLogin } from '../../modules/LoginTokenChecker';
import { displayAt } from '../../modules/displayAt';
import defaultProfile from '../../images/user.webp';

type Props = {
  review: ReviewData;
  codeId: number;
};

export default function ALTA_CodeCommentCard({ review, codeId }: Props) {
  const navigate: NavigateFunction = useNavigate();
  const { setCodeLine, user, code, getReview } = useContext(CodeStore);
  const [isResolved, setisResolved] = useState<boolean>(review.completed);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [commentValue, setCommentValue] = useState<string>(review.comment);
  const profile: string = review.imageUrl ? review.imageUrl : defaultProfile;

  const changeResolved = async (): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    if (user !== code.writer && user !== review.reviewerName)
      generateError('변경 불가', '코드 작성자 혹은 리뷰 작성자만 변경할 수 있습니다');
    else {
      try {
        await toggleSolved(review.reviewId, !review.completed);
        setisResolved(!isResolved);
      } catch (err: any) {
        generateError('상태 변경에 실패하였습니다', `${err.response.data.message}`);
      }
    }
  };

  const handleEditComment = async (): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    if (commentValue === review.comment) generateError('변경 내역이 없습니다', '');
    else {
      if (commentValue === '') generateError('내용을 작성해주세요', '');
      else {
        try {
          await editReviewApi(review.reviewId, commentValue, review.codeNumber);
          setIsEdit(false);
          getReview(codeId);
        } catch (err: any) {
          generateError(`수정에 실패하였습니다`, `${err.response.data.message}`);
        }
      }
    }
  };

  const handleDelComment = async (): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    generateConfirm(
      '정말 삭제하시겠습니까?',
      '한 번 삭제하면 되돌릴 수 없습니다',
      '삭제 완료!',
      `${review.codeNumber} 번 라인에 대한 리뷰가 삭제되었습니다`,
      async (): Promise<void> => delComment(),
    );
  };

  const delComment = async (): Promise<void> => {
    try {
      await deleteReviewApi(review.reviewId);
      getReview(codeId);
    } catch (err: any) {
      generateError('리뷰 삭제에 실패하였습니다', `${err.response.data.message}`);
    }
  };

  const moveToLine = (): void => {
    setCodeLine(review.codeNumber);
    const lineSpan: HTMLElement | null = document.getElementById(`codeLine-${review.codeNumber}`);
    if (lineSpan !== null) {
      lineSpan.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Box sx={codeCommentBoxStyle}>
      <Paper style={paperBoxStyle}>
        {user === review.reviewerName ? (
          <Button startIcon={<CloseIcon />} disableRipple sx={delBtnStyle} onClick={handleDelComment} />
        ) : (
          <></>
        )}
        <Grid container direction="row" sx={infoGridStyle} columns={16}>
          <Grid item md={1} sx={profileStyle}>
            <Avatar src={profile} />
          </Grid>
          <Grid item md={15}>
            <Grid sx={infoStyle}>
              <Box sx={editStyle}>
                <p>{review.reviewerName}</p>
                {user === review.reviewerName ? (
                  <>
                    {isEdit ? (
                      <Box sx={editBtnGroupStyle}>
                        <Button disableRipple sx={[btnStyle, completeBtnStyle]} onClick={handleEditComment}>
                          수정 완료
                        </Button>
                        <Button
                          disableRipple
                          onClick={(): void => {
                            setIsEdit(false);
                            setCommentValue(review.comment);
                          }}
                          sx={[btnStyle, cancelBtnStyle]}
                        >
                          취소
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={editBtnGroupStyle}>
                        <Button
                          startIcon={<EditIcon />}
                          sx={[btnStyle, editBtn]}
                          disableRipple
                          onClick={(): void => setIsEdit(true)}
                        />
                      </Box>
                    )}
                  </>
                ) : null}
              </Box>
              <Typography sx={dateStyle}>{displayAt(review.commentDate)}</Typography>
            </Grid>
            <Grid sx={infoStyle}>
              <Grid container sx={commentStyle}>
                {isEdit ? (
                  <TextField
                    value={commentValue}
                    multiline
                    size="small"
                    sx={editCommentInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCommentValue(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <>
                          {review.codeNumber !== 0 ? (
                            <InputAdornment position="start">
                              <Typography sx={adornStyle}>{`${review.codeNumber}번 라인 `}</Typography>
                            </InputAdornment>
                          ) : (
                            ''
                          )}
                        </>
                      ),
                    }}
                  />
                ) : (
                  <>
                    {review.codeNumber !== 0 ? (
                      <Link onClick={moveToLine} sx={commentCodeLineStyle}>
                        {review['codeNumber']}번
                      </Link>
                    ) : null}
                    <Typography sx={commentContentStyle}>{review['comment']}</Typography>
                  </>
                )}
              </Grid>
              {isResolved ? (
                <IconButton onClick={changeResolved}>{<CheckCircleRoundedIcon sx={resolvedStyle} />}</IconButton>
              ) : (
                <IconButton onClick={changeResolved}>
                  {<CheckCircleOutlineRoundedIcon sx={unresolvedStyle} />}
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

const codeCommentBoxStyle = {
  position: 'relative',
  marginBottom: 3,
};

const paperBoxStyle = {
  margin: '30px 0',
};

const infoGridStyle = {
  paddingLeft: 2,
  paddingRight: 6,
};

const delBtnStyle = {
  color: '#212121',
  position: 'absolute',
  right: '10px',
  top: '22px',
  padding: 0,
  minWidth: '10px',
};

const infoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

const dateStyle = {
  color: 'gray',
  marginRight: '10px',
};

const editStyle = {
  display: 'flex',
};

const editBtnGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '3px',
};

const btnStyle = {
  minWidth: '20px',
  height: '35px',
};

const editBtn = {
  marginLeft: '10px',
  color: '#212121',
};

const completeBtnStyle = {
  marginLeft: '5px',
  marginRight: 1,
};

const cancelBtnStyle = {
  color: 'error.main',
};

const profileStyle = {
  display: { xs: 'none', md: 'block' },
  minWidth: '2.5rem',
  paddingTop: 2,
};

const resolvedStyle = {
  color: 'primary.main',
};

const unresolvedStyle = {
  color: 'gray',
};

const commentCodeLineStyle = {
  color: 'primary.main',
  cursor: 'pointer',
  marginRight: 1,
  textDecorationLine: 'none',
};

const commentStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
};

const commentContentStyle = {
  marginBottom: 2,
};

const editCommentInput = {
  paddingBottom: 2,
  paddingLeft: 0,
  width: '70%',
};

const adornStyle = {
  color: 'primary.main',
  fontWeight: 'bold',
};
