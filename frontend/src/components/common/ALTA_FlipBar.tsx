import { Box, Button } from '@mui/material';
import { useState } from 'react';

export default function ALTA_FlipBar({ height, Front, Back }: Props) {
  const [flip, setFlip] = useState<number>(180);

  const fliper = (): void => setFlip(flip > 0 ? 0 : 180);

  return (
    <Box sx={wrapperStyle}>
      <Box sx={[frontStyle, { height }, { transform: `rotateX(${180 - flip}deg)` }]}>
        <Front fliper={fliper} />
      </Box>
      <Box sx={[backStyle, { height }, { transform: `rotateX(${0 - flip}deg)` }]}>
        <Back fliper={fliper} />
      </Box>
    </Box>
  );
}

type Props = {
  height: string;
  Front: ({ fliper }: { fliper: () => void }) => JSX.Element;
  Back: ({ fliper }: { fliper: () => void }) => JSX.Element;
};

const wrapperStyle = {
  position: 'relative',
  width: '100%',
  cursor: 'pointer',
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
