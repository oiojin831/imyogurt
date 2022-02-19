import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { SideBar } from "./SideBar";
import { ToggleButton } from "./ToggleButton";
import usePrev from "../../hooks/usePrev";
import { useEffect } from "react";

export const NavBar = ({ isOpen, onToggle, onClose }: any) => {
  return (
    <Box
      width="full"
      py="4"
      px={{ base: "4", md: "8" }}
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Flex justify="space-between">
        <Logo />
        <ToggleButton
          isOpen={isOpen}
          aria-label="Open Menu"
          onClick={onToggle}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          // Only disabled for showcase
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <SideBar onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
