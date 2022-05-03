//true : 만료됨
//false : 만료되지 않음
export default function LoginTokenChecker(BASE64_token: string): boolean {
  const payload = BASE64_token.split('.')[1];
  const expireTime = JSON.parse(window.atob(payload)).exp;
  const now = new Date().getTime();

  return now > expireTime ? true : false;
}
