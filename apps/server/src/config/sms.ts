export const SMSClientConfig = {
  // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
  accessKeyId: 'yourAccessKeyId',
  secretAccessKey: 'yourAccessKeySecret',

  //在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
  queueName: 'Alicom-Queue-1092397003988387-',

  // vpc需要配置,华东1示例：请查看 https://help.aliyun.com/document_detail/68360.html
  smsApiEndpoint: 'http://dysmsapi-vpc.cn-hangzhou.aliyuncs.com',
  baseApiEndpoint: 'http://dybaseapi-vpc.cn-hangzhou.aliyuncs.com',
  regionId: 'cn-hangzhou',
  mnsVpc: {
    secure: false, // use https or http
    internal: true, // use internal endpoint
    vpc: true,
  },

  options: { method: 'POST' },
};

export const SMSSendConfig = {
  SignName: '海报编辑器',
  TemplateCode: 'SMS_301990296',
};
