import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkLogin } from '../modules/LoginTokenChecker';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_MypageContents from '../components/mypage/ALTA_MypageContents';

export default function ALTA_Mypage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'ALTA | 마이페이지';

    checkLogin(() => navigate('/'));
  }, []);

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

function Header() {
  return <ALTA_Header />;
}

function Contents() {
  return (
    <ALTA_Inner>
      <ALTA_MypageContents />
    </ALTA_Inner>
  );
}
