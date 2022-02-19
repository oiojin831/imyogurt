import { Flex, Stack, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { getColor } from "@chakra-ui/theme-tools";
import { FaMoon, FaSun } from "react-icons/fa";
import { Switch } from "../switch";
import { FiBarChart2, FiBookmark, FiCheckSquare, FiHome } from "react-icons/fi";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";
import { useTheme } from "@emotion/react";

export const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Flex
        flex="1"
        bg="bg-surface"
        overflowY="auto"
        boxShadow={useColorModeValue("md", "sm-dark")}
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
            <Logo />
            <Stack spacing="1">
              <NavButton to="/set-menus" label="세트메뉴" icon={FiHome} />
              <NavButton to="/ingredients" label="재료" icon={FiCheckSquare} />
              <NavButton to="/recipes" label="레시피" icon={FiBookmark} />
              <NavButton to="/prices" label="원가" icon={FiBarChart2} />
            </Stack>
          </Stack>
          <Stack spacing={{ base: "5", sm: "6" }}>
            <Stack spacing="1">
              <NavButton label="mode">
                <Switch
                  aria-label="Toggle color mode"
                  leftIcon={<FaMoon color={getColor(theme, "yellow.400")} />}
                  rightIcon={<FaSun color={getColor(theme, "orange.300")} />}
                  isChecked={colorMode === "dark"}
                  onChange={() => toggleColorMode()}
                />
              </NavButton>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
