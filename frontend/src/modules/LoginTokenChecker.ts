import { refreshToken } from '../api/request';

// 1 : 로그인 확인
// 0 : 토큰 만료
// -1 : 토큰 없음 -> 로그인 필요
export function loginTokenChecker(): number {
  const localJwtToken: string | null = localStorage.getItem('jwt');
  //토큰이 없음
  if (!localJwtToken) {
    console.log('token is null');
    return -1;
  }

  const payload: string = localJwtToken.split('.')[1];
  const expireTime: number = JSON.parse(window.atob(payload)).exp;
  const now: number = Math.floor(new Date().getTime() / 1000);
  //토큰이 있지만 만료됨
  if (now > expireTime) {
    return 0;
  }

  console.log('token is ok');
  //정상적인 경우
  return 1;
}

export async function checkLogin(callback: () => void) {
  const loginStatus: number = loginTokenChecker();

  if (loginStatus === -1) callback();
  else if (loginStatus === 0) {
    try {
      const response = await refreshToken();

      localStorage.setItem('jwt', response.jwtAt);
    } catch {
      localStorage.removeItem('jwt');
      localStorage.removeItem('refresh');
      localStorage.removeItem('userData');

      callback();
    }
  }
}
