import { refreshToken } from '../api/request';

// 1 : 로그인 확인
// 0 : 토큰 만료
// -1 : 토큰 없음 -> 로그인 필요
export function loginTokenChecker(): number {
  const localJwtToken: string | null = localStorage.getItem('jwt');

  if (!localJwtToken) return -1;

  const payload: string = localJwtToken.split('.')[1];
  const expireTime: number = JSON.parse(window.atob(payload)).exp;
  const now: number = Math.floor(new Date().getTime() / 1000);

  if (now > expireTime) return 0;

  return 1;
}

export async function checkLogin(callback: () => void) {
  const loginStatus: number = loginTokenChecker();

  console.log('checking token');
  if (loginStatus === -1) callback();
  else if (loginStatus === 0) {
    try {
      const response = await refreshToken();
      console.log('jwt 갱신');
      localStorage.setItem('jwt', response.jwtAt);
    } catch (err) {
      console.log(err);
      console.log('jwt 갱신 불가');
      localStorage.removeItem('jwt');
      localStorage.removeItem('refresh');
      localStorage.removeItem('userData');

      callback();
    }
  }
}
