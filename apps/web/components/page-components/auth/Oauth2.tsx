"use client";

import { githubSignIn, googleSignIn } from "@/api/api";
import { Icons } from "@/components/base/Icons";
import { useRouter } from "next/navigation";

import { useGithubUsername, useOauth2Dialog } from "../../../store/state";

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
      <div
        className="text-gray cursor-pointer mr-1 hover:animate-pulse"
        onClick={() => googleSignIn()}
      >
        <Icons.google />
      </div>
      <div
        className="cursor-pointer hover:animate-pulse"
        onClick={() => {
          router.push("/auth/login");
          handleGithubSignIn();
        }}
      >
        <Icons.gitHub />
      </div>
    </div>
  );
}

export default Oauth2;
