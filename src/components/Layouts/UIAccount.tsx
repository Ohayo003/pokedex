import { Box, BoxProps, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface IUIAccount {
  heading: string;
  image: StaticImageData;
  alt: string;
}

const UIAccount = ({
  heading,
  image,
  alt,
  children,
}: IUIAccount & BoxProps) => {
  return (
    <Box bg="background.container">
      <Flex minH="100vh">
        <Box flexGrow={1} width="15rem" position="relative">
          <Image src={image} alt={alt} layout="fill" />
        </Box>
        <Flex flexGrow={1} ml={32} alignItems="center">
          <Stack align="left" w="25rem">
            <Box pb={8}>
              <Heading
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="700"
                fontSize="3rem"
                color="text.default"
              >
                {heading}
              </Heading>
            </Box>
            {children}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UIAccount;
