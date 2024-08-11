const path = require('path');
const dotenv = require('dotenv');

const envName = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env';

dotenv.configDotenv({
  path: path.resolve(__dirname, `../../${envName}`),
});

console.log('--------Current Env--------:', process.env.NODE_ENV);

export const GlobalConfig = {
  /** 项目名称 */ projectName: 'PosterCraft Server',
  /** 项目地址 */
  url: process.env.PROJECT_URL || 'http://localhost:3001/',
  /** 项目端口号 */
  port: parseInt(process.env.PORT, 10) || 3001,
  /** Mysql配置 */
  database_url:
    process.env.DATABASE_URL || 'mysql://root:root@127.0.0.1:3306/poster_craft',
  jwt_secret: process.env.JWT_SECRET || 'sjldk92#sd903mnc./xklsjdf9sdfj',
  /** Redis配置 */
  redis_url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  redis_password: process.env.REDIS_PASSWORD,
  /** SMS短信服务配置 */
  sms: {
    accessKeyId:
      process.env.ALIBABA_CLOUD_ACCESS_KEY_ID || 'default_access_key_id',
    accessKeySecret:
      process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET ||
      'default_access_key_secret',
    signName: process.env.SignName || '默认签名',
    templateCode: process.env.TemplateCode || '默认模板代码',
  },
  /** Google Oauth2配置 */
  googleOAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'default_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default_client_secret',
    redirectUri:
      process.env.GOOGLE_REDIRECT_URI ||
      'http://localhost:3001/auth/google/callback',
  },
  /** Github Oauth2配置 */
  githubOAuth: {
    clientId: process.env.GITHUB_CLIENT_ID || 'default_client_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'default_client_secret',
    redirectUri:
      process.env.GITHUB_REDIRECT_URI ||
      'http://localhost:3001/auth/github/callback',
  },
  /** OSS配置 */
  oss: {
    region: process.env.OSS_REGION || 'oss-cn-shenzhen',
    accessKeyId: process.env.OSS_ACCESS_KEY_ID || 'default_access_key_id',
    accessKeySecret:
      process.env.OSS_ACCESS_KEY_SECRET || 'default_access_key_secret',
    bucket: process.env.OSS_BUCKET || 'default_bucket',
  },
  /** 邮件服务配置 */
  mail: {
    host: process.env.EMAIL_HOST || 'smtp.163.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 25,
    id: process.env.EMAIL_ID || 'default_email_id',
    pass: process.env.EMAIL_PASS || 'default_email_pass',
  },
  /** Swagger 配置 */
  swaggerConfig: {
    customSiteTitle: 'PosterCraft API接口文档',
    customfavIcon:
      'https://img.leostar.top/study/3b40f927051d609da796cbfe36b36b24.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  },
  /** 项目启动日志 */
  StartLog: `[PosterCraft] Nest Service Started Successfully🎉🎉🎉\n[PosterCraft]  Server URL: \x1b[34mhttp://localhost:3001\x1b[0m \x1b[32m\n[PosterCraft] Swagger URL:\x1b[0m \x1b[35mhttp://localhost:3001/swagger\x1b[0m`,
};
