import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { Issue, useMeQuery } from "../../generated/graphql";
import { testEdit } from "../../utils/permissions";
import { IssueGroup } from "./IssueGroup";
import { NewIssuePopover } from "./NewIssueForm";

interface AllIssuesViewProps {
  issues: Issue[];
  journalId: number;
}

const IssuesInAge: React.FC<{
  title: string;
  data: Record<string, Issue[]>;
}> = ({ data, title }) => {
  const content = [];
  for (let key in data) {
    content.push(<IssueGroup title={key} issues={data[key]} key={key} />);
  }

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Heading textAlign="left" fontSize="3xl">
          {title}
        </Heading>
      </AccordionButton>
      <AccordionPanel ml={5} mr={5} pb={4}>
        {content.sort(
          (a, b) => parseInt(b.key as string) - parseInt(a.key as string)
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export const AllIssuesView: React.FC<AllIssuesViewProps> = ({
  issues,
  journalId,
}) => {
  const res: Record<string, Record<string, Issue[]>> = {};
  issues.forEach((it) => {
    const age = `${(it.year / 10) | 0}0`;
    const year = `${it.year}`;
    if (!res[age]) res[age] = {};
    if (!res[age][year]) res[age][year] = [];
    res[age][year].push(it);
  });
  const { data } = useMeQuery();
  const content = [];

  for (let age in res) {
    content.push(<IssuesInAge key={age} title={`${age}s`} data={res[age]} />);
  }

  return (
    <Box mt={8}>
      <Flex>
        <Heading ml={4} size="lg">
          期刊目录
        </Heading>
        {!testEdit(data?.me?.permission) ? null : (
          <NewIssuePopover journalId={journalId} />
        )}
      </Flex>

      <Accordion defaultIndex={[0]} allowMultiple>
        {content.sort(
          (a, b) => parseInt(b.key as string) - parseInt(a.key as string)
        )}
      </Accordion>
    </Box>
  );
};
