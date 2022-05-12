import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import StudyDetailContext from '../context/StudyDetailContext';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_StudyDetailContents from '../components/study/ALTA_StudyDetailContents';

export default function ALTA_StudyDetail() {
  useEffect(() => {
    document.title = 'ALTA | 스터디 관리';
  }, []);

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

//template에 prop로 넘겨줄 컴포넌트
function Header() {
  return <ALTA_Header />;
}

function Contents() {
  //useLocation type 오류로 인한 임시 방편
  const studyId = JSON.parse(JSON.stringify(useLocation().state)).studyId;
  return (
    <StudyDetailContext>
      <ALTA_StudyDetailContents studyId={studyId} />
    </StudyDetailContext>
  );
}
