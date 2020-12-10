import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';

interface forgotPasswordProps{

}

const forgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [mailSended, setMailSended] = useState<boolean>();
  return (
    <><NavBar />
    <Wrapper varient="small">
      {mailSended ? (<Flex justifyContent="center"><Text>邮件已发送</Text></Flex>): (
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (value, {setErrors}) => {
          const res = await forgotPassword({variables: value});
          if (res.data?.forgotPassword) setMailSended(true);
          else setErrors({email: "邮箱非法"})
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="注册邮箱"
              type="email"
              label="注册邮箱"
              required
            />

            <Flex justifyContent="space-between" alignItems="baseline">
              <Button
                mt={4}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                发送邮件
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      )}
    </Wrapper></>
  );
}

export default forgotPassword;