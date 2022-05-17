import styled from '@emotion/styled';
import { useEffect } from 'react';

import CodeContext from '../context/CodeContext';

import ALTA_CodeContents from '../components/code/ALTA_CodeContents';

export default function ALTA_Code() {
  useEffect(() => {
    document.title = 'ALTA | 코드 상세보기';
  }, []);
  return (
    <CodeContext>
      <Div>
        <ALTA_CodeContents />
      </Div>
    </CodeContext>
  );
}

const Div = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
