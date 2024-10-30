import { useEffect, useState } from "react";

export const useToken = (): [string | null, (token: string | null) => void] => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, []);

  const setTokenHandler = (token: string | null) => {
    if (token === null) localStorage.removeItem("token");
    else localStorage.setItem("token", token);
    setToken(token);
  };

  return [token, setTokenHandler];
};
