import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Issue } from "../../generated/graphql";
import { IssueItem } from "./IssueItem";

interface IssueGroupProps {
  title: string;
  issues: Issue[];
}

export const IssueGroup: React.FC<IssueGroupProps> = ({ title, issues }) => {
  return (
    <Box>
      <Heading pointerEvents="none" color="gray.400" fontSize="lg">{title}</Heading>
      <Box ml={5}>
        {issues.sort((a, b) => b.no - a.no).map((val, idx) => (
          <IssueItem issue={val} key={idx} />
        ))}
      </Box>
    </Box>
  );
};
