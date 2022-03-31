import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const _404 = () => {
  const router = useRouter();
  return (
    <Flex
      justify="center"
      flexDirection="column"
      h="100vh"
      align="center"
      gap={5}
      color="text.light"
    >
      <Heading letterSpacing="widest" fontSize="9xl">
        Oops!
      </Heading>
      <HStack>
        <Text lineHeight="md" fontSize="4xl">
          404
        </Text>
        <Divider orientation="vertical" h={10} borderColor="black" />
        <Text lineHeight="md" fontSize="2xl">
          Page Not Found
        </Text>
      </HStack>

      <Text
        width="md"
        justifyContent="center"
        fontSize="md"
        letterSpacing="wider"
        textAlign="center"
        fontWeight="600"
      >
        The Page you are looking for might have been removed had its name
        changed or is temporarily unavailable
      </Text>

      <Button
        bg="transparent"
        color="primary"
        borderRadius="full"
        border="1px solid yellow"
        onClick={() => {
          router.back();
        }}
        _hover={{
          backgroundColor: "primary",
          color: "white",
          border: "1px solid yellow",
        }}
      >
        Go Back
      </Button>
    </Flex>
  );
};

export default _404;
