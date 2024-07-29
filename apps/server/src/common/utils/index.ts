import * as crypto from 'crypto';

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
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const randomString = randomBytes.toString('hex').slice(0, length);
  return prefix + randomString;
}
