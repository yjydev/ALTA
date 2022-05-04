import React, { useState } from 'react';
import { ReviewData, CodeData, defaultCodeData } from '../types/CodeBlockType';

type defaultValueType = {
  code: CodeData;
  setCode: (newCode: CodeData) => void;
  reviews: ReviewData[];
  setReviews: (newReview: ReviewData[]) => void;
  codeLine: number;
  setCodeLine: (newLine: number) => void;
};

const defaultValue: defaultValueType = {
  code: defaultCodeData,
  setCode: () => null,
  reviews: [],
  setReviews: () => null,
  codeLine: 0,
  setCodeLine: () => null,
};
export const CodeReviewStore = React.createContext(defaultValue);

type Props = {
  children: React.ReactNode;
};

export default function CodeReviewContext({ children }: Props) {
  const [code, setCode] = useState<CodeData>(defaultCodeData);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [codeLine, setCodeLine] = useState<number>(0);

  const value = { code, reviews, setCode, setReviews, codeLine, setCodeLine };
  return (
    <CodeReviewStore.Provider value={value}>
      {children}
    </CodeReviewStore.Provider>
  );
}
