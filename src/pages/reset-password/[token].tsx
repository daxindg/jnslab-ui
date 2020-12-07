import { NextPage } from "next";
import { useState } from "react";
import { Alert, AlertIcon, Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { NavBar } from "../../components/NavBar";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useResetPasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";




const ResetPassword: NextPage<{token: string}> = ({ token }) => {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const [tokenError, setTokenError] = useState<string>();

  return (
    <>
      <NavBar />
      <Wrapper varient="small">
        <Formik
          initialValues={{ password: "" }}
          onSubmit={async ({ password }, { setErrors }) => {
            const res = await resetPassword({variables: { token, password }});
            if (res.data?.resetPassword.errors) {
              const errorMap = toErrorMap(res.data.resetPassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else {
              router.push("/login");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="新密码"
                  label="新密码"
                  type="password"
                  required
                />
              </Box>

              {tokenError ? (
                <Alert mt={4} borderRadius="7px" status="error">
                  <AlertIcon />
                  无效token
                </Alert>
              ) : null}

              <Button
                mt={4}
                mx="auto"
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                修改密码
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ResetPassword;
