import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import "@fontsource/inter";
import pikatchu from "public/assets/background/login-image.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import Card from "../../Card";

const Evolution = () => {
  return (
    <Box>
      <Box width="25.188rem">
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          fontSize="sm"
          color="text.default"
          lineHeight="21px"
        >
          There are currently a total of 9 Pokémon in the Eevee family. Flareon
          evolves from Eevee which costs 25 Candy.
        </Text>
      </Box>
      <Card mt={4} p={8}>
        <VStack gap={6}>
          {Array(6)
            .fill(null)
            .map((item, idx) => {
              return (
                <HStack gap="11.5rem" key={idx}>
                  <VStack gap={2}>
                    <Box
                      width="5.5rem"
                      height="5.5rem"
                      overflow="hidden"
                      borderRadius="md"
                    >
                      <Image src={pikatchu} alt="pikatchu" />
                    </Box>

                    <Text
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="400"
                      fontSize="sm"
                      color="text.default"
                      lineHeight="21px"
                    >
                      Pikatchu
                    </Text>
                  </VStack>
                  <VStack>
                    <Icon
                      as={FaLongArrowAltRight}
                      fill="primary"
                      width={8}
                      height={8}
                    />
                    <Text
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="600"
                      fontSize="16px"
                      lineHeight="26px"
                      color="text.default"
                    >
                      25
                    </Text>
                  </VStack>
                  <VStack gap={2}>
                    <Box
                      width="5.5rem"
                      height="5.5rem"
                      overflow="hidden"
                      borderRadius="md"
                    >
                      <Image src={pikatchu} alt="pikatchu" />
                    </Box>

                    <Text
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="400"
                      fontSize="sm"
                      color="text.default"
                      lineHeight="21px"
                    >
                      Pikatchu
                    </Text>
                  </VStack>
                </HStack>
              );
            })}
        </VStack>
      </Card>
    </Box>
  );
};

export default Evolution;
