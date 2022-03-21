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
      <Flex minH="100vh" flexDirection={{ base: "column", lg: "row" }}>
        <Box flexGrow={{ base: 0, lg: 1 }} position="relative">
          <Image src={image} alt={alt} layout="fill" />
        </Box>
        <Flex
          flexGrow={{ lg: 1, base: 0 }}
          justify={{ base: "center", lg: "normal" }}
          alignItems="center"
        >
          <Stack
            align="left"
            ml={{ base: 0, lg: 32 }}
            minWidth={{ base: "375px", lg: "400px" }}
          >
            <Box
              pb={8}
              display={{ base: "flex", lg: "block" }}
              justifyContent={{ base: "center" }}
            >
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
