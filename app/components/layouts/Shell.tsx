import { Box, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false);
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      bg="bg-canvas"
      overflowY="auto"
    >
      {mounted && isDesktop ? <Sidebar /> : <Navbar />}
      <Box bg="bg-surface" pt={{ base: "0", lg: "3" }} flex="1">
        <Box
          bg="bg-canvas"
          borderTopLeftRadius={{ base: "none", lg: "2rem" }}
          height="full"
          overflowY="auto"
        >
          <Stack spacing={{ base: "8", lg: "6" }}>{children}</Stack>
        </Box>
      </Box>
    </Flex>
  );
};
