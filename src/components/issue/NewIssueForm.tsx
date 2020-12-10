import { AddIcon, EditIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useToast } from "@chakra-ui/react"
import { Field, Form, Formik, useField } from "formik"
import React, { useState } from "react"
import { Issue, useCreateIssueMutation, useUpdateIssueMutation } from "../../generated/graphql"
import { InputField } from "../InputField"
import { EditIssueForm } from "./EditIssueForm"
import FocusLock from "react-focus-lock";
import { toErrorMap } from "../../utils/toErrorMap"
import { useApolloClient } from "@apollo/client"

interface createIssueFormProps {
  onCancel:()=>void;
  firstFieldRef: any;
  journalId: number;
}
const TextInput = React.forwardRef((props: any, ref: any) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl mb={3} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input ref={ref as any}  {...field} {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
});

const CreateIssueForm: React.FC<createIssueFormProps> = ({
  onCancel,
  firstFieldRef,
  journalId
}) => {
  const toast = useToast();
  const [createIssue] = useCreateIssueMutation();
  const client = useApolloClient();
  return (
    <Stack spacing={4}>
      <Formik
        initialValues={{year: new Date().getFullYear(), vol: 0, no: 0, total: 0, rem: 0}}
        
        onSubmit={async (value, { setErrors }) => {

          const res = await createIssue({
            variables: {
              inputs: value,
              journalId
            }
          })
          if (res.data?.createIssue.errors) {
            setErrors(toErrorMap(res.data.createIssue.errors))
          }
          else if (res.data?.createIssue.issue) {
            client.cache.modify({
              id: `Journal:${journalId}`,
              fields: {
                issues(exsitsRefs = [], {readField}) {
                  return [...exsitsRefs, res.data?.createIssue.issue];
                }
              }
            });
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


const PopoverForm: React.FC<{ journalId: number  }> = ({ journalId }) => {
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
          icon={<AddIcon />}
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <CreateIssueForm
            journalId={journalId}
            firstFieldRef={firstFieldRef}
            onCancel={onClose}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export const NewIssuePopover: React.FC<{journalId: number}> = ({journalId})  => {
  return (
    <PopoverForm journalId={journalId}/>
  )
}