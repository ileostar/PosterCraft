"use client";

import { githubSignIn } from "@/api/auth";
import GithubIcon from "@/components/shared/GithubIcon";
import GoogleIcon from "@/components/shared/GoogleIcon";
import { useToken } from "@/hooks/useToken";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useGithubUsername, useOauth2Dialog } from "../../../stores/auth";

function Oauth2() {
  const router = useRouter();
  const [_, setTokenHandler] = useToken();
  const t = useTranslations();

  const { setGithubUsername } = useGithubUsername();
  const { setIsOpen } = useOauth2Dialog();

  const handleGithubSignIn = async () => {
    const res = await githubSignIn();
    if (res.data.isSignUp && res.token) {
      setTokenHandler(res.token);
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
      <span className="text-xs font-serif">{t("otherLoginWays")}：</span>
      <button
        className="text-gray cursor-pointer mr-1 hover:animate-pulse"
        // onClick={() => googleSignIn()}
      >
        <GoogleIcon />
      </button>
      <button
        className="cursor-pointer hover:animate-pulse"
        onClick={() => {
          router.push("/auth/login");
          handleGithubSignIn();
        }}
      >
        <GithubIcon />
      </button>
    </div>
  );
}

export default Oauth2;
