import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InfoField } from "../../components/InfoField";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import {
  Issue,
  useDeleteJournalMutation,
  useJournalDetailQuery,
  useMeQuery,
} from "../../generated/graphql";
import { mapToArray } from "../../utils/mapToArray";
import { testEdit } from "../../utils/permissions";
import NextLink from "next/link";
import { DeleteAlertDialog } from "../../components/DeleteAlertDialog";
import { read } from "fs/promises";
import { AllIssuesView } from "../../components/issue/AllIssuesView";

const journalDetail: NextPage<{ id: number }> = ({ id }) => {
  const [deleteConfirmDialogIsOpen, setDeleteConfirmDialogIsOpen] = useState(
    false
  );
  const router = useRouter();
  const toast = useToast();
  const { data: user } = useMeQuery();
  const { data, loading } = useJournalDetailQuery({
    variables: { id },
  });
  const [deleteJournal, { loading: deleting }] = useDeleteJournalMutation({
    update: (cache) => {
      cache.modify({
        fields: {
          catalogs(existingJournals: any[] = [], { readField }) {
            return existingJournals.filter(
              (journalRef) => id !== readField("id", journalRef)
            );
          },
        },
      });
    },
  });

  if (!loading && !data?.journal) {
    toast({
      title: "加载失败",
      description: "期刊详情加载失败",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    router.push("/");
  }
  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data?.journal ? (
            <>
              <Flex>
                <Heading ml={4} mb={8}>
                  {data.journal.title}
                </Heading>
                {testEdit(user?.me?.permission) ? (
                  <Box ml={4}>
                    <NextLink href={`/journal-detail/${id}/edit`}>
                      <Button
                        as={Link}
                        _focus={{
                          boxShadow: "none",
                        }}
                        border="none"
                        outline="none"
                        variant="ghost"
                      >
                        <EditIcon color="blue.500" />
                      </Button>
                    </NextLink>
                    <Button
                      _focus={{
                        boxShadow: "none",
                      }}
                      onClick={() => {
                        setDeleteConfirmDialogIsOpen(true);
                      }}
                      isLoading={deleting}
                      border="none"
                      outline="none"
                      variant="ghost"
                    >
                      <DeleteIcon color="red.500" />
                    </Button>
                    <DeleteAlertDialog
                      isOpen={deleteConfirmDialogIsOpen}
                      setIsOpen={setDeleteConfirmDialogIsOpen}
                      onConfirm={async () => {
                        const res = await deleteJournal({
                          variables: {
                            id,
                          },
                        });
                        if (res) {
                          router.back();
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
                  </Box>
                ) : null}
              </Flex>

              {["issn", "cn", "period", "pub_place", "organizer"].map(
                (name, index) => (
                  <InfoField
                    key={index}
                    name={name}
                    value={
                      typeof (data.journal as any)[name] === "string"
                        ? (data.journal as any)[name]
                        : "未知"
                    }
                  />
                )
              )}
              <AllIssuesView journalId={id} issues={data.journal.issues as Issue[]} />
            </>
          ) : null}
        </>
      )}
    </Layout>
  );
};

journalDetail.getInitialProps = ({ query }) => {
  return {
    id: parseInt(query.id as string),
  };
};

export default journalDetail;
