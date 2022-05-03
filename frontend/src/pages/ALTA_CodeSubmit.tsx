import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_CodeSubmitContents from '../components/study/ALTA_CodeSubmitContents';
import ALTA_Header from '../components/common/ALTA_Header';

export default function ALTA_CodeSubmit() {
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
