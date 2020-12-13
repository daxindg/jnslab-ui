import { useApolloClient } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useCreateArticleMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";

interface NewArticleFormProps {
  issueId: number;
}

export const NewArticleForm: React.FC<NewArticleFormProps> = ({ issueId }) => {
  const [createArticle] = useCreateArticleMutation();
  const client = useApolloClient();
  const toast = useToast();
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          color="green.300"
          bg="transparent"
          _focus={{ boxShadow: "none" }}
          aria-label="edit"
          size="sm"
          icon={<AddIcon />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>新建</PopoverHeader>
        <PopoverBody>
          <Formik
            initialValues={{
              title: "",
              authors: "",
              keywords: "",
              pbegin: 0,
              pend: 0,
            }}
            onSubmit={async (value, { setErrors, resetForm }) => {
              const res = await createArticle({
                variables: {
                  inputs: value,
                  issueId,
                },
              });
              if (res.data?.createArticle.errors) {
                setErrors(toErrorMap(res.data.createArticle.errors));
              } else if (res.data?.createArticle.article) {
                toast({
                  title: "文章添加成功",
                  duration: 3000,
                  isClosable: true,
                  status: "success",
                });
                client.cache.modify({
                  id: `Issue:${issueId}`,
                  fields: {
                    articles(existRefs = []) {
                      return [...existRefs, res.data?.createArticle.article];
                    },
                  },
                });
                resetForm();
              } else {
                toast({
                  title: "文章添加失败",
                  duration: 3000,
                  isClosable: true,
                  status: "warning",
                });
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <InputField
                    autoComplete="off"
                    name="title"
                    placeholder="标题"
                    label="标题"
                  />
                  <InputField
                    autoComplete="off"
                    name="authors"
                    placeholder="分号分隔多个作者"
                    label="作者"
                  />
                  <InputField
                    autoComplete="off"
                    name="keywords"
                    placeholder="分号分隔多个关键词"
                    label="关键词"
                  />
                  <InputField
                    autoComplete="off"
                    name="pbegin"
                    type="number"
                    placeholder="起始页"
                    label="起始页"
                  />
                  <InputField
                    autoComplete="off"
                    name="pend"
                    type="number"
                    placeholder="结束页"
                    label="结束页"
                  />
                  <Button isLoading={isSubmitting} type="submit">
                    保存
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
