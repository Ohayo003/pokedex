import React from "react";
import { Text } from "@chakra-ui/react";
import "@fontsource/inter";

interface ILabel {
  label: string;
}

const Label = ({ label }: ILabel) => {
  return (
    <Text
      fontFamily="Inter"
      fontStyle="normal"
      fontWeight="500"
      fontSize="md"
      lineHeight="xl"
      color="text.light"
    >
      {label}
    </Text>
  );
};

export default Label;
