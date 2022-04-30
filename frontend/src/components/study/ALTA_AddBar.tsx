import { Box, Button } from '@mui/material';
import styled from '@emotion/styled';
import React, { useState } from 'react';

export default function ALTA_AddBar({ height, front, back }: Props) {
  const [flip, setFlip] = useState<number>(180);

  const filpBar = () => setFlip(flip > 0 ? 0 : 180);

  return (
    <Box sx={wrapper}>
      <Box sx={[frontStyle, { transform: `rotateX(${180 - flip}deg)` }]}>
        <PlainBtn onClick={filpBar}>
          <Box sx={[addBtnStyle, { height }]}>{front}</Box>
        </PlainBtn>
      </Box>
      <Box
        sx={[backStyle, { height }, { transform: `rotateX(${0 - flip}deg)` }]}
      >
        {back}
        <Button sx={cancelBtnStyle} onClick={filpBar}>
          취소
        </Button>
      </Box>
    </Box>
  );
}

type Props = {
  height: string;
  front: React.ReactNode;
  back: React.ReactNode;
};

const wrapper = {
  position: 'relative',
  width: '100%',
};

const frontStyle = {
  width: '100%',
  height: 'inherit',
  position: 'absolute',
  transition: 'transform 0.5s',
  backfaceVisibility: 'hidden',
};

const backStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 'inherit',
  position: 'absolute',
  transition: 'transform 0.5s',
  backfaceVisibility: 'hidden',
  boxSizing: 'border-box',
  border: '3px solid #d9cab3',
};

const addBtnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const cancelBtnStyle = {
  position: 'absolute',
  right: 20,
  color: '#212121',
};

const PlainBtn = styled.button`
  all: unset;
  width: 100%;
  &:active {
    transform: scale(0.99);
  }
  background-color: lightgray;
  &:hover {
    background-color: gray;
  }
  transition: background-color 0.3s;
`;
