import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { title } from "process";
import React from "react";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useCatalogsQuery, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
const Index = () => {
  const [{ data, fetching: fetchingCatalogs }] = useCatalogsQuery();

  return (
    <>
      <NavBar />
      <Wrapper>
        <SimpleGrid columns={[2, 3, 3]} spacing="40px">
          {data
            ? data.catalogs.map((item) => (
                <Box
                  mb={4}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="5px"
                  key={item.id}
                >
                  <NextLink href={`catalog-detail/[catalogId]`} as={`catalog-detail/${item.id}`}>
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
              ))
            : "...loading..."}
        </SimpleGrid>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
