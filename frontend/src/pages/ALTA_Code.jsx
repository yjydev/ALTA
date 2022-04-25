import ALTA_CodeContents from '../components/code/ALTA_CodeContents';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Header from '../components/common/ALTA_Header';

export default function ALTA_Code() {
  const Header = () => <ALTA_Header></ALTA_Header>;
  const Contents = () => <ALTA_CodeContents />;
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
