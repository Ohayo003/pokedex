import React from "react";
import { VStack, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <VStack height="100vh" align="center" justify="center">
      <Spinner size="xl" thickness="6px" color="green" speed="0.65s" />
    </VStack>
  );
};

export default Loading;
