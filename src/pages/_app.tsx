import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";
import Head from "next/head";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          catalogs: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          // getPendings: {
          //   keyArgs: false,
          //   merge(existing = [], incoming) {
          //     return [...existing, ...incoming];
          //   },
          // },
          getBorrows: {
            keyArgs: ["isReturned"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          searchArticle: {
            keyArgs: ["searchText"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          searchJournal: {
            keyArgs: ["searchText"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>期刊管理系统</title>
      </Head>
      <ApolloProvider client={client}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
