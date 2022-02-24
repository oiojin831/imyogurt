import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "remix";

export const PageHeader = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => (
  <Box
    as="section"
    bg="bg-surface"
    pt={{ base: "4", md: "8" }}
    pb={{ base: "12", md: "24" }}
  >
    <Container>
      <Stack
        spacing="4"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
      >
        <Stack spacing="1">
          <Heading
            size={useBreakpointValue({ base: "xs", md: "sm" })}
            fontWeight="medium"
          >
            {title}
          </Heading>
          <Text color="muted">{description}</Text>
        </Stack>
        <Stack direction="row" spacing="3">
          <Link to={url}>
            <Button variant="secondary">{`${title} 홈으로`}</Button>
          </Link>
          <Link to={`${url}/new`}>
            <Button variant="primary">{`${title} 페이지로`}</Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  </Box>
);
