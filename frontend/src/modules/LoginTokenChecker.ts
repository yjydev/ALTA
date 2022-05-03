//true : 로그인 확인
//false : 로그인 필요
export default function LoginTokenChecker(): boolean {
  console.log('login status checking...');
  const localJwtToken: string | null = localStorage.getItem('jwt');
  //토큰이 없음
  if (!localJwtToken) return false;

  const payload: string = localJwtToken.split('.')[1];
  const expireTime: number = JSON.parse(window.atob(payload)).exp;
  const now: number = new Date().getTime();

  //토큰이 있지만 만료됨
  if (now > expireTime) return false;

  //정상적인 경우
  return true;
}
