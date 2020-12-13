import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Badge,

  IconButton,
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
  Tooltip,
  Tr,
  useToast
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import {
  useAcceptMutation,

  useGetPendingsQuery,
  useMeQuery,
  useRejectMutation
} from "../generated/graphql";
import {
  BorrowState,
  borrowStateDisplayColor,
  borrowStateDisplayName
} from "../utils/borrowStates";
import { testEdit } from "../utils/permissions";

interface borrowsProps {}

const Borrows: React.FC<borrowsProps> = ({}) => {
  const {
    data: pendings,
    fetchMore,
    loading: loadingPendings,
    refetch,
    error
  } = useGetPendingsQuery({
    fetchPolicy: "no-cache",
    errorPolicy: "all"
  });
  const [accept, { loading: loadingAccept }] = useAcceptMutation();
  const [reject, { loading: loadingReject }] = useRejectMutation();
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
          <Tab>待审核</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>用户名</Th>
                  <Th>期刊</Th>
                  <Th>借时间</Th>
                  <Th>过期于</Th>
                  <Th>状态</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {!pendings?.getPendings
                  ? null
                  : pendings.getPendings.map(
                      ({ state, borrowAt, expireAt, user, issue, id }, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{idx}</Td>
                            <Td>{user.username}</Td>
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
                              <Tooltip label="通过">
                                <IconButton
                                  size="sm"
                                  aria-label="通过"
                                  bg="transparent"
                                  color="green.500"
                                  icon={<CheckIcon />}
                                  onClick={async () => {
                                    await accept({ variables: { id } });
                                    refetch();
                                  }}
                                  isLoading={loadingAccept}
                                />
                              </Tooltip>
                              <Tooltip label="拒绝">
                                <IconButton
                                  size="sm"
                                  color="red.500"
                                  bg="transparent"
                                  aria-label="拒绝"
                                  icon={<CloseIcon />}
                                  onClick={async () => {
                                    await reject({ variables: { id } });
                                    refetch();
                                  }}
                                  isLoading={loadingReject}
                                />
                              </Tooltip>
                            </Td>
                          </Tr>
                        );
                      }
                    )}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Borrows;
