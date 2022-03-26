import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import "@fontsource/inter";
import { FaLongArrowAltRight } from "react-icons/fa";
import Card from "src/components/widgets/Card";
import { GetPokemon_pokemon_element } from "src/types/GetPokemon";
import { GetPokemon_pokemon_pokemon_v2_pokemonspecy } from "src/types/GetPokemon";
import colorTypes from "src/utils/colorTypes";
import { usePokemonHelper } from "src/hooks/usePokemonHelper";

type EvolutionType = {
  evolution: GetPokemon_pokemon_pokemon_v2_pokemonspecy;
  element: GetPokemon_pokemon_element[];
  name: string;
};

const Evolution = ({ evolution, element, name }: EvolutionType) => {
  const { capitalizedName, evovleFromData } = usePokemonHelper({
    evolution: evolution,
    name: name,
  });

  return (
    <Box
      mx={{ base: "20px", lg: "auto" }}
      width={{ base: "35rem", lg: "49.938rem" }}
    >
      <Box width={{ lg: "30rem", base: "35rem" }}>
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          color="text.default"
          fontSize="sm"
          lineHeight="21px"
        >
          There are currently a total of{" "}
          {evolution.evolutionChain?.evolutions.length} Pokémon in the{" "}
          {capitalizedName} family. {capitalizedName} evolves from{" "}
          {evovleFromData?.name!} which costs 25 Candy.
        </Text>
      </Box>
      <Card mt={4} p={8} width="">
        <VStack gap={6}>
          {evolution?.evolutionChain?.evolutions.map((item, idx) => {
            return (
              <HStack gap={{ lg: "11.5rem", base: "7rem" }} key={idx}>
                <VStack gap={2}>
                  <Box
                    width={{ lg: "5.5rem", base: "7rem" }}
                    height={{ lg: "5.5rem", base: "7rem" }}
                    p={1}
                    overflow="hidden"
                    borderRadius="md"
                    background={colorTypes(element[0].type?.name!)}
                  >
                    <Box
                      alignSelf="center"
                      background="whiteAlpha.800"
                      borderRadius={100}
                      borderWidth="2px 2px 6px 2px"
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
                          item.evolveFrom !== null ? item.evolveFrom : item.id
                        }.png`}
                        alt="pikatchu"
                        layout="responsive"
                        width={10}
                        height={9}
                      />
                    </Box>
                  </Box>

                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    color="text.default"
                    lineHeight="21px"
                  >
                    {item.evolveFrom !== null
                      ? item.evolveFrom === evovleFromData?.id
                        ? evovleFromData.name
                        : item.evolveFrom ===
                          evolution.evolutionChain?.evolutions[idx - 1].id
                        ? evolution.evolutionChain?.evolutions[idx - 1].name
                        : item.name
                      : item.name}
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
                    lineHeight="26px"
                    color="text.default"
                  >
                    {item.evolveTrigger.length
                      ? item.evolveTrigger[0].min_level === null
                        ? "?"
                        : item.evolveTrigger[0].min_level
                      : 1}
                  </Text>
                </VStack>
                <VStack gap={2}>
                  <Box
                    width={{ lg: "5.5rem", base: "7rem" }}
                    height={{ lg: "5.5rem", base: "7rem" }}
                    p={1}
                    overflow="hidden"
                    background={colorTypes(element[0].type?.name!)}
                    borderRadius="md"
                  >
                    <Box
                      alignSelf="center"
                      background="whiteAlpha.800"
                      borderRadius={100}
                      borderWidth="2px 2px 6px 2px"
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.id}.png`}
                        alt="pikatchu"
                        layout="responsive"
                        width={10}
                        height={9}
                      />
                    </Box>
                  </Box>

                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="sm"
                    color="text.default"
                    lineHeight="21px"
                  >
                    {item.name}
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
