import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  journals: Array<Journal>;
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
    & { journals: Array<(
      { __typename?: 'Journal' }
      & Pick<Journal, 'id' | 'year' | 'vol' | 'no' | 'total' | 'rem'>
    )> }
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

export function useCreateCatalogMutation() {
  return Urql.useMutation<CreateCatalogMutation, CreateCatalogMutationVariables>(CreateCatalogDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
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

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
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

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${RegularFieldErrorsFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
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

export function useCatalogDetailQuery(options: Omit<Urql.UseQueryArgs<CatalogDetailQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CatalogDetailQuery>({ query: CatalogDetailDocument, ...options });
};
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

export function useCatalogsQuery(options: Omit<Urql.UseQueryArgs<CatalogsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CatalogsQuery>({ query: CatalogsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};