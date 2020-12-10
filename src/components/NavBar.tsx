import { useApolloClient } from "@apollo/client";
import { MoonIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Spacer,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { testEdit } from "../utils/permissions";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { data, loading: fetchingMe } = useMeQuery({ skip: isServer() });
  const [logout, { loading: fetchingLogout }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  let body = <></>;
  if (data?.me) {
    body = (
      <>
        <Button
          isLoading={fetchingLogout}
          variant="link"
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
            router.push("/");
          }}
        >
          登出
        </Button>
        <NextLink href="#">
          <Link as={Flex} alignItems="center" p={0} ml={3}>
            {data.me.username}
          </Link>
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
    <Flex shadow="md" position="sticky" top="0" p="4" justifyContent="center">
      <Flex
        maxWidth="900px"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <NextLink href="/">
          <Link color="gray.700" as={Heading} ml={3}>
            期刊管理系统
          </Link>
        </NextLink>
        {!testEdit(data?.me?.permission) ? null : (
          <NextLink href="/new-journal">
            <Link ml={3}>新建目录</Link>
          </NextLink>
        )}
        <Spacer />
        {body}
        <Divider ml={3} mr={3} h="30px" orientation="vertical" />
        <Flex>
          <Switch size="sm" onChange={toggleColorMode} />
          <MoonIcon ml={1} />
        </Flex>
      </Flex>
    </Flex>
  );
};
