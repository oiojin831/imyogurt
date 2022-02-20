import { Flex, Stack, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { getColor } from "@chakra-ui/theme-tools";
import { FaMoon, FaSun } from "react-icons/fa";
import { Switch } from "../switch";
import { Logo } from "./Logo";
import { useTheme } from "@emotion/react";
import { Link } from "remix";

export const SideBar = ({ onClose }: any) => {
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
              <Link to={"/set-menus"} onClick={() => onClose()}>
                세트메뉴
              </Link>
              <Link onClick={() => onClose()} to="/ingredients">
                재료
              </Link>
              <Link onClick={() => onClose()} to="/recipes">
                레시피
              </Link>
              <Link onClick={() => onClose()} to="/prices">
                원가
              </Link>
              <Switch
                aria-label="Toggle color mode"
                leftIcon={<FaMoon color={getColor(theme, "yellow.400")} />}
                rightIcon={<FaSun color={getColor(theme, "orange.300")} />}
                isChecked={colorMode === "dark"}
                onChange={() => toggleColorMode()}
              />
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
