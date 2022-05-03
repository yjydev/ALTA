import React, { useState } from 'react';
import { CodeReviewData, defaultCodeReviewData } from '../types/CodeBlockType';

type defaultValueType = {
  codeReview: CodeReviewData;
  setCodeReview: (newData: CodeReviewData) => void;
  codeLine: number;
  setCodeLine: (newLine: number) => void;
};

const defaultValue: defaultValueType = {
  codeReview: defaultCodeReviewData,
  setCodeReview: () => null,
  codeLine: 0,
  setCodeLine: () => null,
};
export const CodeReviewStore = React.createContext(defaultValue);

type Props = {
  children: React.ReactNode;
};

export default function CodeReviewContext({ children }: Props) {
  const [codeReview, setCodeReview] = useState<CodeReviewData>(
    defaultCodeReviewData,
  );
  const [codeLine, setCodeLine] = useState<number>(0);

  const value = { codeReview, setCodeReview, codeLine, setCodeLine };
  return (
    <CodeReviewStore.Provider value={value}>
      {children}
    </CodeReviewStore.Provider>
  );
}
