import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, useField } from "formik";
import React, { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";
import { Issue, useUpdateIssueMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputFieldProps } from "../InputField";
interface editIssueFormProps {
  onCancel:()=>void;
  firstFieldRef: any;
  issue: Issue;
}
const TextInput = forwardRef((props: any, ref: any) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl mb={3} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input ref={ref as any}  {...field} {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
});

export const EditIssueForm: React.FC<editIssueFormProps> = ({
  onCancel,
  firstFieldRef,
  issue
}) => {
  const toast = useToast();
  const [updateIssue] = useUpdateIssueMutation();
  const {year, vol, no, total, rem} = issue;

  return (
    <Stack spacing={4}>
      <Formik
        initialValues={{year, vol, no, total, rem}}
        
        onSubmit={async (value, { setErrors }) => {

          const res = await updateIssue({variables: {
            id: issue.id,
            inputs: {
              ...value
            }
          }});
          if (res.data?.updateIssue.errors) {
            setErrors(toErrorMap(res.data.updateIssue.errors))
          }
          else if (res.data?.updateIssue.issue) {
            toast({
              title: "保存成功",
              duration: 3000,
              isClosable: true,
              status: "success"
            });
            onCancel();
          }
          else {
            toast({
              title: "保存失败",
              duration: 3000,
              isClosable: true,
              status: "warning"
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextInput
              name="year"
              label="年"
              ref={firstFieldRef}
              type="number"
              required
            />

            <TextInput name="vol"  label="卷" type="number" required />
            <TextInput name="no"  label="期" type="number" required />
            <TextInput name="total" label="总数" type="number" required />
            <TextInput name="rem"  label="余量" type="number" required />
            <ButtonGroup mt={2} d="flex" justifyContent="flex-end">
              <Button variant="outline" onClick={onCancel}>
                取消
              </Button>
              <Button isLoading={isSubmitting} type="submit" colorScheme="teal">
                保存
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
