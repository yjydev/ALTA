import { useEffect } from 'react';

import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_CodeSubmitContents from '../components/code/ALTA_CodeSubmitContents';

export default function ALTA_CodeSubmit() {
  useEffect(() => {
    document.title = 'ALTA | 코드 제출';
  }, []);

  return (
    <ALTA_Inner>
      <ALTA_CodeSubmitContents />
    </ALTA_Inner>
  );
}
