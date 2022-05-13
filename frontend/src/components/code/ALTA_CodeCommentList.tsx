import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Box, TextField, Switch, InputAdornment } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { addReviewApi } from '../../api/apis';
import { CodeStore } from '../../context/CodeContext';
import { ReviewData } from '../../types/CodeBlockType';

import { generateCheck, generateError } from '../../modules/generateAlert';
import { checkLogin } from '../../modules/LoginTokenChecker';

import ALTA_CodeCommentCard from './ALTA_CodeCommentCard';

type ParamType = {
  codeId: string | undefined;
};

export default function ALTA_CodeCommentList() {
  const navigate = useNavigate();
  const { codeId } = useParams();
  const [isCompleted, setisCompleted] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [newReview, setNewReview] = useState<string>('');

  const { codeLine, reviews, getReview } = useContext(CodeStore);

  const reviews_data = isCompleted ? reviews : reviews?.filter((rev: ReviewData) => rev.completed === false);

  const getReviews = async (codeId: number) => {
    const status = await getReview(codeId);
    if (status === -1) navigate('/');
  };

  useEffect(() => {
    if (codeId) getReviews(parseInt(codeId));
  }, [isCompleted]);

  useEffect(() => {
    if (newReview !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newReview, codeLine]);

  const handleNewReview = async () => {
    if (!(await checkLogin()).status) navigate('/');
    if (codeId) {
      try {
        await addReviewApi(parseInt(codeId), newReview, codeLine);
        setNewReview('');
        generateCheck('리뷰 생성', `리뷰가 성공적으로 생성되었습니다`, () => {
          getReviews(parseInt(codeId));
        });
      } catch (err: any) {
        generateError('리뷰 생성에 실패하였습니다', `${err.response.data.message}`);
      }
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="baseline">
          <Grid item mr={4}>
            <Typography fontSize={40}>Comments</Typography>
          </Grid>
          <Grid item>
            <Switch checked={isCompleted} onChange={() => setisCompleted(!isCompleted)} name="isCompleted" />
            <Typography sx={{ display: 'inline-block' }}>전체 댓글 보기</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Box sx={addCommentStyle}>
          <Grid container sx={comment_wrapper} columns={17}>
            <Grid item xs={16}>
              <TextField
                id="outlined-multiline-static-comment"
                placeholder="리뷰를 입력해주세요"
                multiline
                rows={2}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={codeSelect}>
                      <Typography sx={adornStyle}>
                        {codeLine === 0 ? '코드를 선택해주세요.' : `${codeLine}번 라인`}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                value={newReview}
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleNewReview} disabled={isDisabled}>
                <AddCircleIcon style={addButton} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        {reviews_data?.map((review: ReviewData) => (
          <ALTA_CodeCommentCard key={review.reviewId} review={review} />
        ))}
      </Grid>
    </Grid>
  );
}

const addCommentStyle = {
  height: '7rem',
  marginTop: 4,
};

const addButton = {
  fontSize: '50',
};

const comment_wrapper = {
  justifyContent: 'center',
  alignItems: 'center',
};

const codeSelect = {
  alignItems: 'flex-end',
  paddingTop: '2px',
};

const adornStyle = {
  color: 'primary.main',
  fontWeight: 'bold',
};
