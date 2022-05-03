import { useParams } from 'react-router-dom';

import ALTA_CodeContents from '../components/code/ALTA_CodeContents';

import ALTA_Template from '../components/common/ALTA_Template';
import ALTA_Header from '../components/common/ALTA_Header';

import CodeReviewContext from '../context/CodeReviewContext';

export default function ALTA_Code() {
  const param = useParams();
  const Header = () => <ALTA_Header />;
  const Contents = () => (
    <CodeReviewContext>
      <ALTA_CodeContents param={param} />
    </CodeReviewContext>
  );
  return <ALTA_Template header={<Header />} contents={<Contents />} />;
}
