import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

import { ContextProps as Props } from '../../types';

export default function ALTA_StudyMembers({ children }: Props) {
  const [visibility, setVisibility] = useState<boolean>(true);

  useEffect(() => {
    const currentWidth = window.innerWidth;

    setVisibility(currentWidth < 1700);
    window.addEventListener(
      'resize',
      throttle((e) => {
        setVisibility(e.target.innerWidth < 1700);
      }, 200),
    );
  });

  return (
    <Box className="studyMembers" sx={[wrapperStyle, visibility && wapperHideStyle]}>
      {children}
    </Box>
  );
}

const wrapperStyle = {
  width: '80%',
  margin: '0 auto',
  padding: '10px',
  paddingBottom: '0.1px',
  boxSizing: 'border-box',
  backgroundColor: '#d9cab3',
};

const wapperHideStyle = {
  display: 'none',
};
