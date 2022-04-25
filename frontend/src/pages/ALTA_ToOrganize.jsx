import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Inner from '../components/common/ALTA_Inner';
import ALTA_Header from '../components/common/ALTA_Header';
import ALTA_ToOrganizeContents from '../components/organize/ALTA_ToOrganizeContents';

export default function ALTA_ToOrganize() {
  const Header = () => <ALTA_Header></ALTA_Header>;
  const Contents = () => (
    <ALTA_Inner>
      <ALTA_ToOrganizeContents />
    </ALTA_Inner>
  );

  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
