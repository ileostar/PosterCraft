import { z } from "zod";

//注册表单
export const registerFormSchema = z.object({
  phone: z.string().length(11, { message: "无效的手机号码" }).regex(/^\d+$/, {
    message: "无效的手机号码",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  otp: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
  username: z
    .string()
    .min(4, { message: "用户名长度不能少于4个字符" })
    .max(12, { message: "用户名长度不能超过20个字符" }),
});

export type registerFormSchemaType = z.infer<typeof registerFormSchema>;

//登录表单
export const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  phone: z.string().length(11, { message: "无效的手机号码" }).regex(/^\d+$/, {
    message: "无效的手机号码",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  code: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
  username: z.string().min(2, { message: "用户名长度不能少于2个字符" }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

//绑定手机号表单
export const phoneFormSchema = z.object({
  phone: z.string().length(11, { message: "无效的手机号码" }).regex(/^\d+$/, {
    message: "无效的手机号码",
  }),
  otp: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
});

export type phoneFormSchemaType = z.infer<typeof phoneFormSchema>;
