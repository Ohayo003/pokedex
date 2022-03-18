import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";

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
      lineHeight="xl"
      color="text.light"
    >
      {text}{" "}
      <Link href={navigation} color="text.link">
        {linkname}
      </Link>
    </Box>
  );
};

export default Links;
