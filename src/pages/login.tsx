import { useApolloClient } from "@apollo/client";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

const Login: React.FC<loginProps> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const client = useApolloClient();
  return (
      <Layout varient="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (value, { setErrors }) => {
            const res = await login({variables: value});
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data.login.errors));
            } else if (res.data?.login.user) {
              await client.resetStore();
              router.back();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="用户名或邮箱"
                label="用户名/邮箱"
              />

              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="密码"
                  label="密码"
                  type="password"
                  required
                />
              </Box>
              <Flex justifyContent="space-between" alignItems="baseline">
                <Button
                  mt={4}
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  登录
                </Button>
                <NextLink href="/forgot-password">
                  <Link>忘记密码</Link>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Layout>
  );
};

export default Login;
