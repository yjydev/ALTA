import { AxiosResponse } from 'axios';
import { OrganizeStudyRequset } from '../types';
import { getRequest, postRequest, putRequest, deleteRequest } from './request';

//GET
//유저 정보 요청
export async function userDataApi() {
  return await getRequest('/api/user/info');
}

//스터디 상세 정보 요청
export async function studyDetailDataApi(studyId: number) {
  return await getRequest(`/api/study/${studyId}`);
}

//스터디 참여자 정보 요청
export async function memberListApi(studyId: number) {
  return await getRequest(`/api/study/${studyId}/members`);
}

//스터디 공지사항 정보 요청
export async function noticeContentApi(studyId: number) {
  return await getRequest(`/api/study/${studyId}/notice`);
}

// 스터디 멤버 관리 - 멤버 정보 요청
export async function memberManagementDataApi(studyId: number) {
  return await getRequest(`/api/study/${studyId}/members/management`);
}

// 스터디 멤버 관리 - 유저 검색 요청
export async function searchMemberApi(nickname: string) {
  return await getRequest(`/api/user/search?q=${nickname}`);
}

// 코드 요청
export async function codeDataApi(studyId: number, codeId: number) {
  return await getRequest(`/api/study/${studyId}/code/${codeId}`);
}

// 댓글 리뷰 정보 요청
export async function reivewDataApi(codeId: number) {
  return await getRequest(`/api/code/review/${codeId}`);
}

// 코드 트리 정보 요청
export async function codeTreeApi(studyId: number) {
  return await getRequest(`/api/study/${studyId}/tree`);
}

// 알림 목록 조회 요청
export async function alertDataApi() {
  return await getRequest(`/api/user/alert`);
}

//POST
//스터디 생성 요청
export async function organizeStudyApi(requestBody: OrganizeStudyRequset) {
  return await await postRequest('/api/study', requestBody);
}
//유저 정보 수정 요청
export async function editUserDataApi(
  nickname: string,
  email: string,
  introduction: string,
  languageList: string[] | null,
) {
  const requestBody = {
    nickname,
    email,
    introduction,
    languageList,
  };
  return await await postRequest('/api/user/info', requestBody);
}

export async function changeProfileImgApi(file: FormData) {
  return await postRequest('/api/user/image', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'ACCESS_TOKEN': `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
}

//스터디 회차 일정 추가 요청
export async function addScheduleApi(studyId: number, startDate: Date | null, endDate: Date | null) {
  const refineDate = (date: Date | null): string | null => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    return null;
  };

  const requestBody = {
    startDate: refineDate(startDate),
    endDate: refineDate(endDate),
  };

  return await postRequest(`/api/study/${studyId}/schedule`, requestBody);
}
//문제 추가 요청
export async function addProblemApi(studyId: number, scheduleId: number, name: string, link: string) {
  const requestBody = {
    problems: [
      {
        name,
        link,
      },
    ],
    scheduleId,
  };
  console.log(requestBody);
  return await postRequest(`/api/study/${studyId}/problem`, requestBody);
}

//코드 제출 요청
export async function submitCodeApi(
  studyId: number,
  problemId: number,
  commitMessage: string,
  fileName: string,
  code: string,
) {
  const requestBody = {
    commitMessage,
    fileName,
    content: code,
    problemId,
  };

  return await postRequest(`/api/study/${studyId}/code`, requestBody);
}

// 스터디 초대 메일 발송 요청
export async function sendMailApi(studyId: number, userId: number) {
  const requestBody = {
    userId,
  };
  return await postRequest(`/api/study/${studyId}/invitation`, requestBody);
}

// 댓글(리뷰) 추가 요청
export async function addReviewApi(codeId: number, content: string, line: number) {
  const requestBody = {
    codeId,
    content,
    line,
  };
  return await postRequest('/api/code/review', requestBody);
}

//스터디 공지사항 수정 요청
export async function editNoticeContentApi(studyId: number, content: string) {
  const requestBody = {
    content,
  };

  return await postRequest(`/api/study/${studyId}/notice`, requestBody);
}

//PUT
//스터디 회차 일정 수정 요청
export async function editScheduleApi(studyId: number, scheduleId: number, dateString: string) {
  const tmp = dateString.split(' ~ ');
  const requestBody = {
    scheduleId,
    startDate: tmp[0],
    endDate: tmp[1],
  };

  console.log(requestBody);
  return await putRequest(`/api/study/${studyId}/schedule/${scheduleId}`, requestBody);
}
//코드 수정 요청
export async function editCodeApi(
  studyId: number,
  codeId: number,
  commitMessage: string,
  fileName: string,
  content: string,
) {
  const requestBody = {
    commitMessage,
    fileName,
    content,
  };

  return await putRequest(`/api/study/${studyId}/code/${codeId}`, requestBody);
}
//문제 수정 요청
export async function editProblemApi(studyId: number, problemId: number, name: string, link: string) {
  const requestBody = {
    id: problemId,
    name,
    link,
  };
  return await await putRequest(`/api/study/${studyId}/problem/`, requestBody);
}

// 리뷰(댓글) 해결 여부 토글 요청
export async function toggleSolved(reviewId: number, isSolved: boolean) {
  const requestBody = {
    isSolved,
  };
  return await putRequest(`/api/code/review/${reviewId}/solved`, requestBody);
}

// 리뷰(댓글) 수정 요청
export async function editReviewApi(reviewId: number, content: string, line: number) {
  const requestBody = {
    content,
    line,
  };
  return await putRequest(`/api/code/review/${reviewId}`, requestBody);
}

// 초대코드 검증 요청
export async function confirmInvitationApi(inviteCode: string) {
  const requestBody = {
    code: inviteCode,
  };
  return await putRequest(`/api/study/invitation`, requestBody);
}

// 알림 읽음 요청
export async function readAlertApi(alertId: number) {
  return await putRequest(`/api/user/alert/${alertId}/checked`, '');
}

// 알림 전체 읽음 요청
export async function readAlertAllApi() {
  return await putRequest(`/api/user/alert/checked`, '');
}

// delete
// 코드 삭제 요청
export async function deleteCodeApi(studyId: number, codeId: number) {
  return await deleteRequest(`/api/study/${studyId}/code/${codeId}`);
}

// 댓글(리뷰) 삭제 요청
export async function deleteReviewApi(reviewId: number) {
  return await deleteRequest(`/api/code/review/${reviewId}`);
}

// 초대 대기 삭제 요청
export async function deleteInvitationApi(studyId: number, sjiId: number) {
  return await deleteRequest(`/api/study/${studyId}/invitation/${sjiId}`);
}
