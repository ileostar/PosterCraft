import crypto from 'crypto';

/** 生成随机验证码 */
export function generateVerificationCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    // 生成 0-9 之间的数字，并将其转换为字符串后追加到 code
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

/** 生成随机用户名 */
export function generateRandomUsername(
  prefix: string = '用户',
  length: number = 10,
): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }
  return prefix + randomString;
}
