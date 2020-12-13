import { useApolloClient } from "@apollo/client";
import {
  Badge,
  Button,
  Flex,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useGetBorrowsQuery, useReturnMutation } from "../generated/graphql";
import {
  BorrowState,
  borrowStateDisplayColor,
  borrowStateDisplayName,
} from "../utils/borrowStates";

interface borrowsProps {}

const Borrows: React.FC<borrowsProps> = ({}) => {
  const {
    data: retedBorrows,
    fetchMore: fetchMoreReted,
    loading: loadingRetedBorrows,
    refetch: refetchReted,
  } = useGetBorrowsQuery({
    variables: {
      isReturned: true,
    },
  });
  const {
    data: unRetedBorrows,
    fetchMore: fetchMoreUnReted,
    loading: loadingNotRetedBorrows,
    refetch: refetchUnReted,
    error
  } = useGetBorrowsQuery({
    fetchPolicy: "no-cache",
    variables: {
      isReturned: false,
    },
    errorPolicy: "all"
  });
  const [returnBook, { loading: loadingReturn }] = useReturnMutation();
  const [len, setLen] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const toast = useToast();
  if ( error) {
    router.push('/');
    toast({
      title: "无权限",
      description: error?.message,
      duration: 3000,
      isClosable: true,
      status: "error",
    });
  }
  return (
    <Layout>
      <Tabs m={4}>
        <TabList>
          <Tab>借阅中</Tab>
          <Tab>已还</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>期刊</Th>
                  <Th>借时间</Th>
                  <Th>过期于</Th>
                  <Th>状态</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {!unRetedBorrows?.getBorrows
                  ? null
                  : unRetedBorrows.getBorrows.map(
                      ({ state, borrowAt, expireAt, issue, id }, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{idx}</Td>
                            <Td>{`${issue.journal.title} No. ${issue.no}`}</Td>
                            <Td>{borrowAt}</Td>
                            <Td>{expireAt}</Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  borrowStateDisplayColor[state as BorrowState]
                                }
                              >
                                {borrowStateDisplayName[state as BorrowState]}
                              </Badge>
                            </Td>
                            <Td>
                              <Button
                                size="sm"
                                onClick={async () => {
                                  await returnBook({ variables: { id } });
                                  refetchUnReted();
                                }}
                                isLoading={loadingReturn}
                                disabled={BorrowState.PENDING_RETURN === state}
                              >
                                还书
                              </Button>
                            </Td>
                          </Tr>
                        );
                      }
                    )}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>期刊</Th>
                  <Th>借时间</Th>
                  <Th>还时间</Th>
                  <Th>状态</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!retedBorrows?.getBorrows
                  ? null
                  : retedBorrows.getBorrows.map(
                      ({ state, borrowAt, expireAt, returnAt, issue }, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{idx}</Td>
                            <Td>{`${issue.journal.title} No. ${issue.no}`}</Td>
                            <Td>{borrowAt}</Td>
                            <Td>{returnAt}</Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  borrowStateDisplayColor[state as BorrowState]
                                }
                              >
                                {borrowStateDisplayName[state as BorrowState]}
                              </Badge>
                            </Td>
                          </Tr>
                        );
                      }
                    )}
              </Tbody>
            </Table>
            <Flex mt={4}>
              <Button
                mx="auto"
                isLoading={loadingRetedBorrows}
                disabled={!hasMore}
                onClick={async () => {
                  if (len === retedBorrows?.getBorrows.length) {
                    setHasMore(false);
                    return;
                  }
                  setLen(retedBorrows?.getBorrows.length || 0);
                  await fetchMoreReted({
                    variables: {
                      cursor: retedBorrows?.getBorrows
                        .map((e) => e.id)
                        .reduce((a, b) => Math.min(a, b)),
                      limit: 20,
                    },
                  });
                }}
              >
                {hasMore ? "加载更多" : "没有更多了"}
              </Button>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Borrows;
