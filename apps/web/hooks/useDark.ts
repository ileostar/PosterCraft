import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";

import { isBrowser } from "../utils/isBrowser";

function getSystemDark() {
  if (isBrowser) {
    // dark mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}
export default function useDark() {
  const [theme, setTheme] = useLocalStorageState("theme-color", {
    defaultValue: getSystemDark() ? "dark" : "light",
  });
  const dark = theme === "dark";
  const toggleDark = (status?: "dark" | "light") => {
    status !== undefined ? setTheme(status) : setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const qm = window.matchMedia("(prefers-color-scheme: dark)");
    const changeDark = () => setTheme(qm.matches ? "dark" : "light");
    setTheme(dark ? "dark" : "light");
    qm.addEventListener("change", changeDark); // track system preferences
    return () => qm.removeEventListener("change", changeDark);
  }, []);

  useEffect(() => {
    if (dark) {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  return { dark, toggleDark };
}
