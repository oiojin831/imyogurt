import { Flex, Heading } from '@chakra-ui/react';
import * as React from 'react';

interface Props {
  title: string;
  action?: Array<React.ReactNode>;
}

export const CardHeader = (props: Props) => {
  const { title, action } = props;
  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      borderBottomWidth="1px"
    >
      <Heading fontSize="lg">{title}</Heading>
      {action?.map((item, id) => (
        <React.Fragment key={id}>{item}</React.Fragment>
      ))}
    </Flex>
  );
};
