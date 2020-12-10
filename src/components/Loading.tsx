import { Flex, Heading, Spinner } from "@chakra-ui/react";
import React from "react";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <Flex justify="center" alignItems="center" direction="column">
      <Heading mb={8}>
        加载中
      </Heading>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};
