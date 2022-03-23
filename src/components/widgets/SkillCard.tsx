import { Box, Tag, Text } from "@chakra-ui/react";
import React from "react";
import "@fontsource/public-sans";

interface ISkillCard {
  name: string;
  borderColor: string;
  bg: string;
  color: string;
}
const SkillCard = ({ name, borderColor, bg, color }: ISkillCard) => {
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

export default SkillCard;
