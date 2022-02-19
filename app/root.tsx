import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { MetaFunction } from "remix";
import React from "react";
import {
  Box,
  ChakraProvider,
  Divider,
  Heading,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import ServerStyleContext from "./context.server";
import ClientStyleContext from "./context.client";
import { Shell } from "./components/layouts/Shell";
import { theme } from "@chakra-ui/pro-theme";
import IconSwitch from "./components/switch/src/theme-icon-switch";

export const meta: MetaFunction = () => {
  return { title: "Remix + Chakra UI App" };
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Error!">
      <Shell>
        <Box>
          <Heading as="h1">There was an error</Heading>
          <Text>{error.message}</Text>
          <Divider />
          <Text>
            Hey, developer, you should replace this with what you want your
            users to see.
          </Text>
        </Box>
      </Shell>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </Text>
      );
      break;
    case 404:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that does not exist.
        </Text>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} - ${caught.statusText}`}>
      <Shell>
        <Heading as="h1">
          {caught.status}: {caught.statusText}
        </Heading>
        {message}
      </Shell>
    </Document>
  );
}

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}
const myTheme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: false,
  },
  components: {
    IconSwitch,
  },
  colors: { ...theme.colors, blue: theme.colors.purple },
  theme,
});

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const serverSyleData = React.useContext(ServerStyleContext);
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    React.useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          {serverSyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          <ChakraProvider theme={myTheme}>{children}</ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <Shell>
        <Outlet />
      </Shell>
    </Document>
  );
}
