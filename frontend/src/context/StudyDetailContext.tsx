import React, { useState } from 'react';
import { Member, TableData } from '../types/StudyType';
import { ContextProps } from '../types/ContextPropsType';
import {
  editNoticeContentApi,
  editScheduleApi,
  memberListApi,
  noticeContentApi,
  studyDetailDataApi,
} from '../api/apis';
import { checkLogin } from '../modules/LoginTokenChecker';

//Context 인스턴스 생성
const defaultValue: defaultValueType = {
  members: [],
  readmeData: [],
  noticeContent: '',
  maxPeople: 0,
  isLeader: false,
  getStudyDetail: () => null,
  getStudyMembers: () => null,
  getNoticeContent: () => null,
  editNoticeContent: () => null,
  editSchedule: () => null,
};
export const StudyDetailStore = React.createContext(defaultValue);

//Context Provider 컴포넌트
export default function StudyDetailProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [readmeData, setReadmeData] = useState<TableData[]>([]);
  const [noticeContent, setNoticeContent] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [isLeader, setIsLeader] = useState<boolean>(false);

  const getStudyDetail = async (studyId: number) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: 'login token error' };

    try {
      const response = await studyDetailDataApi(studyId);

      setReadmeData(response.readme);
      return { status: 1, message: 'success get study detail data' };
    } catch (err) {
      return { status: -2, message: 'fail get study detail data' };
    }
  };

  const getStudyMembers = async (studyId: number) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: 'login token error' };

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

  const getNoticeContent = async (studyId: number) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: 'login token error' };

    try {
      const response = await noticeContentApi(studyId);

      setNoticeContent(response.content);
      return { status: 1, message: 'success get notice data' };
    } catch (err) {
      return { status: -2, message: 'fail get notice data' };
    }
  };

  const editSchedule = async (studyId: number, scheduleId: number, dateString: string) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: 'login token error' };
    try {
      await editScheduleApi(studyId, scheduleId, dateString);
      await getStudyDetail(studyId);
      return { status: 1, message: 'success edit schedule' };
    } catch (err) {
      return { status: -2, message: 'fail get schedule' };
    }
  };

  const editNoticeContent = async (studyId: number, content: string) => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: 'login token error' };
    try {
      await editNoticeContentApi(studyId, content);
      await getNoticeContent(studyId);
      return { status: 1, message: 'success edit notice' };
    } catch (err) {
      return { status: -2, message: 'fail get notice' };
    }
  };
  const value = {
    members,
    readmeData,
    noticeContent,
    maxPeople,
    isLeader,
    getStudyDetail,
    getStudyMembers,
    getNoticeContent,
    editNoticeContent,
    editSchedule,
  };
  return <StudyDetailStore.Provider value={value}>{children}</StudyDetailStore.Provider>;
}
//Context 기본값 타입
type defaultValueType = {
  members: Member[];
  readmeData: TableData[];
  noticeContent: string;
  maxPeople: number;
  isLeader: boolean;
  getStudyDetail: (studyId: number) => any;
  getStudyMembers: (studyId: number) => any;
  getNoticeContent: (studyId: number) => any;
  editNoticeContent: (studyId: number, content: string) => any;
  editSchedule: (studyId: number, scheduleId: number, dateString: string) => any;
};
