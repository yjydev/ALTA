import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkLogin } from '../modules/LoginTokenChecker';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_CodeSubmitContents from '../components/code/ALTA_CodeSubmitContents';
import ALTA_Header from '../components/common/ALTA_Header';

export default function ALTA_CodeSubmit() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'ALTA | 코드 제출';

    (async function () {
      await checkLogin(() => navigate('/'));
    })();
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
