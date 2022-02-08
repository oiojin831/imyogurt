import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@chakra-ui/react';
import { useMatches, useLocation } from 'remix';
import { HiChevronRight } from 'react-icons/hi';

export const NavBreadcrumb = (props: BreadcrumbProps) => {
  const matches = useMatches();
  const location = useLocation();
  return (
    <Breadcrumb
      fontSize="sm"
      {...props}
      separator={
        <Box
          as={HiChevronRight}
          color="gray.400"
          fontSize="md"
          top="2px"
          pos="relative"
        />
      }
    >
      <BreadcrumbItem color="inherit">
        <BreadcrumbLink>I'm Yogurt</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem color="inherit" isCurrentPage>
        <BreadcrumbLink>{location.pathname.substring(1)}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
