"use client";

import {
  defaultSignIn,
  defaultSignUp,
  githubSignIn,
  googleSignIn,
  loginBySMS,
  sendBySMS,
} from "@/api/api";
import { Icons } from "@/components/base/Icons";
import Layout from "@/components/page-components/login/LoginBackGround";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  phone: z
    .string()
    .length(11, { message: "无效的手机号码" })
    .regex(/^[0-9]+$/, {
      message: "无效的手机号码",
    }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  code: z
    .string()
    .length(6, { message: "无效的验证码" })
    .regex(/^[0-9]+$/, {
      message: "无效的验证码",
    }),
  username: z
    .string()
    .min(4, { message: "用户名长度不能少于4个字符" })
    .max(12, { message: "用户名长度不能超过20个字符" })
    .regex(/^[^@]+$/, { message: "用户名中不能包含@符号" }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      code: "",
      username: "",
    },
  });
  async function onSubmit(values: loginFormSchemaType) {
    console.log(values);
  }
  //登录或注册
  const [isLogin, setLogin] = useState(true);
  //登录模式
  const [isPhoneMode, setPhoneMode] = useState(false);
  //按钮禁用
  const [isDisabled, setIsDisabled] = useState(false);
  //倒计时
  const [countdown, setCountdown] = useState(0);

  // 发送验证码并启动倒计时
  const handleClick = () => {
    if (!isDisabled) {
      sendBySMS(form.getValues("phone"));
      setIsDisabled(true);
      setCountdown(60);
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (countdown === 0) {
      setIsDisabled(false);
    }
  }, [countdown]);


  const handleSign = async () => {
    if (isLogin) {
      if (isPhoneMode) {
        let res = await loginBySMS(form.getValues("phone"), form.getValues("code"));
        window.localStorage.setItem("token", res.token); //存入本地
        console.log(res.token);
          router.back();
      } else {
        let res = await defaultSignIn(form.getValues("username"), form.getValues("password"));
        window.localStorage.setItem("token", res.token); //存入本地
        console.log(res.token);
        router.back();
      }
    } else {
      let res = await defaultSignUp(
        form.getValues("username"),
        form.getValues("password"),
        form.getValues("phone"),
        form.getValues("code"),
      );
      console.log(res);
    }
  };

  const [usernameByGithub, setUsernameByGithub] = useState('');
  const handleGithubSignIn = async () => {
      const res=await githubSignIn();
      console.log(res);
      if(res.data.isSignUp){
        window.localStorage.setItem("token", res.token); //存入本地
        router.back();
      }
      else{
        res.data.userData.username?setUsernameByGithub(res.data.userData.username):setUsernameByGithub('momo');
        showModal() 
      }
  };

  const addPhoneByGithub=async()=>{
    let res = await defaultSignUp(
       usernameByGithub,
       '123456',//默认密码
      form.getValues("phone"),
      form.getValues("code"),
    );
    console.log(res);
    CloseModal()
    router.back();
  }

  const showModal = () => {
    const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const CloseModal=()=>{
    const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.close();
    }
  }

  const RenderForm_SignIn = () => {
    if (isPhoneMode) {
      return (
        <div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <Input
                    className="input-bordered"
                    {...field}
                    placeholder="请输入手机号码"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="form-control mt-[5px]">
                <FormLabel className="label">验证码</FormLabel>
                <FormControl>
                  <Input
                    className="input-bordered border-red-500/30"
                    type="code"
                    placeholder="请输入验证码"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            className={`btn btn-outline btn-error mt-2`}
            onClick={handleClick}
            disabled={isDisabled}
          >
            {isPhoneMode && (!isDisabled ? "发送验证码" : `${countdown}s后再试`)}
          </button>
          <label className="label justify-end">
            <Link
              href="#"
              onClick={() => {
                setPhoneMode(!isPhoneMode);
              }}
              className="label-text-alt link link-hover text-[#EF4444] "
            >
              使用邮箱登录
            </Link>
          </label>
        </div>
      );
    }
    return (
      <div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名/邮箱</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered"
                  {...field}
                  placeholder="请输入用户名/邮箱"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="form-control mt-[5px]">
              <FormLabel className="label">密码</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered border-red-500/30"
                  type="password"
                  placeholder="请输入密码"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <label className="label justify-end">
          <Link
            href="#"
            onClick={() => {
              setPhoneMode(!isPhoneMode);
            }}
            className="label-text-alt link link-hover text-[#EF4444] "
          >
            使用短信登录
          </Link>
        </label>
      </div>
    );
  };

  const RenderForm_SignUp = () => {
    return (
      <div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered"
                  {...field}
                  placeholder="username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="form-control mt-[5px]">
              <FormLabel className="label">Password</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered border-red-500/30"
                  type="password"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mt-1">
              <FormLabel>手机号码</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered"
                  {...field}
                  placeholder="手机号码"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="form-control mt-[5px]">
              <FormLabel className="label">验证码</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered border-red-500/30"
                  type="code"
                  placeholder="验证码"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button
          className={`btn btn-outline btn-error mt-2`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {!isLogin && (!isDisabled ? "发送验证码" : `${countdown}s后再试`)}
        </button>
      </div>
    );
  };

  return (
    <Layout>
      {/* <button className="btn" onClick={()=>showModal() }>open modal</button> */}
      <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 font-serif rounded-2xl">
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 p-8 bg-slate-100 rounded-2xl"
            >
              <div className="flex justify-center items-center ">
                <p className="text-red-500 text-2xl card-title">
                  {isLogin ? "Sign In" : "Sign Up"}
                </p>
              </div>

              {isLogin ? RenderForm_SignIn() : RenderForm_SignUp()}

              <div className="flex justify-between mt-[5px]">
                <Button
                  className="btn w-full hover:bg-red-600 bg-[#EF4444] text-white"
                  onClick={() => handleSign()}
                  type="submit"
                >
                  {isLogin ? "登录" : "注册"}
                </Button>
              </div>
              <div className="flex justify-end gap-2 mt-2 items-center">
                <label className="label w-1/2">
                  <Link
                    href="#"
                    onClick={() => {
                      setLogin(!isLogin);
                    }}
                    className="label-text-alt link link-hover text-[#EF4444] "
                  >
                    {isLogin ? "点此注册" : "点此登录"}
                  </Link>
                </label>
                <span className="text-xs font-serif">其他登录方式：</span>
                <div
                  className="text-gray cursor-pointer hover:animate-pulse"
                  onClick={() => googleSignIn()}
                >
                  <Icons.google />
                </div>
                <div
                  className="cursor-pointer hover:animate-pulse"
                  onClick={() => handleGithubSignIn()}
                >
                  <Icons.gitHub />
                </div>
              </div>
            </form>
          </div>
        </Form>
      </div>
       

 
      <dialog
        id="my_modal_1"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">请绑定手机号!</h3>
          {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
          <Form {...form}>
          <FormField
            control={form.control}
            name="phone"                            
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <Input
                    className="input-bordered"
                    {...field}
                    placeholder="手机号码"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="form-control mt-[5px]">
                <FormLabel className="label">验证码</FormLabel>
                <FormControl>
                  <Input
                    className="input-bordered border-red-500/30"
                    type="code"
                    placeholder="验证码"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            className={`btn btn-outline btn-error mt-4`}
            onClick={handleClick}
            disabled={isDisabled}
          >
            {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
          </button>
        </Form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="btn" role="button" onClick={()=>{addPhoneByGithub()}}> 绑定</div>
            </form>
          </div>
        </div>
      </dialog> 
    




    </Layout>
  );
}
