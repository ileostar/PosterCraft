import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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
        <Toaster />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
