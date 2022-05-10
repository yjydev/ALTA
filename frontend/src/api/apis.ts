import { getRequest, postRequest, putRequest, deleteRequest } from './request';

//유저 정보 요청
export const userDataApi = async () => await getRequest('/api/user/info');
