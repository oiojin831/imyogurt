import { Flex, Button } from '@chakra-ui/react';
import { Link as RemixLink } from 'remix';
const IndexPage = () => {
  return (
    <Flex flexDirection="column" justify="center">
      <RemixLink to="/ingredients">
        <Button colorScheme="teal" variant="outline">
          재료 확인
        </Button>
      </RemixLink>
      <RemixLink to="/recipes">
        <Button colorScheme="teal" variant="outline">
          레시피 확인
        </Button>
      </RemixLink>
      <RemixLink to="/prices">
        <Button colorScheme="teal" variant="outline">
          원가 확인
        </Button>
      </RemixLink>
    </Flex>
  );
};

export default IndexPage;
