import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_CodeSubmitContents from '../components/code/ALTA_CodeSubmitContents';
import ALTA_Header from '../components/common/ALTA_Header';

export default function ALTA_CodeSubmit() {
  useEffect(() => {
    document.title = 'ALTA | 코드 제출';
  }, []);

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

function Header() {
  return <ALTA_Header />;
}

function Contents() {
  return (
    <ALTA_Inner>
      <ALTA_CodeSubmitContents />
    </ALTA_Inner>
  );
}
