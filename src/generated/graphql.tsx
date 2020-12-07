import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  catalogs: Array<Catalog>;
  catalog?: Maybe<Catalog>;
  me?: Maybe<User>;
};


export type QueryCatalogArgs = {
  detail?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
};

export type Catalog = {
  __typename?: 'Catalog';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  issn?: Maybe<Scalars['String']>;
  cn?: Maybe<Scalars['String']>;
  yfdh?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  pub_place?: Maybe<Scalars['String']>;
  organizer?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  journals?: Maybe<Array<Journal>>;
};


export type Journal = {
  __typename?: 'Journal';
  id: Scalars['Int'];
  year: Scalars['Int'];
  vol: Scalars['Int'];
  no: Scalars['Int'];
  total: Scalars['Int'];
  rem: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  permission?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCatalog: CreateCatalogResponse;
  updateCatalog?: Maybe<Catalog>;
  deleteCatalog: Scalars['Boolean'];
  setPermission: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: UserResponse;
};


export type MutationCreateCatalogArgs = {
  inputs: CreateCatalogInputs;
};


export type MutationUpdateCatalogArgs = {
  yfdh?: Maybe<Scalars['String']>;
  origanizer?: Maybe<Scalars['String']>;
  pub_place?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  cn?: Maybe<Scalars['String']>;
  issn?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteCatalogArgs = {
  id: Scalars['Float'];
};


export type MutationSetPermissionArgs = {
  permission: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UserRegisterInputs;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type CreateCatalogResponse = {
  __typename?: 'CreateCatalogResponse';
  errors?: Maybe<Array<FieldError>>;
  catalog?: Maybe<Catalog>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CreateCatalogInputs = {
  title: Scalars['String'];
  issn: Scalars['String'];
  period: Scalars['String'];
  cn?: Maybe<Scalars['String']>;
  yfdh?: Maybe<Scalars['String']>;
  organizer?: Maybe<Scalars['String']>;
  pub_place?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserRegisterInputs = {
  username: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type RegularFieldErrorsFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'permission'>
);

export type CreateCatalogMutationVariables = Exact<{
  title: Scalars['String'];
  issn: Scalars['String'];
  period: Scalars['String'];
  cn?: Maybe<Scalars['String']>;
  yfdh?: Maybe<Scalars['String']>;
  organizer?: Maybe<Scalars['String']>;
  pub_place?: Maybe<Scalars['String']>;
}>;


export type CreateCatalogMutation = (
  { __typename?: 'Mutation' }
  & { createCatalog: (
    { __typename?: 'CreateCatalogResponse' }
    & { catalog?: Maybe<(
      { __typename?: 'Catalog' }
      & Pick<Catalog, 'id' | 'title' | 'issn' | 'period' | 'cn' | 'yfdh' | 'organizer' | 'pub_place'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularFieldErrorsFragment
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularFieldErrorsFragment
    )>> }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularFieldErrorsFragment
    )>> }
  ) }
);

export type CatalogDetailQueryVariables = Exact<{
  catalogId: Scalars['Int'];
}>;


export type CatalogDetailQuery = (
  { __typename?: 'Query' }
  & { catalog?: Maybe<(
    { __typename?: 'Catalog' }
    & Pick<Catalog, 'id' | 'title' | 'issn' | 'cn' | 'period' | 'createdAt' | 'updatedAt'>
    & { journals?: Maybe<Array<(
      { __typename?: 'Journal' }
      & Pick<Journal, 'id' | 'year' | 'vol' | 'no' | 'total' | 'rem'>
    )>> }
  )> }
);

export type CatalogsQueryVariables = Exact<{ [key: string]: never; }>;


export type CatalogsQuery = (
  { __typename?: 'Query' }
  & { catalogs: Array<(
    { __typename?: 'Catalog' }
    & Pick<Catalog, 'id' | 'title' | 'issn' | 'cn' | 'period' | 'createdAt' | 'updatedAt'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularFieldErrorsFragmentDoc = gql`
    fragment RegularFieldErrors on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  permission
}
    `;
export const CreateCatalogDocument = gql`
    mutation CreateCatalog($title: String!, $issn: String!, $period: String!, $cn: String, $yfdh: String, $organizer: String, $pub_place: String) {
  createCatalog(
    inputs: {title: $title, issn: $issn, period: $period, cn: $cn, yfdh: $yfdh, organizer: $organizer, pub_place: $pub_place}
  ) {
    catalog {
      id
      title
      issn
      period
      cn
      yfdh
      organizer
      pub_place
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateCatalogMutationFn = Apollo.MutationFunction<CreateCatalogMutation, CreateCatalogMutationVariables>;

/**
 * __useCreateCatalogMutation__
 *
 * To run a mutation, you first call `useCreateCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCatalogMutation, { data, loading, error }] = useCreateCatalogMutation({
 *   variables: {
 *      title: // value for 'title'
 *      issn: // value for 'issn'
 *      period: // value for 'period'
 *      cn: // value for 'cn'
 *      yfdh: // value for 'yfdh'
 *      organizer: // value for 'organizer'
 *      pub_place: // value for 'pub_place'
 *   },
 * });
 */
export function useCreateCatalogMutation(baseOptions?: Apollo.MutationHookOptions<CreateCatalogMutation, CreateCatalogMutationVariables>) {
        return Apollo.useMutation<CreateCatalogMutation, CreateCatalogMutationVariables>(CreateCatalogDocument, baseOptions);
      }
export type CreateCatalogMutationHookResult = ReturnType<typeof useCreateCatalogMutation>;
export type CreateCatalogMutationResult = Apollo.MutationResult<CreateCatalogMutation>;
export type CreateCatalogMutationOptions = Apollo.BaseMutationOptions<CreateCatalogMutation, CreateCatalogMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    user {
      ...RegularUser
    }
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularFieldErrorsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    user {
      ...RegularUser
    }
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularFieldErrorsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${RegularFieldErrorsFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CatalogDetailDocument = gql`
    query CatalogDetail($catalogId: Int!) {
  catalog(id: $catalogId, detail: true) {
    id
    title
    issn
    cn
    period
    createdAt
    updatedAt
    journals {
      id
      year
      vol
      no
      total
      rem
    }
  }
}
    `;

/**
 * __useCatalogDetailQuery__
 *
 * To run a query within a React component, call `useCatalogDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogDetailQuery({
 *   variables: {
 *      catalogId: // value for 'catalogId'
 *   },
 * });
 */
export function useCatalogDetailQuery(baseOptions: Apollo.QueryHookOptions<CatalogDetailQuery, CatalogDetailQueryVariables>) {
        return Apollo.useQuery<CatalogDetailQuery, CatalogDetailQueryVariables>(CatalogDetailDocument, baseOptions);
      }
export function useCatalogDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CatalogDetailQuery, CatalogDetailQueryVariables>) {
          return Apollo.useLazyQuery<CatalogDetailQuery, CatalogDetailQueryVariables>(CatalogDetailDocument, baseOptions);
        }
export type CatalogDetailQueryHookResult = ReturnType<typeof useCatalogDetailQuery>;
export type CatalogDetailLazyQueryHookResult = ReturnType<typeof useCatalogDetailLazyQuery>;
export type CatalogDetailQueryResult = Apollo.QueryResult<CatalogDetailQuery, CatalogDetailQueryVariables>;
export const CatalogsDocument = gql`
    query Catalogs {
  catalogs {
    id
    title
    issn
    cn
    period
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCatalogsQuery__
 *
 * To run a query within a React component, call `useCatalogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCatalogsQuery(baseOptions?: Apollo.QueryHookOptions<CatalogsQuery, CatalogsQueryVariables>) {
        return Apollo.useQuery<CatalogsQuery, CatalogsQueryVariables>(CatalogsDocument, baseOptions);
      }
export function useCatalogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CatalogsQuery, CatalogsQueryVariables>) {
          return Apollo.useLazyQuery<CatalogsQuery, CatalogsQueryVariables>(CatalogsDocument, baseOptions);
        }
export type CatalogsQueryHookResult = ReturnType<typeof useCatalogsQuery>;
export type CatalogsLazyQueryHookResult = ReturnType<typeof useCatalogsLazyQuery>;
export type CatalogsQueryResult = Apollo.QueryResult<CatalogsQuery, CatalogsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;