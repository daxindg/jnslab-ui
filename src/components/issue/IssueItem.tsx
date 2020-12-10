import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Issue,
  useDeleteIssueMutation,
  useMeQuery,
} from "../../generated/graphql";
import NextLink from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import { Form } from "formik";
import { EditIssueForm } from "./EditIssueForm";
import { testEdit } from "../../utils/permissions";
import { DeleteAlertDialog } from "../DeleteAlertDialog";
import { useApolloClient } from "@apollo/client";
interface IssueItemProps {
  issue: Issue;
}

const PopoverForm: React.FC<{ issue: Issue }> = ({ issue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const firstFieldRef = React.useRef(null);
  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="auto"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          color="blue.400"
          bg="transparent"
          _focus={{ boxShadow: "none" }}
          aria-label="编辑"
          size="sm"
          icon={<EditIcon />}
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <EditIssueForm
            issue={issue}
            firstFieldRef={firstFieldRef}
            onCancel={onClose}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  const { id, no, year, vol, total, rem } = issue;
  const { data: currentUser } = useMeQuery();
  const [deleteIssue, { loading: deleting }] = useDeleteIssueMutation();
  const client = useApolloClient();
  const [isDelDialogOpen, setDelDialogOpen] = useState(false);
  const toast = useToast();
  
  return (
    <Flex alignItems="baseline" _groupHover={{ backgroundColor: "blue" }}>
      <NextLink href={`/issue-detail/${id}`}>
        <Link>{`${vol >= 0 ? `Vol. ${vol} ` : ""} ${
          no >= 0 ? `No. ${no}, ` : ""
        } ${year ? `${year} ` : ""}`}</Link>
      </NextLink>
      <Spacer />
      {!testEdit(currentUser?.me?.permission) ? null : (
        <>
          <PopoverForm issue={issue} />
          <Button
            bg="transparent"
            size="sm"
            _focus={{ boxShadow: "none" }}
            p={0}
            isLoading={deleting}
            onClick={() => {
              setDelDialogOpen(true);
            }}
          >
            <DeleteIcon color="red.500" p={0} m={0} />
          </Button>
          <DeleteAlertDialog
            isOpen={isDelDialogOpen}
            setIsOpen={setDelDialogOpen}
            onConfirm={async () => {
              const res = await deleteIssue({
                variables: {
                  id
                }
              });
              if (res.data?.deleteIssue) {
                client.cache.modify({
                  id: `Journal:${issue.journalId}`,
                  fields: {
                    issues(existingIssues, {readField}) {
                      return existingIssues.filter(
                        (ref:any) => id !== readField('id', ref)
                      )
                    }
                  }
                })
                toast({
                  title: "删除成功",
                  duration: 3000,
                  isClosable: true,
                  status: "success",
                });
              } else {
                toast({
                  title: "删除失败",
                  duration: 3000,
                  isClosable: true,
                  status: "warning",
                });
              }
            }}
          />
        </>
      )}
    </Flex>
  );
};
