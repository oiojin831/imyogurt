import { As, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";
import { NavLink as RemixLink } from "remix";

interface NavButtonProps extends ButtonProps {
  icon?: As;
  label: string;
  to?: string;
}

export const NavButton = (props: NavButtonProps) => {
  const { to, icon, label, children, ...buttonProps } = props;
  return (
    <RemixLink to={to || "/"}>
      <HStack spacing="3">
        {icon ? <Icon as={icon} boxSize="6" color="subtle" /> : children}
        <Text>{label}</Text>
      </HStack>
    </RemixLink>
  );
};
