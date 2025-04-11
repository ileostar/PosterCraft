import GoToLogin from "@/components/GoToLogin";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";

type ProvidesProps = {
  children: React.ReactNode;
};

const Providers = async (props: ProvidesProps) => {
  const { children } = props;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        enableColorScheme
        disableTransitionOnChange
      >
        {children}
        <GoToLogin />
        <Toaster />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
