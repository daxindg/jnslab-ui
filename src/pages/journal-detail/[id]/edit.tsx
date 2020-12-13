import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../../components/InputField";
import { NavBar } from "../../../components/NavBar";
import { Wrapper } from "../../../components/Wrapper";
import {
  useJournalDetailQuery,
  useMeQuery,
  useUpdateJournalMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { testEdit } from "../../../utils/permissions";
import { toErrorMap } from "../../../utils/toErrorMap";

const EditJournal: NextPage<{ id: string }> = ({ id }) => {
  const toast = useToast();
  const { data: meData, loading: loadingUser } = useMeQuery();
  const { data, loading: loadingJournalDetail } = useJournalDetailQuery({
    variables: {
      id: parseInt(id),
    },
  });
  const [period, setPeriod] = useState<string>(data?.journal?.period || "");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [updateJournal, { data: updatedData }] = useUpdateJournalMutation();
  const router = useRouter();
  let body = null;

  if (loadingUser || loadingJournalDetail) {
    body = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mx="auto"
      />
    );
  } else if (testEdit(meData?.me?.permission)) {
    body = (
      <Formik
        initialValues={{
          title: data?.journal?.title || "",
          issn: data?.journal?.issn || "",
          cn: data?.journal?.cn || "",
          yfdh: data?.journal?.yfdh || "",
          organizer: data?.journal?.organizer || "",
          pub_place: data?.journal?.pub_place || "",
          // ...(data?.journal)
        }}
        onSubmit={async (value, { setErrors }) => {
          // const res = await createJournal({ variables: {period, ...value } });
          const res = await updateJournal({
            variables: {
              id: parseInt(id),
              inputs: {
                period,
                ...value,
              },
            },
          });
          if (res.data?.updateJournal.errors) {
            setErrors(toErrorMap(res.data.updateJournal.errors));
          } else if (res.data?.updateJournal.journal) {
            setSuccess(true);
            toast({
              title: "更新成功",
              duration: 3000,
              isClosable: true,
              status: "success",
            });
            if (!isServer()) router.back();
          } else {
            setError(true);
          }

          // if (res.data?.createJournal.errors) {
          //   setErrors(toErrorMap(res.data.createJournal.errors));
          // } else if (res.data?.createJournal.journal) {
          //   setSuccess(true);
          //   router.push(`/catalog-detail/${res.data.createJournal.journal.id}`);
          // } else {
          //   setError(true);
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="刊名"
              label="刊名"
              autoComplete="off"
              required
            />

            <Box mt={4}>
              <InputField
                name="issn"
                placeholder="ISSN"
                label="ISSN"
                autoComplete="off"
                required
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="cn"
                placeholder="CN"
                label="CN"
                autoComplete="off"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="yfdh"
                placeholder="邮发代号"
                label="邮发代号"
                autoComplete="off"
              />
            </Box>
            <FormControl mt={4} id="period">
              <FormLabel htmlFor="period"> 出版周期 </FormLabel>
              <RadioGroup
                name="period"
                mt={2}
                onChange={setPeriod as any}
                value={period}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Radio value="周刊">周刊</Radio>
                  <Radio value="半月刊">半月刊</Radio>
                  <Radio value="月刊">月刊</Radio>
                  <Radio value="双月刊">双月刊</Radio>
                  <Radio value="半年刊">半年刊</Radio>
                  <Radio value="年刊">年刊</Radio>
                  <Radio value="停刊">停刊</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Box mt={4}>
              <InputField
                name="organizer"
                placeholder="主办单位"
                label="主办单位"
                autoComplete="off"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="pub_place"
                placeholder="出版地"
                label="出版地"
                autoComplete="off"
              />
            </Box>
            {error ? (
              <Box mt={4}>
                <Alert status="error">
                  <AlertIcon />
                  There was an error processing your request
                </Alert>
              </Box>
            ) : null}

            <Flex mt={4} justifyContent="space-between" alignItems="center">
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                确认
              </Button>

              <Button
                onClick={() => {
                  router.back();
                }}
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                返回
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    );
  } else {
    toast({
      title: "权限不足",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    if (!isServer()) router.back();
  }

  return (
    <>
      <NavBar />
      <Wrapper varient="small">{body}</Wrapper>
    </>
  );
};

EditJournal.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default EditJournal;
