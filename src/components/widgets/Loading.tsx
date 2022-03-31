import React from "react";
import { VStack, Spinner, Text, Box } from "@chakra-ui/react";
import FallBackImage from "./FallBackImage";
import Image from "next/image";
import charmanderLoader from "public/assets/images/loader.gif";

interface ILoading {
  loadingText?: string;
}

const Loading = ({ loadingText }: ILoading) => {
  return (
    <VStack height="100vh" align="center" justify="center">
      {/* <Spinner size="xl" thickness="6px" color="green" speed="0.65s" /> */}
      <Box position="relative" height="15rem" width="15rem">
        <Image
          src="/assets/images/loader.gif"
          alt="charmander loader"
          layout="fill"
        />
      </Box>
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
