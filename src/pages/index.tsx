import { Box, Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useCatalogsQuery, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
const Index = () => {
  const { data, loading: fetchingCatalogs } = useCatalogsQuery();

  return (
    <Layout>
      {data ? (
        <Flex  justify="center" wrap="wrap" spacing="40px">
          {data.catalogs.map((item) => (
            <Box
              mb={4}
              ml={2}
              mr={4}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="5px"

              w="200px"
              key={item.id}
            >
              <NextLink
                href={`journal-detail/[id]`}
                as={`journal-detail/${item.id}`}
              >
                <Heading cursor="pointer" fontSize="xl">
                  {item.title}
                </Heading>
              </NextLink>
              <Text pointerEvents="none" mt={4}>
                ISSN: {item.issn}
              </Text>
              <Text pointerEvents="none" mt={2}>
                {item.period}
              </Text>
            </Box>
          ))}
        </Flex>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mx="auto"
        />
      )}
    </Layout>
  );
};

export default Index;
