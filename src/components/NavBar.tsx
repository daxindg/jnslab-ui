import { useApolloClient } from "@apollo/client";
import { Button, Flex, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data, loading: fetchingMe } = useMeQuery({ skip: isServer() });
  const [logout, { loading: fetchingLogout }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  let body = null;
  if (data?.me) {
    body = (
      <>
        <NextLink href="#">
          <Button
            isLoading={fetchingLogout}
            variant="link"
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
            }}
          >
            登出
          </Button>
        </NextLink>
        <NextLink href="#">
          <Link ml={3}>{data.me.username}</Link>
        </NextLink>
      </>
    );
  } else if (!fetchingMe) {
    body = (
      <>
        <NextLink href="/login">
          <Link ml={3}>登录</Link>
        </NextLink>
        <NextLink href="/register">
          <Link ml={3}>注册</Link>
        </NextLink>
      </>
    );
  }
  return (
    <Flex position="sticky" top="0" bg="tan" p="4" justifyContent="center">
      <NextLink href="/">
        <Link ml={3}>主页</Link>
      </NextLink>
      <NextLink href="/new-catalog">
        <Link ml={3}>新建目录</Link>
      </NextLink>
      <Spacer />
      {body}
    </Flex>
  );
};
