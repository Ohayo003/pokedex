import { Box, Tag, Text } from "@chakra-ui/react";
import React from "react";
import "@fontsource/public-sans";

interface ITagCards {
  name: string;
  borderColor: string;
  bg: string;
  color: string;
}
const TagCards = ({ name, borderColor, bg, color }: ITagCards) => {
  return (
    <Tag
      border="1px solid "
      px={2}
      borderColor={borderColor}
      background={bg}
      // display="flex"
      justifyContent="center"
      // alignItems="center"
      textAlign="center"
      variant="solid"
      fontFamily="Public Sans"
      fontStyle="normal"
      fontWeight="400"
      fontSize="md"
      lineHeight="xl"
      color={color}
    >
      {name}
    </Tag>
  );
};

export default TagCards;
