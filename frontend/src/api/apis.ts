import { OrganizeStudyRequset } from '../types/StudyType';
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

//POST
//스터디 생성 요청
export async function organizeStudyApi(requestBody: OrganizeStudyRequset) {
  return await await postRequest('/api/study', requestBody);
}
//스터디 회차 일정 추가 요청
export async function addScheduleApi(
  studyId: number,
  startDate: Date | null,
  endDate: Date | null,
) {
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
export async function addProblemApi(
  studyId: number,
  scheduleId: number,
  name: string,
  link: string,
) {
  const requestBody = {
    problems: [
      {
        name,
        link,
      },
    ],
    scheduleId,
  };
  return await await postRequest(`/api/study/${studyId}/problem`, requestBody);
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

//PUT
//스터디 회차 일정 수정 요청
export async function editScheduleApi(
  studyId: number,
  scheduleId: number,
  dateString: string,
) {
  const tmp = dateString.split(' ~ ');
  const requestBody = {
    scheduleId,
    startDate: tmp[0],
    endDate: tmp[1],
  };

  console.log(requestBody);
  return await putRequest(
    `/api/study/${studyId}/schedule/${scheduleId}`,
    requestBody,
  );
}
//코드 수정 요청
export async function editCodeApi(
  studyId: number,
  codeId: number,
  commitMessage: string,
  fileName: string,
  code: string,
) {
  const requestBody = {
    commitMessage,
    fileName,
    content: code,
    codeId,
  };

  return await await putRequest(
    `/api/study/${studyId}/code/${codeId}/reupload`,
    requestBody,
  );
}
//문제 수정 요청
export async function editProblemApi(
  studyId: number,
  problemId: number,
  name: string,
  link: string,
) {
  const requestBody = {
    id: problemId,
    name,
    link,
  };
  return await await putRequest(`/api/study/${studyId}/problem/`, requestBody);
}
