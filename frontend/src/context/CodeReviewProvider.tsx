import React, { useState } from 'react';
import { CodeReviewData, defaultCodeReviewData } from '../types/CodeBlockType';

type defaultValueType = {
  codeReview: CodeReviewData;
  setCodeReview: (newData: CodeReviewData) => void;
};

const defaultValue: defaultValueType = {
  codeReview: defaultCodeReviewData,
  setCodeReview: () => null,
};
export const CodeReviewStore = React.createContext(defaultValue);

type Props = {
  children: React.ReactNode;
};

export default function CodeReviewProvider({ children }: Props) {
  const [codeReview, setCodeReview] = useState<CodeReviewData>(
    defaultCodeReviewData,
  );
  const value = { codeReview, setCodeReview };
  return (
    <CodeReviewStore.Provider value={value}>
      {children}
    </CodeReviewStore.Provider>
  );
}
