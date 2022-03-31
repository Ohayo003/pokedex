import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import client from "src/apollo/apollo-client";
import "@fontsource/inter";
import { useRouter } from "next/router";
import Loading from "src/components/widgets/Loading";
import useSound from "use-sound";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = extendTheme({
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },

  styles: {
    global() {
      return {
        body: {
          minH: "100vh",
          bgColor: "background.container",
        },
      };
    },
  },

  colors: {
    primary: "#FFC107",
    secondary: "#1E40AF",
    light: "#EDF2F7",
    gray100: "#EDF2F7",
    gray400: "#A0AEC0",
    gray500: "#718096",
    gray700: "#374151",
    primaryDark: "#806917",
    gray800: "#1F2937",
    text: {
      amber: {
        500: "#FFA000",
        700: "#FFA000",
      },
      default: "#FFFFFF",
      header: "#FFCA28",
      gray100: "#EDF2F7",
      gray300: "#CBD5E0",
      gray800: "#1F2937",
      gray400: "#A0AEC0",
      blue50: "#EFF6FF",
      blue200: "#BFDBFE",
      blue400: "#60A5FA",
      blue700: "#1D4ED8",
      light: "#F7FAFC",
      link: "#FFD12D",
      red700: "#B91C1C",
      green700: "#047857",
    },
    background: {
      amber: {
        500: "#FFC107",
        700: "#FFC107",
      },
      gray500: "#1F2937",
      container: "#111827",
      gray800: "#1A202C",
    },
  },
});

function MyApp({
  Component,
  pageProps: { session, pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const bgMusic = "/assets/music/Pokemon-Theme-Song.mp3";
  const [status, setStatus] = useState(false);

  const handleOnChange = () => setStatus(true);
  const handleOnComplete = () => setStatus(false);

  ///initiailize useSound
  const [play] = useSound(bgMusic, {
    volume: 0.1,
    interrupt: true,
  });
  useEffect(() => {
    router.events.on("routeChangeStart", handleOnChange);
    router.events.on("routeChangeComplete", handleOnComplete);
  }, [router.events]);

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          {status ? (
            <Loading loadingText="Loading data..." />
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
