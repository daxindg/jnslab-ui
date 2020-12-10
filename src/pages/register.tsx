import { useApolloClient } from "@apollo/client";
import { EmailIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons";
import { Box, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";


interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  const router = useRouter();
  const client = useApolloClient();
  const toast = useToast();
  const [register]= useRegisterMutation();
  return (
    <>
    <NavBar/>
    <Wrapper varient="small">
      <Formik
        initialValues={{ username: "", password: "", email: "", phone: "" }}
        onSubmit={async (value, { setErrors }) => {
          const res = await register({variables: value});
          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else if (res.data?.register.user) {
            client.resetStore();
            toast(
              {
                title: "注册成功",
                duration: 3000,
                isClosable: true,
                status: "success"
              }
            );
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

export default Register;
