import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  IconButton,
  Tooltip,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { useBorrowedByQuery } from "../../generated/graphql";
import {
  borrowStateDisplayColor,
  BorrowState,
  borrowStateDisplayName,
} from "../../utils/borrowStates";
interface BorrowedByDrawerProps {
  issueId: number;
}

export const BorrowedByDrawer: React.FC<BorrowedByDrawerProps> = ({
  issueId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useBorrowedByQuery({
    variables: {
      id: issueId,
    },
  });
  return (
    <>
      <Tooltip label="去向">
        <IconButton
          mr={4}
          size="sm"
          aria-label="info"
          icon={<InfoOutlineIcon />}
          colorScheme="blue"
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer size="full" placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">期刊去向</DrawerHeader>
            <DrawerBody>
              <Table>
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>用户名</Th>
                    <Th>借时间</Th>
                    <Th>过期于</Th>
                    <Th>状态</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {!data?.borrowedBy
                    ? null
                    : data.borrowedBy.map(
                        ({ state, borrowAt, user, expireAt, id }, idx) => {
                          return (
                            <Tr key={idx}>
                              <Td>{idx}</Td>
                              <Td>{user.username}</Td>
                              <Td>{borrowAt}</Td>
                              <Td>{expireAt}</Td>
                              <Td>
                                <Badge
                                  colorScheme={
                                    borrowStateDisplayColor[
                                      state as BorrowState
                                    ]
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
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
