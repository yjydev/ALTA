import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_ToOrganizeContents from '../components/organize/ALTA_ToOrganizeContents';

export default function ALTA_ToOrganize() {
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}

//template에 prop로 넘겨줄 컴포넌트
function Header() {
  return <ALTA_Header />;
}

function Contents() {
  return (
    <ALTA_Inner>
      <ALTA_ToOrganizeContents />
    </ALTA_Inner>
  );
}
