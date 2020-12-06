import React from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { EmailIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons";

interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();
  return (
    <>
    <NavBar/>
    <Wrapper varient="small">
      <Formik
        initialValues={{ username: "", password: "", email: "", phone: "" }}
        onSubmit={async (value, { setErrors }) => {
          const res = await register(value);
          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else if (res.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" placeholder="用户名" label="用户名" autoComplete="off"/>

            <Box mt={4}>
              <InputField
                name="email"
                placeholder="邮箱"
                label="邮箱"
                type="email"
                icon={<EmailIcon color="gray.300"/>}
                required
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="phone"
                placeholder="电话"
                label="电话"
                type="tel"
                icon={<PhoneIcon color="gray.300"/>}
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="password"
                placeholder="密码"
                label="密码"
                type="password"
                icon={<LockIcon color="gray.300"/>}
                required
              />
            </Box>

            <Button
              mt={4}
              mx="auto"
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              注册
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);