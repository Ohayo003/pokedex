import {
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import dragon from "public/assets/background/sign-up-image.png";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import PokemonDetails from "src/components/widgets/Pokemon/Details/PokemonDetails";

const PokemonId = () => {
  return (
    <Box mx="auto" minH="100vh">
      <Box w="fit-content" mx="auto">
        <Text
          mt={5}
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          fontSize="14px"
          lineHeight="17px"
          color="white"
        >
          Home &gt; Pokemon details
        </Text>
        <Flex
          mt={10}
          gap={16}
          w="fit-content"
          align={{ base: "center", lg: "start" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <VStack gap={9} align="left">
            <Box
              width="20.313rem"
              height="24.313rem"
              borderRadius="4px"
              position="relative"
              overflow="hidden"
            >
              <Image src={dragon} alt="dragaon" layout="fill" />
            </Box>

            {/**Carousel Container Section */}
            <HStack gap={5} justify="center">
              <Box
                width="2rem"
                height="2rem"
                border="1px solid"
                borderColor="gray500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={BiChevronLeft} w={6} h={6} fill="gray500" />
              </Box>
              <SimpleGrid columns={3} gap={2}>
                {Array(6)
                  .fill(null)
                  .map((item, idx) => {
                    return (
                      <Box
                        key={idx}
                        width="57px"
                        height="57px"
                        overflow="hidden"
                        borderRadius="4px"
                        _hover={{ cursor: "pointer" }}
                      >
                        <Image
                          src={dragon}
                          alt="dragon"
                          width="57px"
                          height="57px"
                          layout="responsive"
                        />
                      </Box>
                    );
                  })}
              </SimpleGrid>
              <Box
                width="2rem"
                height="2rem"
                border="1px solid"
                borderColor="primary"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={BiChevronRight} w={6} h={6} fill="primary" />
              </Box>
            </HStack>
          </VStack>

          {/** Pokemon Details Section */}
          <PokemonDetails />
        </Flex>
      </Box>
    </Box>
  );
};

export default PokemonId;

PokemonId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
