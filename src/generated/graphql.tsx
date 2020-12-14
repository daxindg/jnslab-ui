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
  catalogs: Array<Journal>;
  journal?: Maybe<Journal>;
  searchJournal: Array<Journal>;
  me?: Maybe<User>;
  issueCatalog: Array<Issue>;
  issue?: Maybe<Issue>;
  borrowedBy: Array<Borrow>;
  articleCatalog: Array<Article>;
  article?: Maybe<Article>;
  searchArticle: Array<Article>;
  getBorrows: Array<Borrow>;
  getPendings: Array<Borrow>;
};


export type QueryCatalogsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
};


export type QueryJournalArgs = {
  detail?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
};


export type QuerySearchJournalArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
  searchText: Scalars['String'];
};


export type QueryIssueArgs = {
  detail?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
};


export type QueryBorrowedByArgs = {
  id: Scalars['Int'];
};


export type QueryArticleArgs = {
  detail?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
};


export type QuerySearchArticleArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  searchText: Scalars['String'];
};


export type QueryGetBorrowsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
  isReturned: Scalars['Boolean'];
};


export type QueryGetPendingsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
};

export type Journal = {
  __typename?: 'Journal';
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
  issues?: Maybe<Array<Issue>>;
};


export type Issue = {
  __typename?: 'Issue';
  id: Scalars['Int'];
  year: Scalars['Int'];
  vol: Scalars['Int'];
  no: Scalars['Int'];
  total: Scalars['Int'];
  rem: Scalars['Int'];
  journalId: Scalars['Int'];
  articles: Array<Article>;
  journal: Journal;
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['Int'];
  title: Scalars['String'];
  authors: Scalars['String'];
  keywords: Scalars['String'];
  pbegin: Scalars['Int'];
  pend: Scalars['Int'];
  issueId: Scalars['Int'];
  issue: Issue;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  permission?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Borrow = {
  __typename?: 'Borrow';
  id: Scalars['Int'];
  state: Scalars['Int'];
  expireAt: Scalars['DateTime'];
  borrowAt: Scalars['DateTime'];
  returnAt?: Maybe<Scalars['DateTime']>;
  createAt: Scalars['DateTime'];
  issueId: Scalars['Int'];
  userId: Scalars['Int'];
  user: User;
  issue: Issue;
};

export type Mutation = {
  __typename?: 'Mutation';
  createJournal: JournalResponse;
  updateJournal: JournalResponse;
  deleteJournal: Scalars['Boolean'];
  setPermission: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: UserResponse;
  createIssue: IssueResponse;
  updateIssue: IssueResponse;
  deleteIssue: Scalars['Boolean'];
  createArticle: ArticleResponse;
  updateArticle: ArticleResponse;
  deleteArticle: Scalars['Boolean'];
  borrow?: Maybe<Borrow>;
  return?: Maybe<Borrow>;
  accept?: Maybe<Borrow>;
  reject?: Maybe<Borrow>;
};


export type MutationCreateJournalArgs = {
  inputs: JournalInputs;
};


export type MutationUpdateJournalArgs = {
  inputs: JournalInputs;
  id: Scalars['Int'];
};


export type MutationDeleteJournalArgs = {
  id: Scalars['Int'];
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


export type MutationCreateIssueArgs = {
  inputs: IssueInputs;
  journalId: Scalars['Int'];
};


export type MutationUpdateIssueArgs = {
  inputs: IssueInputs;
  id: Scalars['Int'];
};


export type MutationDeleteIssueArgs = {
  id: Scalars['Int'];
};


export type MutationCreateArticleArgs = {
  inputs: ArticleInputs;
  issueId: Scalars['Int'];
};


export type MutationUpdateArticleArgs = {
  inputs: ArticleInputs;
  id: Scalars['Int'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Int'];
};


export type MutationBorrowArgs = {
  id: Scalars['Int'];
};


export type MutationReturnArgs = {
  id: Scalars['Int'];
};


export type MutationAcceptArgs = {
  id: Scalars['Int'];
};


export type MutationRejectArgs = {
  id: Scalars['Int'];
};

export type JournalResponse = {
  __typename?: 'JournalResponse';
  errors?: Maybe<Array<FieldError>>;
  journal?: Maybe<Journal>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type JournalInputs = {
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

export type IssueResponse = {
  __typename?: 'IssueResponse';
  errors?: Maybe<Array<FieldError>>;
  issue?: Maybe<Issue>;
};

export type IssueInputs = {
  year: Scalars['Int'];
  vol: Scalars['Int'];
  no: Scalars['Int'];
  total: Scalars['Int'];
  rem?: Maybe<Scalars['Int']>;
};

export type ArticleResponse = {
  __typename?: 'ArticleResponse';
  errors?: Maybe<Array<FieldError>>;
  article?: Maybe<Article>;
};

export type ArticleInputs = {
  title: Scalars['String'];
  authors: Scalars['String'];
  keywords: Scalars['String'];
  pbegin?: Maybe<Scalars['Int']>;
  pend?: Maybe<Scalars['Int']>;
};

export type ArticleFragmentFragment = (
  { __typename?: 'Article' }
  & Pick<Article, 'id' | 'title' | 'authors' | 'keywords' | 'pbegin' | 'pend' | 'issueId'>
);

export type IssueFragmentFragment = (
  { __typename?: 'Issue' }
  & Pick<Issue, 'id' | 'year' | 'vol' | 'no' | 'total' | 'rem' | 'journalId'>
);

export type JournalFragmentFragment = (
  { __typename?: 'Journal' }
  & Pick<Journal, 'id' | 'title' | 'issn' | 'period' | 'cn' | 'yfdh' | 'organizer' | 'pub_place'>
);

export type RegularFieldErrorsFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'permission'>
);

export type CreateArticleMutationVariables = Exact<{
  inputs: ArticleInputs;
  issueId: Scalars['Int'];
}>;


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & { createArticle: (
    { __typename?: 'ArticleResponse' }
    & { article?: Maybe<(
      { __typename?: 'Article' }
      & ArticleFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularFieldErrorsFragment
    )>> }
  ) }
);

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteArticleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteArticle'>
);

export type UpdateArticleMutationVariables = Exact<{
  inputs: ArticleInputs;
  id: Scalars['Int'];
}>;


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { updateArticle: (
    { __typename?: 'ArticleResponse' }
    & { article?: Maybe<(
      { __typename?: 'Article' }
      & ArticleFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularFieldErrorsFragment
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
      & UserFragmentFragment
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
      & UserFragmentFragment
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

export type AcceptMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AcceptMutation = (
  { __typename?: 'Mutation' }
  & { accept?: Maybe<(
    { __typename?: 'Borrow' }
    & Pick<Borrow, 'id' | 'state'>
  )> }
);

export type BorrowMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BorrowMutation = (
  { __typename?: 'Mutation' }
  & { borrow?: Maybe<(
    { __typename?: 'Borrow' }
    & Pick<Borrow, 'id'>
  )> }
);

export type RejectMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RejectMutation = (
  { __typename?: 'Mutation' }
  & { reject?: Maybe<(
    { __typename?: 'Borrow' }
    & Pick<Borrow, 'id' | 'state'>
  )> }
);

export type ReturnMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReturnMutation = (
  { __typename?: 'Mutation' }
  & { return?: Maybe<(
    { __typename?: 'Borrow' }
    & Pick<Borrow, 'id' | 'state'>
  )> }
);

export type CreateIssueMutationVariables = Exact<{
  inputs: IssueInputs;
  journalId: Scalars['Int'];
}>;


export type CreateIssueMutation = (
  { __typename?: 'Mutation' }
  & { createIssue: (
    { __typename?: 'IssueResponse' }
    & { issue?: Maybe<(
      { __typename?: 'Issue' }
      & IssueFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteIssueMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteIssueMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteIssue'>
);

export type UpdateIssueMutationVariables = Exact<{
  inputs: IssueInputs;
  id: Scalars['Int'];
}>;


export type UpdateIssueMutation = (
  { __typename?: 'Mutation' }
  & { updateIssue: (
    { __typename?: 'IssueResponse' }
    & { issue?: Maybe<(
      { __typename?: 'Issue' }
      & IssueFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularFieldErrorsFragment
    )>> }
  ) }
);

export type CreateJournalMutationVariables = Exact<{
  title: Scalars['String'];
  issn: Scalars['String'];
  period: Scalars['String'];
  cn?: Maybe<Scalars['String']>;
  yfdh?: Maybe<Scalars['String']>;
  organizer?: Maybe<Scalars['String']>;
  pub_place?: Maybe<Scalars['String']>;
}>;


export type CreateJournalMutation = (
  { __typename?: 'Mutation' }
  & { createJournal: (
    { __typename?: 'JournalResponse' }
    & { journal?: Maybe<(
      { __typename?: 'Journal' }
      & JournalFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteJournalMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteJournalMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteJournal'>
);

export type UpdateJournalMutationVariables = Exact<{
  id: Scalars['Int'];
  inputs: JournalInputs;
}>;


export type UpdateJournalMutation = (
  { __typename?: 'Mutation' }
  & { updateJournal: (
    { __typename?: 'JournalResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, journal?: Maybe<(
      { __typename?: 'Journal' }
      & JournalFragmentFragment
    )> }
  ) }
);

export type BorrowedByQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BorrowedByQuery = (
  { __typename?: 'Query' }
  & { borrowedBy: Array<(
    { __typename?: 'Borrow' }
    & Pick<Borrow, 'id' | 'userId' | 'borrowAt' | 'expireAt' | 'state'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type CatalogsQueryVariables = Exact<{
  cursor?: Scalars['Int'];
  limit?: Scalars['Int'];
}>;


export type CatalogsQuery = (
  { __typename?: 'Query' }
  & { catalogs: Array<(
    { __typename?: 'Journal' }
    & Pick<Journal, 'id' | 'title' | 'issn' | 'cn' | 'period' | 'createdAt' | 'updatedAt'>
  )> }
);

export type GetBorrowsQueryVariables = Exact<{
  isReturned: Scalars['Boolean'];
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetBorrowsQuery = (
  { __typename?: 'Query' }
  & { getBorrows: Array<(
    { __typename?: 'Borrow' }
    & Pick<Borrow, 'expireAt' | 'borrowAt' | 'returnAt' | 'state' | 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), issue: (
      { __typename?: 'Issue' }
      & Pick<Issue, 'id' | 'no'>
      & { journal: (
        { __typename?: 'Journal' }
        & Pick<Journal, 'title'>
      ) }
    ) }
  )> }
);

export type GetPendingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPendingsQuery = (
  { __typename?: 'Query' }
  & { getPendings: Array<(
    { __typename?: 'Borrow' }
    & Pick<Borrow, 'id' | 'state' | 'borrowAt' | 'expireAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), issue: (
      { __typename?: 'Issue' }
      & Pick<Issue, 'id' | 'no'>
      & { journal: (
        { __typename?: 'Journal' }
        & Pick<Journal, 'id' | 'title'>
      ) }
    ) }
  )> }
);

export type IssueDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IssueDetailQuery = (
  { __typename?: 'Query' }
  & { issue?: Maybe<(
    { __typename?: 'Issue' }
    & Pick<Issue, 'id' | 'year' | 'vol' | 'no' | 'total' | 'rem' | 'journalId'>
    & { articles: Array<(
      { __typename?: 'Article' }
      & ArticleFragmentFragment
    )> }
  )> }
);

export type JournalDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type JournalDetailQuery = (
  { __typename?: 'Query' }
  & { journal?: Maybe<(
    { __typename?: 'Journal' }
    & Pick<Journal, 'id' | 'title' | 'issn' | 'cn' | 'yfdh' | 'period' | 'pub_place' | 'organizer' | 'createdAt' | 'updatedAt'>
    & { issues?: Maybe<Array<(
      { __typename?: 'Issue' }
      & IssueFragmentFragment
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type SearchArticleQueryVariables = Exact<{
  searchText: Scalars['String'];
  type: Scalars['String'];
  cursor?: Scalars['Int'];
  limit?: Scalars['Int'];
}>;


export type SearchArticleQuery = (
  { __typename?: 'Query' }
  & { searchArticle: Array<(
    { __typename?: 'Article' }
    & ArticleFragmentFragment
  )> }
);

export type SearchJournalQueryVariables = Exact<{
  searchText: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type SearchJournalQuery = (
  { __typename?: 'Query' }
  & { searchJournal: Array<(
    { __typename?: 'Journal' }
    & JournalFragmentFragment
  )> }
);

export const ArticleFragmentFragmentDoc = gql`
    fragment ArticleFragment on Article {
  id
  title
  authors
  keywords
  pbegin
  pend
  issueId
}
    `;
export const IssueFragmentFragmentDoc = gql`
    fragment IssueFragment on Issue {
  id
  year
  vol
  no
  total
  rem
  journalId
}
    `;
export const JournalFragmentFragmentDoc = gql`
    fragment JournalFragment on Journal {
  id
  title
  issn
  period
  cn
  yfdh
  organizer
  pub_place
}
    `;
export const RegularFieldErrorsFragmentDoc = gql`
    fragment RegularFieldErrors on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
  permission
}
    `;
export const CreateArticleDocument = gql`
    mutation CreateArticle($inputs: ArticleInputs!, $issueId: Int!) {
  createArticle(inputs: $inputs, issueId: $issueId) {
    article {
      ...ArticleFragment
    }
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${ArticleFragmentFragmentDoc}
${RegularFieldErrorsFragmentDoc}`;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *      issueId: // value for 'issueId'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, baseOptions);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: Int!) {
  deleteArticle(id: $id)
}
    `;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, baseOptions);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($inputs: ArticleInputs!, $id: Int!) {
  updateArticle(inputs: $inputs, id: $id) {
    article {
      ...ArticleFragment
    }
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${ArticleFragmentFragmentDoc}
${RegularFieldErrorsFragmentDoc}`;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, baseOptions);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
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
      ...UserFragment
    }
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${UserFragmentFragmentDoc}
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
      ...UserFragment
    }
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${UserFragmentFragmentDoc}
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
export const AcceptDocument = gql`
    mutation Accept($id: Int!) {
  accept(id: $id) {
    id
    state
  }
}
    `;
export type AcceptMutationFn = Apollo.MutationFunction<AcceptMutation, AcceptMutationVariables>;

/**
 * __useAcceptMutation__
 *
 * To run a mutation, you first call `useAcceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptMutation, { data, loading, error }] = useAcceptMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptMutation(baseOptions?: Apollo.MutationHookOptions<AcceptMutation, AcceptMutationVariables>) {
        return Apollo.useMutation<AcceptMutation, AcceptMutationVariables>(AcceptDocument, baseOptions);
      }
export type AcceptMutationHookResult = ReturnType<typeof useAcceptMutation>;
export type AcceptMutationResult = Apollo.MutationResult<AcceptMutation>;
export type AcceptMutationOptions = Apollo.BaseMutationOptions<AcceptMutation, AcceptMutationVariables>;
export const BorrowDocument = gql`
    mutation Borrow($id: Int!) {
  borrow(id: $id) {
    id
  }
}
    `;
export type BorrowMutationFn = Apollo.MutationFunction<BorrowMutation, BorrowMutationVariables>;

/**
 * __useBorrowMutation__
 *
 * To run a mutation, you first call `useBorrowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBorrowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [borrowMutation, { data, loading, error }] = useBorrowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBorrowMutation(baseOptions?: Apollo.MutationHookOptions<BorrowMutation, BorrowMutationVariables>) {
        return Apollo.useMutation<BorrowMutation, BorrowMutationVariables>(BorrowDocument, baseOptions);
      }
export type BorrowMutationHookResult = ReturnType<typeof useBorrowMutation>;
export type BorrowMutationResult = Apollo.MutationResult<BorrowMutation>;
export type BorrowMutationOptions = Apollo.BaseMutationOptions<BorrowMutation, BorrowMutationVariables>;
export const RejectDocument = gql`
    mutation Reject($id: Int!) {
  reject(id: $id) {
    id
    state
  }
}
    `;
export type RejectMutationFn = Apollo.MutationFunction<RejectMutation, RejectMutationVariables>;

/**
 * __useRejectMutation__
 *
 * To run a mutation, you first call `useRejectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectMutation, { data, loading, error }] = useRejectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRejectMutation(baseOptions?: Apollo.MutationHookOptions<RejectMutation, RejectMutationVariables>) {
        return Apollo.useMutation<RejectMutation, RejectMutationVariables>(RejectDocument, baseOptions);
      }
export type RejectMutationHookResult = ReturnType<typeof useRejectMutation>;
export type RejectMutationResult = Apollo.MutationResult<RejectMutation>;
export type RejectMutationOptions = Apollo.BaseMutationOptions<RejectMutation, RejectMutationVariables>;
export const ReturnDocument = gql`
    mutation Return($id: Int!) {
  return(id: $id) {
    id
    state
  }
}
    `;
export type ReturnMutationFn = Apollo.MutationFunction<ReturnMutation, ReturnMutationVariables>;

/**
 * __useReturnMutation__
 *
 * To run a mutation, you first call `useReturnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnMutation, { data, loading, error }] = useReturnMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReturnMutation(baseOptions?: Apollo.MutationHookOptions<ReturnMutation, ReturnMutationVariables>) {
        return Apollo.useMutation<ReturnMutation, ReturnMutationVariables>(ReturnDocument, baseOptions);
      }
export type ReturnMutationHookResult = ReturnType<typeof useReturnMutation>;
export type ReturnMutationResult = Apollo.MutationResult<ReturnMutation>;
export type ReturnMutationOptions = Apollo.BaseMutationOptions<ReturnMutation, ReturnMutationVariables>;
export const CreateIssueDocument = gql`
    mutation CreateIssue($inputs: IssueInputs!, $journalId: Int!) {
  createIssue(inputs: $inputs, journalId: $journalId) {
    issue {
      ...IssueFragment
    }
    errors {
      field
      message
    }
  }
}
    ${IssueFragmentFragmentDoc}`;
export type CreateIssueMutationFn = Apollo.MutationFunction<CreateIssueMutation, CreateIssueMutationVariables>;

/**
 * __useCreateIssueMutation__
 *
 * To run a mutation, you first call `useCreateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIssueMutation, { data, loading, error }] = useCreateIssueMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *      journalId: // value for 'journalId'
 *   },
 * });
 */
export function useCreateIssueMutation(baseOptions?: Apollo.MutationHookOptions<CreateIssueMutation, CreateIssueMutationVariables>) {
        return Apollo.useMutation<CreateIssueMutation, CreateIssueMutationVariables>(CreateIssueDocument, baseOptions);
      }
export type CreateIssueMutationHookResult = ReturnType<typeof useCreateIssueMutation>;
export type CreateIssueMutationResult = Apollo.MutationResult<CreateIssueMutation>;
export type CreateIssueMutationOptions = Apollo.BaseMutationOptions<CreateIssueMutation, CreateIssueMutationVariables>;
export const DeleteIssueDocument = gql`
    mutation DeleteIssue($id: Int!) {
  deleteIssue(id: $id)
}
    `;
export type DeleteIssueMutationFn = Apollo.MutationFunction<DeleteIssueMutation, DeleteIssueMutationVariables>;

/**
 * __useDeleteIssueMutation__
 *
 * To run a mutation, you first call `useDeleteIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIssueMutation, { data, loading, error }] = useDeleteIssueMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteIssueMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIssueMutation, DeleteIssueMutationVariables>) {
        return Apollo.useMutation<DeleteIssueMutation, DeleteIssueMutationVariables>(DeleteIssueDocument, baseOptions);
      }
export type DeleteIssueMutationHookResult = ReturnType<typeof useDeleteIssueMutation>;
export type DeleteIssueMutationResult = Apollo.MutationResult<DeleteIssueMutation>;
export type DeleteIssueMutationOptions = Apollo.BaseMutationOptions<DeleteIssueMutation, DeleteIssueMutationVariables>;
export const UpdateIssueDocument = gql`
    mutation UpdateIssue($inputs: IssueInputs!, $id: Int!) {
  updateIssue(inputs: $inputs, id: $id) {
    issue {
      ...IssueFragment
    }
    errors {
      ...RegularFieldErrors
    }
  }
}
    ${IssueFragmentFragmentDoc}
${RegularFieldErrorsFragmentDoc}`;
export type UpdateIssueMutationFn = Apollo.MutationFunction<UpdateIssueMutation, UpdateIssueMutationVariables>;

/**
 * __useUpdateIssueMutation__
 *
 * To run a mutation, you first call `useUpdateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIssueMutation, { data, loading, error }] = useUpdateIssueMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateIssueMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIssueMutation, UpdateIssueMutationVariables>) {
        return Apollo.useMutation<UpdateIssueMutation, UpdateIssueMutationVariables>(UpdateIssueDocument, baseOptions);
      }
export type UpdateIssueMutationHookResult = ReturnType<typeof useUpdateIssueMutation>;
export type UpdateIssueMutationResult = Apollo.MutationResult<UpdateIssueMutation>;
export type UpdateIssueMutationOptions = Apollo.BaseMutationOptions<UpdateIssueMutation, UpdateIssueMutationVariables>;
export const CreateJournalDocument = gql`
    mutation CreateJournal($title: String!, $issn: String!, $period: String!, $cn: String, $yfdh: String, $organizer: String, $pub_place: String) {
  createJournal(
    inputs: {title: $title, issn: $issn, period: $period, cn: $cn, yfdh: $yfdh, organizer: $organizer, pub_place: $pub_place}
  ) {
    journal {
      ...JournalFragment
    }
    errors {
      field
      message
    }
  }
}
    ${JournalFragmentFragmentDoc}`;
export type CreateJournalMutationFn = Apollo.MutationFunction<CreateJournalMutation, CreateJournalMutationVariables>;

/**
 * __useCreateJournalMutation__
 *
 * To run a mutation, you first call `useCreateJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJournalMutation, { data, loading, error }] = useCreateJournalMutation({
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
export function useCreateJournalMutation(baseOptions?: Apollo.MutationHookOptions<CreateJournalMutation, CreateJournalMutationVariables>) {
        return Apollo.useMutation<CreateJournalMutation, CreateJournalMutationVariables>(CreateJournalDocument, baseOptions);
      }
export type CreateJournalMutationHookResult = ReturnType<typeof useCreateJournalMutation>;
export type CreateJournalMutationResult = Apollo.MutationResult<CreateJournalMutation>;
export type CreateJournalMutationOptions = Apollo.BaseMutationOptions<CreateJournalMutation, CreateJournalMutationVariables>;
export const DeleteJournalDocument = gql`
    mutation DeleteJournal($id: Int!) {
  deleteJournal(id: $id)
}
    `;
export type DeleteJournalMutationFn = Apollo.MutationFunction<DeleteJournalMutation, DeleteJournalMutationVariables>;

/**
 * __useDeleteJournalMutation__
 *
 * To run a mutation, you first call `useDeleteJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJournalMutation, { data, loading, error }] = useDeleteJournalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJournalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJournalMutation, DeleteJournalMutationVariables>) {
        return Apollo.useMutation<DeleteJournalMutation, DeleteJournalMutationVariables>(DeleteJournalDocument, baseOptions);
      }
export type DeleteJournalMutationHookResult = ReturnType<typeof useDeleteJournalMutation>;
export type DeleteJournalMutationResult = Apollo.MutationResult<DeleteJournalMutation>;
export type DeleteJournalMutationOptions = Apollo.BaseMutationOptions<DeleteJournalMutation, DeleteJournalMutationVariables>;
export const UpdateJournalDocument = gql`
    mutation UpdateJournal($id: Int!, $inputs: JournalInputs!) {
  updateJournal(id: $id, inputs: $inputs) {
    errors {
      field
      message
    }
    journal {
      ...JournalFragment
    }
  }
}
    ${JournalFragmentFragmentDoc}`;
export type UpdateJournalMutationFn = Apollo.MutationFunction<UpdateJournalMutation, UpdateJournalMutationVariables>;

/**
 * __useUpdateJournalMutation__
 *
 * To run a mutation, you first call `useUpdateJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJournalMutation, { data, loading, error }] = useUpdateJournalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useUpdateJournalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJournalMutation, UpdateJournalMutationVariables>) {
        return Apollo.useMutation<UpdateJournalMutation, UpdateJournalMutationVariables>(UpdateJournalDocument, baseOptions);
      }
export type UpdateJournalMutationHookResult = ReturnType<typeof useUpdateJournalMutation>;
export type UpdateJournalMutationResult = Apollo.MutationResult<UpdateJournalMutation>;
export type UpdateJournalMutationOptions = Apollo.BaseMutationOptions<UpdateJournalMutation, UpdateJournalMutationVariables>;
export const BorrowedByDocument = gql`
    query BorrowedBy($id: Int!) {
  borrowedBy(id: $id) {
    id
    userId
    borrowAt
    expireAt
    state
    user {
      username
    }
  }
}
    `;

/**
 * __useBorrowedByQuery__
 *
 * To run a query within a React component, call `useBorrowedByQuery` and pass it any options that fit your needs.
 * When your component renders, `useBorrowedByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBorrowedByQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBorrowedByQuery(baseOptions: Apollo.QueryHookOptions<BorrowedByQuery, BorrowedByQueryVariables>) {
        return Apollo.useQuery<BorrowedByQuery, BorrowedByQueryVariables>(BorrowedByDocument, baseOptions);
      }
export function useBorrowedByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BorrowedByQuery, BorrowedByQueryVariables>) {
          return Apollo.useLazyQuery<BorrowedByQuery, BorrowedByQueryVariables>(BorrowedByDocument, baseOptions);
        }
export type BorrowedByQueryHookResult = ReturnType<typeof useBorrowedByQuery>;
export type BorrowedByLazyQueryHookResult = ReturnType<typeof useBorrowedByLazyQuery>;
export type BorrowedByQueryResult = Apollo.QueryResult<BorrowedByQuery, BorrowedByQueryVariables>;
export const CatalogsDocument = gql`
    query Catalogs($cursor: Int! = 0, $limit: Int! = 20) {
  catalogs(cursor: $cursor, limit: $limit) {
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
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
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
export const GetBorrowsDocument = gql`
    query GetBorrows($isReturned: Boolean!, $cursor: Int = 0, $limit: Int = 10) {
  getBorrows(isReturned: $isReturned, cursor: $cursor, limit: $limit) {
    user {
      id
      username
    }
    issue {
      id
      no
      journal {
        title
      }
    }
    expireAt
    borrowAt
    returnAt
    state
    id
  }
}
    `;

/**
 * __useGetBorrowsQuery__
 *
 * To run a query within a React component, call `useGetBorrowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBorrowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBorrowsQuery({
 *   variables: {
 *      isReturned: // value for 'isReturned'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBorrowsQuery(baseOptions: Apollo.QueryHookOptions<GetBorrowsQuery, GetBorrowsQueryVariables>) {
        return Apollo.useQuery<GetBorrowsQuery, GetBorrowsQueryVariables>(GetBorrowsDocument, baseOptions);
      }
export function useGetBorrowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBorrowsQuery, GetBorrowsQueryVariables>) {
          return Apollo.useLazyQuery<GetBorrowsQuery, GetBorrowsQueryVariables>(GetBorrowsDocument, baseOptions);
        }
export type GetBorrowsQueryHookResult = ReturnType<typeof useGetBorrowsQuery>;
export type GetBorrowsLazyQueryHookResult = ReturnType<typeof useGetBorrowsLazyQuery>;
export type GetBorrowsQueryResult = Apollo.QueryResult<GetBorrowsQuery, GetBorrowsQueryVariables>;
export const GetPendingsDocument = gql`
    query GetPendings {
  getPendings {
    id
    state
    borrowAt
    expireAt
    user {
      id
      username
    }
    issue {
      id
      no
      journal {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useGetPendingsQuery__
 *
 * To run a query within a React component, call `useGetPendingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPendingsQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingsQuery, GetPendingsQueryVariables>) {
        return Apollo.useQuery<GetPendingsQuery, GetPendingsQueryVariables>(GetPendingsDocument, baseOptions);
      }
export function useGetPendingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingsQuery, GetPendingsQueryVariables>) {
          return Apollo.useLazyQuery<GetPendingsQuery, GetPendingsQueryVariables>(GetPendingsDocument, baseOptions);
        }
export type GetPendingsQueryHookResult = ReturnType<typeof useGetPendingsQuery>;
export type GetPendingsLazyQueryHookResult = ReturnType<typeof useGetPendingsLazyQuery>;
export type GetPendingsQueryResult = Apollo.QueryResult<GetPendingsQuery, GetPendingsQueryVariables>;
export const IssueDetailDocument = gql`
    query IssueDetail($id: Int!) {
  issue(id: $id, detail: true) {
    id
    year
    vol
    no
    total
    rem
    journalId
    articles {
      ...ArticleFragment
    }
  }
}
    ${ArticleFragmentFragmentDoc}`;

/**
 * __useIssueDetailQuery__
 *
 * To run a query within a React component, call `useIssueDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssueDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssueDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIssueDetailQuery(baseOptions: Apollo.QueryHookOptions<IssueDetailQuery, IssueDetailQueryVariables>) {
        return Apollo.useQuery<IssueDetailQuery, IssueDetailQueryVariables>(IssueDetailDocument, baseOptions);
      }
export function useIssueDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssueDetailQuery, IssueDetailQueryVariables>) {
          return Apollo.useLazyQuery<IssueDetailQuery, IssueDetailQueryVariables>(IssueDetailDocument, baseOptions);
        }
export type IssueDetailQueryHookResult = ReturnType<typeof useIssueDetailQuery>;
export type IssueDetailLazyQueryHookResult = ReturnType<typeof useIssueDetailLazyQuery>;
export type IssueDetailQueryResult = Apollo.QueryResult<IssueDetailQuery, IssueDetailQueryVariables>;
export const JournalDetailDocument = gql`
    query JournalDetail($id: Int!) {
  journal(id: $id, detail: true) {
    id
    title
    issn
    cn
    yfdh
    period
    pub_place
    organizer
    createdAt
    updatedAt
    issues {
      ...IssueFragment
    }
  }
}
    ${IssueFragmentFragmentDoc}`;

/**
 * __useJournalDetailQuery__
 *
 * To run a query within a React component, call `useJournalDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useJournalDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJournalDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJournalDetailQuery(baseOptions: Apollo.QueryHookOptions<JournalDetailQuery, JournalDetailQueryVariables>) {
        return Apollo.useQuery<JournalDetailQuery, JournalDetailQueryVariables>(JournalDetailDocument, baseOptions);
      }
export function useJournalDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JournalDetailQuery, JournalDetailQueryVariables>) {
          return Apollo.useLazyQuery<JournalDetailQuery, JournalDetailQueryVariables>(JournalDetailDocument, baseOptions);
        }
export type JournalDetailQueryHookResult = ReturnType<typeof useJournalDetailQuery>;
export type JournalDetailLazyQueryHookResult = ReturnType<typeof useJournalDetailLazyQuery>;
export type JournalDetailQueryResult = Apollo.QueryResult<JournalDetailQuery, JournalDetailQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

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
export const SearchArticleDocument = gql`
    query SearchArticle($searchText: String!, $type: String!, $cursor: Int! = 0, $limit: Int! = 10) {
  searchArticle(
    searchText: $searchText
    type: $type
    cursor: $cursor
    limit: $limit
  ) {
    ...ArticleFragment
  }
}
    ${ArticleFragmentFragmentDoc}`;

/**
 * __useSearchArticleQuery__
 *
 * To run a query within a React component, call `useSearchArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchArticleQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      type: // value for 'type'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchArticleQuery(baseOptions: Apollo.QueryHookOptions<SearchArticleQuery, SearchArticleQueryVariables>) {
        return Apollo.useQuery<SearchArticleQuery, SearchArticleQueryVariables>(SearchArticleDocument, baseOptions);
      }
export function useSearchArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchArticleQuery, SearchArticleQueryVariables>) {
          return Apollo.useLazyQuery<SearchArticleQuery, SearchArticleQueryVariables>(SearchArticleDocument, baseOptions);
        }
export type SearchArticleQueryHookResult = ReturnType<typeof useSearchArticleQuery>;
export type SearchArticleLazyQueryHookResult = ReturnType<typeof useSearchArticleLazyQuery>;
export type SearchArticleQueryResult = Apollo.QueryResult<SearchArticleQuery, SearchArticleQueryVariables>;
export const SearchJournalDocument = gql`
    query SearchJournal($searchText: String!, $cursor: Int = 0, $limit: Int = 10) {
  searchJournal(searchText: $searchText, cursor: $cursor, limit: $limit) {
    ...JournalFragment
  }
}
    ${JournalFragmentFragmentDoc}`;

/**
 * __useSearchJournalQuery__
 *
 * To run a query within a React component, call `useSearchJournalQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchJournalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchJournalQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchJournalQuery(baseOptions: Apollo.QueryHookOptions<SearchJournalQuery, SearchJournalQueryVariables>) {
        return Apollo.useQuery<SearchJournalQuery, SearchJournalQueryVariables>(SearchJournalDocument, baseOptions);
      }
export function useSearchJournalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchJournalQuery, SearchJournalQueryVariables>) {
          return Apollo.useLazyQuery<SearchJournalQuery, SearchJournalQueryVariables>(SearchJournalDocument, baseOptions);
        }
export type SearchJournalQueryHookResult = ReturnType<typeof useSearchJournalQuery>;
export type SearchJournalLazyQueryHookResult = ReturnType<typeof useSearchJournalLazyQuery>;
export type SearchJournalQueryResult = Apollo.QueryResult<SearchJournalQuery, SearchJournalQueryVariables>;