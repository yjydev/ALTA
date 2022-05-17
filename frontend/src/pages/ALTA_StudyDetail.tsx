import { useEffect } from 'react';

import StudyDetailContext from '../context/StudyDetailContext';

import ALTA_StudyDetailContents from '../components/study/ALTA_StudyDetailContents';

export default function ALTA_StudyDetail() {
  useEffect(() => {
    document.title = 'ALTA | 스터디 관리';
  }, []);

  return (
    <StudyDetailContext>
      <ALTA_StudyDetailContents />
    </StudyDetailContext>
  );
}
