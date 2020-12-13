import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useCreateJournalMutation, useMeQuery } from "../generated/graphql";
import { testEdit } from "../utils/permissions";
import { toErrorMap } from "../utils/toErrorMap";

const NewJournal: React.FC<{}> = ({}) => {
  const { data: meData, loading } = useMeQuery();
  const [period, setPeriod] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [createJournal] = useCreateJournalMutation();
  const router = useRouter();
  const toast = useToast();
  let body = null;
  if (loading) {
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
          title: "",
          issn: "",
          cn: "",
          yfdh: "",
          organizer: "",
          pub_place: "",
        }}
        onSubmit={async (value, { setErrors }) => {
          const res = await createJournal({ variables: { period, ...value } });

          if (res.data?.createJournal.errors) {
            setErrors(toErrorMap(res.data.createJournal.errors));
          } else if (res.data?.createJournal.journal) {
            setSuccess(true);
            router.push(`/journal-detail/${res.data.createJournal.journal.id}`);
          } else {
            setError(true);
          }
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

            <Button
              mt={4}
              mx="auto"
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
              disabled={success}
            >
              创建
            </Button>
          </Form>
        )}
      </Formik>
    );
  } else {
    toast({
      title: "权限不足",
      duration: 3000,
      isClosable: true,
      status: "error",
    });
    router.push("/");
  }

  return (
    <>
      <NavBar />
      <Wrapper varient="small">{body}</Wrapper>
    </>
  );
};

export default NewJournal;
