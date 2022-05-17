import { useEffect } from 'react';

import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_MypageContents from '../components/mypage/ALTA_MypageContents';

export default function ALTA_Mypage() {
  useEffect(() => {
    document.title = 'ALTA | 마이페이지';
  }, []);

  return (
    <ALTA_Inner>
      <ALTA_MypageContents />
    </ALTA_Inner>
  );
}
