import { Link, Outlet } from 'remix';
import { Flex, Button } from '@chakra-ui/react';
const SetMenuLayout = () => {
  return (
    <>
      <Flex>
        <Button
          as={Link}
          to="/set-menus/new"
          colorScheme="teal"
          variant="outline"
        >
          추가
        </Button>
      </Flex>
      <Outlet />
    </>
  );
};

export default SetMenuLayout;
