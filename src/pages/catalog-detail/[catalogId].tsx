import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Layout } from '../../components/Layout';
import { useCatalogDetailQuery } from '../../generated/graphql';


const catalogDetail: NextPage<{id: string}> = ({id}) => {
  const {data, loading} = useCatalogDetailQuery({variables: {catalogId: parseInt(id)}});
  return (
    <>
      <Layout>
        {JSON.stringify(data?.catalog)}
      </Layout>
    </>
  );
}

catalogDetail.getInitialProps =  ({ query }) => {
  return {
    id: query.catalogId as string,
  };
};

export default catalogDetail;