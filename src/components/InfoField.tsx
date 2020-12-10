import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface InfoFieldProps {
  name:string;
  value?:string;
}

const displayName:Record<string, string> = {
  "issn": "ISSN",
  "cn" : "CN",
  "period": "出版周期",
  "pub_place": "出版地",
  "organizer": "主办单位"
}

export const InfoField: React.FC<InfoFieldProps> = ({name, value}) => {
  return (
    <Box ml={8} mb={3}>
      <Text  as="h4" fontSize="md">
        {displayName[name]}
      </Text>
      <Text color="gray.500" fontSize="sm">
        {value}
      </Text>
    </Box>
  );
};
