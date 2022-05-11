import React, { useState } from 'react';
import { Member, StudyData } from '../types/StudyType';
import { ContextProps } from '../types/ContextPropsType';
import {
  editScheduleApi,
  memberListApi,
  studyDetailDataApi,
} from '../api/apis';
import { checkLogin } from '../modules/LoginTokenChecker';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  members: [],
  studyData: [],
  maxPeople: 0,
  isLeader: false,
  getStudyDetail: () => null,
  getStudyMembers: () => null,
  editSchedule: () => null,
};
export const StudyDetailStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function StudyDetailProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [studyData, setStudyData] = useState<StudyData[]>([]);
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [isLeader, setIsLeader] = useState<boolean>(false);

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

  const getStudyMembers = async (studyId: number) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };

    try {
      const response = await memberListApi(studyId);

      //최대 인원 수까지 빈 멤버 추가
      const tmpMember = [...response.members];
      while (tmpMember.length < response.studyMaxPeople)
        tmpMember.push({
          nickname: '',
          email: '',
          state: '',
          position: '',
          resistrationData: '',
        });

      setMembers(tmpMember);
      setMaxPeople(response.studyMaxPeople);
      setIsLeader(response.isLeader);
      return { status: 1, message: 'success get member data' };
    } catch (err) {
      return { status: -2, message: 'fail get member data' };
    }
  };

  const editSchedule = async (
    studyId: number,
    scheduleId: number,
    dateString: string,
  ) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status)
      return { status: -1, message: 'login token error' };
    try {
      await editScheduleApi(studyId, scheduleId, dateString);
      await getStudyDetail(studyId);
      return { status: 1, message: 'success edit schedule' };
    } catch (err) {
      return { status: -2, message: 'fail get schedule' };
    }
  };

  const value = {
    members,
    studyData,
    maxPeople,
    isLeader,
    getStudyDetail,
    getStudyMembers,
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
  members: Member[];
  studyData: StudyData[];
  maxPeople: number;
  isLeader: boolean;
  getStudyDetail: (studyId: number) => any;
  getStudyMembers: (studyId: number) => any;
  editSchedule: (
    studyId: number,
    scheduleId: number,
    dateString: string,
  ) => any;
};
