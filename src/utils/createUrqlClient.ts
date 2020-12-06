import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { LoginMutation, MeQuery, MeDocument, RegisterMutation, LogoutMutation } from "../generated/graphql";
import { updateQuery } from "./updateQuery";

export const createUrqlClient = (ssrExchange:any) => ({
  url: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, info) => {
          updateQuery<LoginMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query;
              } else
                return {
                  me: result.login.user,
                };
            }
          );
        },
        register: (_result, args, cache, info) => {
          updateQuery<RegisterMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.register.errors) {
                return query;
              } else
                return {
                  me: result.register.user,
                };
            }
          );
          
        },
        logout: (_result, args, cache, info) => {
          updateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (!result.logout) {
                return query;
              } else
                return {
                  me: null,
                };
            }
          );
        }
      },
    },
  }),ssrExchange, fetchExchange],
});