import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface ILinks {
  text?: string;
  linkname: string;
  navigation: string;
}

const Links = ({ text, linkname, navigation }: ILinks) => {
  return (
    <Box
      fontFamily="Inter"
      fontStyle="normal"
      fontWeight="400"
      fontSize="sm"
      display="flex"
      lineHeight="xl"
      color="text.light"
    >
      {text}
      <Link as="a" passHref href={navigation}>
        <Box _hover={{ cursor: "pointer" }} ml={1} color="text.link">
          {linkname}
        </Box>
      </Link>
    </Box>
  );
};

export default Links;
