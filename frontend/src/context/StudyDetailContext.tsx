import React, { useState } from 'react';
import { Member, StudyData } from '../types/StudyType';
import { ContextProps } from '../types/ContextPropsType';
import { editScheduleApi, studyDetailDataApi } from '../api/apis';
import { checkLogin } from '../modules/LoginTokenChecker';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  maxPeople: 0,
  setMaxPeople: () => null,
  members: [],
  setMembers: () => null,
  studyData: [],
  setStudyData: () => null,
  getStudyDetail: () => null,
  editSchedule: () => null,
};
export const StudyDetailStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function StudyDetailProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [studyData, setStudyData] = useState<StudyData[]>([]);
  const [maxPeople, setMaxPeople] = useState<number>(0);

  const getStudyDetail = async (studyId: number) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };

    try {
      const response = await studyDetailDataApi(studyId);

      setStudyData(response.readme);
      return { status: 1, message: 'success get study detail data' };
    } catch (err) {
      return { status: -2, message: 'fail get study detail data' };
    }
  };

  const editSchedule = async (
    studyId: number,
    scheduleId: number,
    startDate: string,
    endDate: string,
  ) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };
    try {
      await editScheduleApi(studyId, scheduleId, startDate, endDate);
      await getStudyDetail(studyId);
      return { status: 1, message: 'success edit schedule' };
    } catch (err) {
      return { status: -2, message: 'fail get schedule' };
    }
  };

  const value = {
    members,
    setMembers,
    studyData,
    setStudyData,
    maxPeople,
    setMaxPeople,
    getStudyDetail,
    editSchedule,
  };
  return (
    <StudyDetailStore.Provider value={value}>
      {children}
    </StudyDetailStore.Provider>
  );
}
//Context 기본값 타입
type defaultValueType = {
  maxPeople: number;
  setMaxPeople: (newData: number) => void;
  members: Member[];
  setMembers: (newData: Member[]) => void;
  studyData: StudyData[];
  setStudyData: (newData: StudyData[]) => void;
  getStudyDetail: (studyId: number) => any;
  editSchedule: (
    studyId: number,
    scheduleId: number,
    startDate: string,
    endDate: string,
  ) => any;
};
