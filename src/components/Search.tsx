import { NetworkStatus } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Radio,
  RadioGroup,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik, useField } from "formik";
import NextLink from "next/link";
import React, { InputHTMLAttributes, useState } from "react";
import {
  useSearchArticleLazyQuery,
  useSearchJournalLazyQuery,
} from "../generated/graphql";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  isSubmitting: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
  isSubmitting,
  size: _,
  ...props
}) => {
  const [fields, { error }] = useField(props);

  return (
    <FormControl mx="auto" isInvalid={!!error}>
      <InputGroup>
        <Input borderRadius="10px 0 0 10px" {...fields} {...props} />
        <InputRightAddon
          children={
            <IconButton
              type="submit"
              isLoading={isSubmitting}
              aria-label="search"
              _hover={{
                backgroundColor: "transparent",
                color: "blue.500",
              }}
              icon={<SearchIcon />}
            />
          }
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </InputGroup>
    </FormControl>
  );
};

export const Search: React.FC<{}> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [
    searchArticle,
    {
      loading: loadingArticles,
      fetchMore: fetchMoreArticle,
      data: articeRes,
      networkStatus: artNetStatus,
    },
  ] = useSearchArticleLazyQuery({ notifyOnNetworkStatusChange: true });
  const [
    searchJournal,
    {
      loading: loadingJournals,
      fetchMore: fetchMoreJournal,
      data: journalRes,
      networkStatus: jouNetStatus,
    },
  ] = useSearchJournalLazyQuery({ notifyOnNetworkStatusChange: true });
  const [hasMoreArticle, setHasMoreArticle] = useState(true);
  const [hasMoreJournal, setHasMoreJournal] = useState(true);
  const [alen, setalen] = useState(0);
  const [jlen, setjlen] = useState(0);

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="search"
        borderRadius="50%"
        _focus={{ boxShadow: "none" }}
        _hover={{ bgColor: "transparent", color: "blue.400" }}
        bg="transparent"
        icon={<SearchIcon />}
      />
      <Drawer size="lg" isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>搜索</DrawerHeader>

            <DrawerBody minH={40}>
              <Flex zIndex={233} justify="center">
                <Tabs width="70vw">
                  <TabList>
                    <Tab>期刊</Tab>
                    <Tab>文章</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Formik
                        initialValues={{ searchText: "" }}
                        onSubmit={async (values) => {
                          searchJournal({
                            variables: {
                              ...values,
                            },
                          });
                          setjlen(0);
                          setHasMoreJournal(true);
                        }}
                      >
                        {({ isSubmitting }) => {
                          return (
                            <Form>
                              <SearchInput
                                placeholder="输入期刊名或ISSN检索"
                                isSubmitting={loadingJournals}
                                name="searchText"
                              />
                            </Form>
                          );
                        }}
                      </Formik>
                      <Flex width="100%" justifyContent="flex-start"></Flex>
                      {!journalRes?.searchJournal ? null : (
                        <>
                          <Table variant="simple" mt={8}>
                            <Thead>
                              <Tr textAlign="center">
                                <Th>期刊名</Th>
                                <Th>ISSN</Th>
                                <Th>出版周期</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {journalRes.searchJournal.map((journal) => (
                                <Tr>
                                  <Td>
                                    <NextLink
                                      href={`/journal-detail/${journal.id}`}
                                    >
                                      <Link>{journal.title}</Link>
                                    </NextLink>
                                  </Td>
                                  <Td>{journal.issn}</Td>
                                  <Td>{journal.period}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                          <Flex justify="center" mt={8}>
                            <Button
                              isLoading={
                                loadingJournals ||
                                jouNetStatus === NetworkStatus.fetchMore
                              }
                              disabled={!hasMoreJournal}
                              onClick={async () => {
                                if (jlen === journalRes.searchJournal.length) {
                                  setHasMoreJournal(false);
                                  return;
                                }
                                setjlen(journalRes.searchJournal.length);
                                if (fetchMoreJournal)
                                  await fetchMoreJournal({
                                    variables: {
                                      cursor: journalRes.searchJournal
                                        .map((e) => e.id)
                                        .reduce((a, b) => Math.min(a, b)),
                                      limit: 10,
                                    },
                                  });
                              }}
                            >
                              {hasMoreJournal ? "加载更多" : "下面没有啦"}
                            </Button>
                          </Flex>
                        </>
                      )}
                    </TabPanel>
                    <TabPanel>
                      <Formik
                        initialValues={{ type: "title", searchText: "" }}
                        onSubmit={async (values) => {
                          searchArticle({
                            variables: {
                              ...values,
                            },
                          });
                          setalen(0);
                          setHasMoreArticle(true);
                          return true;
                        }}
                      >
                        {({ isSubmitting }) => {
                          return (
                            <Form>
                              <SearchInput
                                isSubmitting={loadingArticles}
                                name="searchText"
                              />
                              <RadioGroup defaultValue="title">
                                <Field name="type" value="title" as={Radio}>
                                  标题
                                </Field>
                                <Field name="type" value="author" as={Radio}>
                                  作者
                                </Field>
                                <Field name="type" value="keywords" as={Radio}>
                                  关键词
                                </Field>
                              </RadioGroup>
                            </Form>
                          );
                        }}
                      </Formik>
                      <Flex width="100%" justifyContent="flex-start"></Flex>
                      {!articeRes?.searchArticle ? null : (
                        <>
                          <Table variant="simple">
                            <Thead>
                              <Tr textAlign="center">
                                <Th>标题</Th>
                                <Th>作者</Th>
                                <Th>关键词</Th>
                                <Th>页码</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {articeRes.searchArticle.map((article) => (
                                <Tr>
                                  <Td>
                                    <NextLink
                                      href={`/issue-detail/${article.issueId}`}
                                    >
                                      <Link>{article.title}</Link>
                                    </NextLink>
                                  </Td>
                                  <Td>{article.authors}</Td>
                                  <Td>{article.keywords}</Td>
                                  <Td>{`pp.${article.pbegin}-${article.pend}`}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                          <Flex justify="center" mt={8}>
                            <Button
                              isLoading={
                                loadingArticles ||
                                artNetStatus === NetworkStatus.fetchMore
                              }
                              disabled={!hasMoreArticle}
                              onClick={async () => {
                                if (alen === articeRes.searchArticle.length) {
                                  setHasMoreArticle(false);
                                  return;
                                }
                                setalen(articeRes.searchArticle.length);
                                if (fetchMoreArticle)
                                  await fetchMoreArticle({
                                    variables: {
                                      cursor: articeRes.searchArticle
                                        .map((e) => e.id)
                                        .reduce((a, b) => Math.min(a, b)),
                                      limit: 10,
                                    },
                                  });
                              }}
                            >
                              {hasMoreArticle ? "加载更多" : "下面没有啦"}
                            </Button>
                          </Flex>
                        </>
                      )}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
