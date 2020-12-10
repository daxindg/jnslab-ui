import { NextPage } from 'next';
import React from 'react';

interface issueDetailProps {
  id: number
}

const IssueDetail: NextPage<issueDetailProps> = ({id}) => {
  return (
    <></>
  );
}

IssueDetail.getInitialProps = ({query}) => {
  return {
    id: parseInt(query.id as string), 
  };
}

export default IssueDetail;