import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Switch,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLogoutMutation, useMeQuery, User } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { testEdit } from "../utils/permissions";
import { Search } from "./Search";
interface NavBarProps {}

const UserMenu: React.FC<{ me: User }> = ({ me }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout, { loading: fetchingLogout }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const router = useRouter();
  return (
    <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <MenuButton
        pl={3}
        pr={1}
        as={Button}
        color="green.400"
        bg="transparent"
        _focus={{ boxShadow: "none" }}
        rightIcon={<ChevronDownIcon />}
      >
        {me.username}
      </MenuButton>
      <MenuList width={30}>
        <MenuItem
          as={Button}
          bg="transparent"
          px={3}
          borderRadius="0px"
          _focus={{ boxShadow: "none" }}
          onClick={async () => {
            router.push("/borrows");
          }}
        >
          我的借阅
        </MenuItem>
        <MenuItem
          as={Button}
          bg="transparent"
          px={3}
          borderRadius="0px"
          _focus={{ boxShadow: "none" }}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
        >
          退出登录
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const ManageMenu: React.FC<{}> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <MenuButton
        pl={3}
        pr={1}
        as={Button}
        color="black.400"
        bg="transparent"
        _focus={{ boxShadow: "none" }}
        rightIcon={<ChevronDownIcon />}
      >
        管理
      </MenuButton>
      <MenuList width={30}>
        <MenuItem
          as={Button}
          bg="transparent"
          px={3}
          borderRadius="0px"
          _focus={{ boxShadow: "none" }}
          onClick={async () => {
            router.push("/pendings");
          }}
        >
          借阅管理
        </MenuItem>
        <MenuItem
          as={Button}
          bg="transparent"
          px={3}
          borderRadius="0px"
          _focus={{ boxShadow: "none" }}
          onClick={async () => {
            router.push("/new-journal");
          }}
        >
          期刊征订
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, loading: fetchingMe } = useMeQuery({ skip: isServer() });

  return (
    <Flex shadow="md" position="sticky" top="0" p="4" justifyContent="center">
      <Flex
        maxWidth="1440px"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <NextLink href="/">
          <Link
            color="gray.700"
            as={Heading}
            fontSize="lg"
            children={["期刊管理系统"]}
            ml={3}
          />
        </NextLink>

        <Spacer />
        <Search />
        {!data?.me ? (
          <>
            <NextLink href="/login">
              <Link ml={3}>登录</Link>
            </NextLink>
            <NextLink href="/register">
              <Link ml={3}>注册</Link>
            </NextLink>
          </>
        ) : (
          <>
            {!testEdit(data.me.permission) ? null : <ManageMenu />}
            <UserMenu me={data.me as any} />
          </>
        )}
        <Divider ml={3} mr={3} h="30px" orientation="vertical" />
        <Flex>
          <Switch
            size="sm"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
          <MoonIcon ml={1} />
        </Flex>
      </Flex>
    </Flex>
  );
};
