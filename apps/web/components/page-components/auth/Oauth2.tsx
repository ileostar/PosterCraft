"use client";

import { githubSignIn, googleSignIn } from "@/api/auth";
import GithubIcon from "@/components/base/GithubIcon";
import GoogleIcon from "@/components/base/GoogleIcon";
import { useRouter } from "next/navigation";
import { useGithubUsername, useOauth2Dialog } from "../../../store/auth";

function Oauth2() {
  const router = useRouter();

  const { setGithubUsername } = useGithubUsername();
  const { setIsOpen } = useOauth2Dialog();

  const handleGithubSignIn = async () => {
    const res = await githubSignIn();
    console.log(res);
    if (res.data.isSignUp) {
      window.localStorage.setItem("token", res.token); //存入本地
      router.push("/");
    } else {
      res.data.userData.username
        ? setGithubUsername(res.data.userData.username)
        : setGithubUsername("MoMo");
      setIsOpen(true);
    }
  };

  return (
    <div className="flex items-center ">
      <span className="text-xs font-serif">其他登录方式：</span>
      <button
        className="text-gray cursor-pointer mr-1 hover:animate-pulse"
        onClick={() => googleSignIn()}
      >
        <GoogleIcon/>
      </button>
      <button
        className="cursor-pointer hover:animate-pulse"
        onClick={() => {
          router.push("/auth/login");
          handleGithubSignIn();
        }}
      >
        <GithubIcon/>
      </button>
    </div>
  );
}

export default Oauth2;
