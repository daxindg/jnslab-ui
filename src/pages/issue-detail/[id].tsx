import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import React from "react";
import { ArticleList } from "../../components/article/ArticleList";
import { NewArticleForm } from "../../components/article/NewArticlePopoverForm";
import { BorrowedByDrawer } from "../../components/issue/BorrowedByDrawer";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import {
  Article,
  useBorrowMutation,
  useIssueDetailQuery,
  useJournalDetailQuery,
  useMeQuery,
} from "../../generated/graphql";
import { testEdit } from "../../utils/permissions";

interface issueDetailProps {
  id: number;
}

const IssueDetail: NextPage<issueDetailProps> = ({ id }) => {
  const { data: issueData, loading: issueLoading } = useIssueDetailQuery({
    variables: {
      id,
    },
  });
  const { data: journalData, loading: journalLoading } = useJournalDetailQuery({
    variables: {
      id: issueData?.issue?.journalId as number,
    },
  });
  const { data: me } = useMeQuery();
  const [borrow, { loading: loadingBorrow }] = useBorrowMutation();
  const toast = useToast()
  return (
    <Layout>
      <Flex direction="column">
        <Flex alignItems="baseline">
          <NextLink href={`/journal-detail/${issueData?.issue?.journalId}`}>
            <Heading as={Link} size="md">
              {journalData?.journal?.title}
            </Heading>
          </NextLink>
          <Text
            ml={4}
            color="gray.400"
          >{`Vol.${issueData?.issue?.vol} No.${issueData?.issue?.no}`}</Text>
          <Badge mx={4}>剩余: {issueData?.issue?.rem}</Badge>
          <BorrowedByDrawer issueId={id}/>
          <Button
            size="sm"
            disabled={!issueData?.issue?.rem}
            onClick={async () => {
              if (issueData?.issue?.id) {
                const res =await borrow({ variables: { id: issueData.issue.id } });
                if (res.data?.borrow?.id) {
                  toast({
                   title: "借阅成功",
                   duration: 3000,  
                   isClosable: true,
                   status: "success"
                  });
                }
                else if (res.errors?.length){
                  toast({
                    title: "失败",
                    description: res.errors[0].message,
                    duration: 3000,
                    isClosable: true,
                    status: "error"
                  });
                }
              }
            }}
          >
            借阅
          </Button>
        </Flex>
        <Flex alignItems="baseline">
          <Heading mb={4} size="sm" mt={4}>
            文章列表
          </Heading>
          {!testEdit(me?.me?.permission) ? null : (
            <NewArticleForm issueId={id} />
          )}
        </Flex>
        {issueData?.issue?.articles ? (
          <ArticleList articles={issueData.issue.articles as Article[]} />
        ) : (
          <Loading />
        )}
      </Flex>
    </Layout>
  );
};

IssueDetail.getInitialProps = ({ query }) => {
  return {
    id: parseInt(query.id as string),
  };
};

export default IssueDetail;
