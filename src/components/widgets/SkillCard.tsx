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
      px={4}
      borderColor={borderColor}
      background={bg}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      fontFamily="Public Sans"
      fontStyle="normal"
      fontWeight="400"
      fontSize="0.75rem"
      lineHeight="14px"
      color={color}
    >
      {name}
    </Tag>
  );
};

export default SkillCard
