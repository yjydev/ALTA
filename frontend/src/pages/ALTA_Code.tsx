import styled from '@emotion/styled';
import { useEffect } from 'react';

import CodeContext from '../context/CodeContext';

import ALTA_CodeContents from '../components/code/ALTA_CodeContents';
import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Header from '../components/common/ALTA_Header';

export default function ALTA_Code() {
  useEffect(() => {
    document.title = 'ALTA | 코드 상세보기';
  }, []);
  const Header = () => <ALTA_Header />;
  const Contents = () => (
    <CodeContext>
      <Div>
        <ALTA_CodeContents />
      </Div>
    </CodeContext>
  );
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

const Div = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
