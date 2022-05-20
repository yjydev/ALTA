import { useState, useContext, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import { Grid, Typography, Box, TextField, Switch, InputAdornment } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { addReviewApi } from '../../api/apis';
import { CodeStore } from '../../context/CodeContext';
import { ReviewData, ContextPromiseType } from '../../types';

import { generateCheck, generateError } from '../../modules/generateAlert';
import { checkLogin } from '../../modules/LoginTokenChecker';

import ALTA_CodeCommentCard from './ALTA_CodeCommentCard';

type Props = {
  codeId: number;
};

export default function ALTA_CodeCommentList({ codeId }: Props) {
  const navigate: NavigateFunction = useNavigate();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [newReview, setNewReview] = useState<string>('');

  const { codeLine, reviews, getReview, isCompleted, setIsCompleted } = useContext(CodeStore);

  useEffect((): void => {
    getReview(codeId);
  }, [isCompleted]);

  useEffect((): void => {
    if (newReview !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newReview, codeLine]);

  const handleNewReview = async (): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    try {
      await addReviewApi(codeId, newReview, codeLine);
      setNewReview('');
      generateCheck('리뷰 생성', `리뷰가 성공적으로 생성되었습니다`, (): void => getReview(codeId));
    } catch (err: any) {
      generateError('리뷰 생성에 실패하였습니다', `${err.response.data.message}`);
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="baseline">
          <Grid item sx={codeCommentGridStyle}>
            <Typography sx={codeCommentTitleStyle}>Comments</Typography>
          </Grid>
          <Grid item>
            <Switch checked={isCompleted} onChange={(): void => setIsCompleted(!isCompleted)} name="isCompleted" />
            <Typography sx={codeCommentToggleTitleStyle}>전체 댓글 보기</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Box sx={addCommentStyle}>
          <Grid container sx={commentGridStyle} columns={17}>
            <Grid item xs={16}>
              <TextField
                id="outlined-multiline-static-comment"
                placeholder="리뷰를 입력해주세요"
                multiline
                rows={2}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={codeSelectStyle}>
                      <Typography sx={adornStyle}>
                        {codeLine === 0 ? '코드를 선택해주세요.' : `${codeLine}번 라인`}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                value={newReview}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setNewReview(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleNewReview} disabled={isDisabled}>
                <AddCircleIcon style={addButtonStyle} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        {reviews.map(
          (review: ReviewData): JSX.Element => (
            <ALTA_CodeCommentCard key={review.reviewId} review={review} codeId={codeId} />
          ),
        )}
      </Grid>
    </Grid>
  );
}

const codeCommentGridStyle = {
  marginRight: 4,
};

const codeCommentTitleStyle = {
  fontSize: 40,
};

const codeCommentToggleTitleStyle = {
  display: 'inline-block',
};

const addCommentStyle = {
  height: '7rem',
  marginTop: 4,
};

const addButtonStyle = {
  fontSize: '50',
};

const commentGridStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const codeSelectStyle = {
  alignItems: 'flex-end',
  paddingTop: '2px',
};

const adornStyle = {
  color: 'primary.main',
  fontWeight: 'bold',
};
