import React, { useState } from 'react';
import { StudyMember, TableData, chatResponse } from '../types';
import { ContextProps, ContextPromiseType } from '../types';
import {
  deleteTableApi,
  editNoticeContentApi,
  editScheduleApi,
  memberListApi,
  noticeContentApi,
  studyDetailDataApi,
  chatDataApi,
} from '../api/apis';
import { checkLogin } from '../modules/LoginTokenChecker';

const defaultValue: defaultValueType = {
  members: [],
  readmeData: [],
  noticeContent: '',
  maxPeople: 0,
  isLeader: false,
  studyName: '',
  getReadmeDetail: () => null,
  getStudyMembers: () => null,
  getNoticeContent: () => null,
  editNoticeContent: () => null,
  editSchedule: () => null,
  deleteSchedule: () => null,
  chatContents: [],
  getChatContent: () => null,
  setChatContents: () => null,
};
export const StudyDetailStore = React.createContext(defaultValue);

export default function StudyDetailProvider({ children }: ContextProps) {
  const [members, setMembers] = useState<StudyMember[]>([]);
  const [readmeData, setReadmeData] = useState<TableData[]>([]);
  const [noticeContent, setNoticeContent] = useState<string>('');
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [studyName, setStudyName] = useState<string>('');
  const [chatContents, setChatContents] = useState<chatResponse[]>([]);

  const getReadmeDetail = async (studyId: number): Promise<ContextPromiseType> => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: loginStatus.message };

    try {
      const response = await studyDetailDataApi(studyId);

      setReadmeData(response.readme);
      setStudyName(response.studyName);
      return { status: 1, message: '스터디 리드미를 불러왔습니다' };
    } catch (err: any) {
      return { status: -2, message: err.response.data.message };
    }
  };

  const getStudyMembers = async (studyId: number): Promise<ContextPromiseType> => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: loginStatus.message };

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
      return { status: 1, message: '스터디 참여자 정보를 불러왔습니다' };
    } catch (err: any) {
      return { status: -2, message: err.response.data.message };
    }
  };

  const getNoticeContent = async (studyId: number): Promise<ContextPromiseType> => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: loginStatus.message };

    try {
      const response = await noticeContentApi(studyId);

      setNoticeContent(response.content);
      return { status: 1, message: '공지사항을 불러왔습니다' };
    } catch (err: any) {
      return { status: -2, message: err.response.data.message };
    }
  };

  const getChatContent = async (studyId: number): Promise<ContextPromiseType> => {
    const loginStatus = await checkLogin();
    if (!loginStatus.status) return { status: -1, message: loginStatus.message };
    try {
      const res = await chatDataApi(studyId);
      setChatContents(res);
      return { status: 1, message: '채팅 내역을 성공적으로 로드하였습니다!' };
    } catch (err: any) {
      console.log(err);
      return { status: -2, message: err.response.data.message };
    }
  };

  const editSchedule = async (studyId: number, scheduleId: number, dateString: string): Promise<ContextPromiseType> => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: loginStatus.message };
    try {
      await editScheduleApi(studyId, scheduleId, dateString);
      await getReadmeDetail(studyId);
      return { status: 1, message: '일정을 수정했습니다' };
    } catch (err: any) {
      return { status: -2, message: err.response.data.message };
    }
  };

  const editNoticeContent = async (studyId: number, content: string): Promise<ContextPromiseType> => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: loginStatus.message };
    try {
      await editNoticeContentApi(studyId, content);
      await getNoticeContent(studyId);
      return { status: 1, message: '공지사항을 수정했습니다' };
    } catch (err: any) {
      return { status: -2, message: err.response.data.message };
    }
  };

  const deleteSchedule = async (studyId: number, scheduleId: number): Promise<ContextPromiseType> => {
    const loginStatus = await checkLogin();

    if (!loginStatus.status) return { status: -1, message: loginStatus.message };
    try {
      await deleteTableApi(studyId, scheduleId);
      await getReadmeDetail(studyId);
      return { status: 1, message: '일정을 삭제했습니다' };
    } catch (err: any) {
      return { status: -2, message: err.response.data.message };
    }
  };
  const value = {
    members,
    readmeData,
    noticeContent,
    maxPeople,
    isLeader,
    studyName,
    getReadmeDetail,
    getStudyMembers,
    getNoticeContent,
    editNoticeContent,
    editSchedule,
    deleteSchedule,
    chatContents,
    getChatContent,
    setChatContents,
  };
  return <StudyDetailStore.Provider value={value}>{children}</StudyDetailStore.Provider>;
}
//Context 기본값 타입
type defaultValueType = {
  members: StudyMember[];
  readmeData: TableData[];
  noticeContent: string;
  maxPeople: number;
  isLeader: boolean;
  studyName: string;
  getReadmeDetail: (studyId: number) => any;
  getStudyMembers: (studyId: number) => any;
  getNoticeContent: (studyId: number) => any;
  editNoticeContent: (studyId: number, content: string) => any;
  editSchedule: (studyId: number, scheduleId: number, dateString: string) => any;
  deleteSchedule: (studyId: number, scheduleId: number) => any;
  chatContents: chatResponse[];
  getChatContent: (studyId: number) => any;
  setChatContents: (newData: chatResponse[]) => void;
};
