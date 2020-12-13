import { EditIcon } from "@chakra-ui/icons";
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
import { Article, useUpdateArticleMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";

interface EditArticleFormProps {
  article: Article;
}

export const EditArticleForm: React.FC<EditArticleFormProps> = ({
  article: { title, pbegin, pend, authors, keywords, id },
}) => {
  const [updateArticle] = useUpdateArticleMutation();
  const toast = useToast();
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          color="blue.300"
          bg="transparent"
          _focus={{ boxShadow: "none" }}
          aria-label="edit"
          size="sm"
          icon={<EditIcon />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>编辑</PopoverHeader>
        <PopoverBody>
          <Formik
            initialValues={{ title, pbegin, pend, authors, keywords }}
            onSubmit={async (value, { setErrors, resetForm }) => {
              const res = await updateArticle({
                variables: {
                  inputs: value,
                  id,
                },
              });
              if (res.data?.updateArticle.errors) {
                setErrors(toErrorMap(res.data.updateArticle.errors));
              } else if (res.data?.updateArticle.article) {
                toast({
                  title: "文章修改成功",
                  duration: 3000,
                  isClosable: true,
                  status: "success",
                });
              } else {
                toast({
                  title: "文章修改失败",
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
