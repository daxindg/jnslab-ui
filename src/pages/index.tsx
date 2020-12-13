import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCatalogsQuery, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
const Index = () => {
  const { data, loading: fetchingCatalogs, fetchMore } = useCatalogsQuery({
    variables: {
      cursor: 0,
      limit: 20,
    },
  });
  const [len, setLen] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  return (
    <Layout>
      {data ? (
        <>
          <Flex justify="center" wrap="wrap" spacing="40px">
            {data.catalogs.map((item) => (
              <Flex
                mb={4}
                ml={2}
                mr={4}
                p={5}
                direction="column"
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
                <Spacer />
                <Text pointerEvents="none" mt={4}>
                  ISSN: {item.issn}
                </Text>
                <Text pointerEvents="none" mt={2}>
                  {item.period}
                </Text>
              </Flex>
            ))}
          </Flex>
          <Flex mb={8} justify="center">
            <Button
              isLoading={fetchingCatalogs}
              disabled={!hasMore}
              onClick={async () => {
                
                if (len === data.catalogs.length) {
                  setHasMore(false);
                  return;
                }
                setLen(data.catalogs.length);
                await fetchMore({
                  variables: {
                    cursor: data.catalogs
                      .map((e) => e.id)
                      .reduce((a, b) => Math.min(a, b)),
                    limit: 20,
                  },
                });
              }}
            >
              {hasMore ? '加载更多' : '一滴都不剩啦'}
            </Button>
          </Flex>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default Index;
