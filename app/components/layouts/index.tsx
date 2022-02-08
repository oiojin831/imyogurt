import { ReactChild, ReactFragment, ReactPortal } from 'react';
import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useLocation } from 'remix';
import {
  BsFillBookmarksFill,
  BsFillInboxFill,
  BsPencilSquare,
} from 'react-icons/bs';

import { Link, Outlet } from 'remix';
import { Button } from '@chakra-ui/react';

import { UserInfo } from './UserInfo';
import { ScrollArea } from './ScrollArea';
import { SidebarLink } from './SidebarLink';
import { NavBreadcrumb } from './NavBreadcrumb';
import { MobileMenuButton } from './MobileMenuButton';

import { useMobileMenuState } from '~/hooks/useMobileMenuState';

const Shell = (props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  const { isOpen, toggle } = useMobileMenuState();
  const location = useLocation();

  return (
    <Flex
      height="100vh"
      bg={mode('blue.800', 'gray.800')}
      overflow="hidden"
      sx={{ '--sidebar-width': '16rem' }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Box
            as="a"
            href="#"
            p="3"
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{ bg: 'whiteAlpha.200' }}
            whiteSpace="nowrap"
          >
            <UserInfo name="I'm Yogurt" email="nyj@imyogurt.com" />
          </Box>
          <ScrollArea pt="5" pb="6">
            <Stack pb="6">
              <SidebarLink to="ingredients" icon={<BsFillInboxFill />}>
                재료
              </SidebarLink>
              <SidebarLink to="/recipes" icon={<BsFillBookmarksFill />}>
                레시피
              </SidebarLink>
              <SidebarLink to="/set-menus" icon={<BsPencilSquare />}>
                세트 메뉴
              </SidebarLink>
              <SidebarLink to="/prices" icon={<BsPencilSquare />}>
                레시피 원가
              </SidebarLink>
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        p={{ base: '0', md: '6' }}
        marginStart={{ md: 'var(--sidebar-width)' }}
        position="relative"
        left={isOpen ? 'var(--sidebar-width)' : '0'}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg={mode('white', 'gray.700')}
          height="100%"
          pb="6"
          rounded={{ md: 'lg' }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                <NavBreadcrumb />
              </Flex>
            </Flex>
            <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
              <Heading size="md" fontWeight="extrabold" mb="6">
                <Flex direction="row" justify="space-between">
                  {location.pathname.substring(1).toUpperCase()}
                  <Button
                    as={Link}
                    to={`${location.pathname}/new`}
                    colorScheme="teal"
                    variant="outline"
                  >
                    추가
                  </Button>
                </Flex>
                <Flex></Flex>
              </Heading>
              <Box borderWidth="3px" borderStyle="dashed" rounded="xl">
                {props.children}
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Shell;
