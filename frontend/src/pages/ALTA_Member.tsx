import { useEffect } from 'react';
import MemberContext from '../context/MemberContext';

import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_MemberContents from '../components/member/ALTA_MemberContents';

export default function ALTA_Member() {
  useEffect(() => {
    document.title = 'ALTA | 멤버 관리';
  }, []);

  return (
    <MemberContext>
      <ALTA_Inner>
        <ALTA_MemberContents />
      </ALTA_Inner>
    </MemberContext>
  );
}
