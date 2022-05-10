import { getRequest, postRequest, putRequest, deleteRequest } from './request';

//유저 정보 요청
export async function userDataApi() {
  return await getRequest('/api/user/info');
}

//스터디 상세 정보 요청
export async function studyDetailDataApi(studyId: number) {
  return await getRequest(`/api/study/${studyId}`);
}

//스터디 회차 일정 수정 요청
export async function editScheduleApi(
  studyId: number,
  scheduleId: number,
  startDate: string,
  endDate: string,
) {
  const requestBody = {
    scheduleId,
    startDate,
    endDate,
  };
  return await putRequest(`/api/study/${studyId}/schedule`, requestBody);
}
