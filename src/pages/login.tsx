import React from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link"
interface loginProps {}

const Login: React.FC<loginProps> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <>
      <NavBar />
      <Wrapper varient="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (value, { setErrors }) => {
            const res = await login(value);
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data.login.errors));
            } else if (res.data?.login.user) {
              router.push("/");
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
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
