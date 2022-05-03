import { useParams } from 'react-router-dom';

import ALTA_CodeContents from '../components/code/ALTA_CodeContents';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Header from '../components/common/ALTA_Header';

import CodeReviewProvider from '../context/CodeReviewProvider';

export default function ALTA_Code() {
  const param = useParams();
  const Header = () => <ALTA_Header />;
  const Contents = () => (
    <CodeReviewProvider>
      <ALTA_CodeContents param={param} />
    </CodeReviewProvider>
  );
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
