import { useApolloClient } from "@apollo/client";
import {
  Box,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  Article,
  useDeleteArticleMutation,
  useMeQuery,
} from "../../generated/graphql";
import { testEdit } from "../../utils/permissions";
import { DeleteButton } from "../button/DeleteButton";
import { EditArticleForm } from "./EditArticlePopoverForm";

interface ArticleListProps {
  articles: Article[];
}

const TableRow: React.FC<{ article: Article }> = ({ article }) => {
  const [deleteArticle] = useDeleteArticleMutation();
  const toast = useToast();
  const client = useApolloClient();
  const { data } = useMeQuery();
  return (
    <Tr id={`art-${article.id}`}>
      <Td>{article.title}</Td>
      <Td>{article.authors}</Td>
      <Td>{article.keywords}</Td>
      <Td>{`pp.${article.pbegin}-${article.pend}`}</Td>
      {!testEdit(data?.me?.permission) ? null : (
        <Td>
            <EditArticleForm article={article} />
            <DeleteButton

              isLoading={false}
              onConfirm={async () => {
                const { data } = await deleteArticle({
                  variables: {
                    id: article.id,
                  },
                });
                if (data?.deleteArticle) {
                  client.cache.modify({
                    id: `Issue:${article.issueId}`,
                    fields: {
                      articles(exsitRefs = [], { readField }) {
                        return exsitRefs.filter(
                          (e: any) => readField("id", e) !== article.id
                        );
                      },
                    },
                  });
                }
                toast({
                  title: data?.deleteArticle ? "删除成功" : "删除失败",
                  duration: 3000,
                  status: data?.deleteArticle ? "success" : "error",
                  isClosable: true,
                });
              }}
            />
        </Td>
      )}
    </Tr>
  );
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const { data } = useMeQuery();
  return (
    <Table variant="simple">
      <Thead>
        <Tr textAlign="center">
          <Th>标题</Th>
          <Th>作者</Th>
          <Th>关键词</Th>
          <Th>页码</Th>
          {!testEdit(data?.me?.permission) ? null : <Th>操作</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {articles.map((e, idx) => (
          <TableRow article={e} key={idx} />
        ))}
      </Tbody>
    </Table>
  );
};
