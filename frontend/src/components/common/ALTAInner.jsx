import { Box } from '@mui/material';

// inner 내부에 자식 요소들이 inner 바깥으로 나가지 않게 제한합니다.
// inner의 최대 너비는 1200px입니다.

// 사용방법
// <ALTAInner>children으로 사용하고 싶은 요소</ALTAInner>

export default function ALTAInner({ children }) {
  return (
    <Box className="ALTAInner" sx={ALTAInner_style}>
      {children}
    </Box>
  );
}

const ALTAInner_style = {
  maxWidth: '1200px',
  height: '100vh',
  margin: '0 auto',
  backgroundColor: 'inherit',
};
