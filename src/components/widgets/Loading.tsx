import React from "react";
import { VStack, Spinner, Text } from "@chakra-ui/react";

interface ILoading {
  loadingText?: string;
}

const Loading = ({ loadingText }: ILoading) => {
  return (
    <VStack height="100vh" align="center" justify="center">
      <Spinner size="xl" thickness="6px" color="green" speed="0.65s" />
      <Text
        fontWeight="bold"
        fontStyle="italic"
        fontFamily="Inter"
        fontSize="lg"
        letterSpacing="wider"
        color="text.light"
      >
        {loadingText}
      </Text>
    </VStack>
  );
};

export default Loading;
