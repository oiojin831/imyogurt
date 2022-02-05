import { Link, Outlet } from 'remix';
import { Flex, Button } from '@chakra-ui/react';
const IngredientLayout = () => {
  return (
    <>
      <Flex>
        <Button
          as={Link}
          to="/ingredients/new"
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

export default IngredientLayout;
