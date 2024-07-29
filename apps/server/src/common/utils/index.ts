import crypto from 'crypto';

/** 生成随机验证码 */
export function generateVerificationCode() {
  const randomBytes = crypto.randomBytes(3);
  const randomNumber = parseInt(randomBytes.toString('hex'), 16) % 1000000;
  return randomNumber.toString().slice(0, 6);
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
