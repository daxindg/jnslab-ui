import { NetworkStatus } from "@apollo/client";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { useCatalogsQuery } from "../generated/graphql";
const Index = () => {
  const {
    data,
    loading: fetchingCatalogs,
    fetchMore,
    networkStatus,
  } = useCatalogsQuery({
    notifyOnNetworkStatusChange: true,
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
              isLoading={
                fetchingCatalogs || networkStatus === NetworkStatus.fetchMore
              }
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
              {hasMore ? "加载更多" : "一滴都不剩啦"}
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
