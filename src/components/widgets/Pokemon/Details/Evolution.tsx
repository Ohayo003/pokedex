import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import "@fontsource/inter";
import pikatchu from "public/assets/background/login-image.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import Card from "src/components/widgets/Card";
import { GetPokemon_pokemon_element } from "../../../../types/GetPokemon";
import { GetPokemon_pokemon_pokemon_v2_pokemonspecy } from "src/types/GetPokemon";
import colorTypes from "src/utils/colorTypes";
import { object } from "yup";
import usePokemonHelper from "src/hooks/usePokemonHelper";

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
          There are currently a total of{" "}
          {evolution.evolutionChain?.evolutions.length} Pokémon in the{" "}
          {capitalizedName} family. {capitalizedName} evolves from{" "}
          {evovleFromData?.name!} which costs 25 Candy.
        </Text>
      </Box>
      <Card mt={4} p={8}>
        <VStack gap={6}>
          {evolution?.evolutionChain?.evolutions.map((item, idx) => {
            return (
              <HStack gap="11.5rem" key={idx}>
                <VStack gap={2}>
                  <Box
                    width="5.5rem"
                    height="5.5rem"
                    overflow="hidden"
                    borderRadius="md"
                    background={colorTypes(element[0].type?.name!)}
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

                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="sm"
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
                    fontSize="16px"
                    lineHeight="26px"
                    color="text.default"
                  >
                    {item.evolveTrigger.length
                      ? item.evolveTrigger[0].min_level === null
                        ? "?"
                        : item.evolveTrigger[0].min_level
                      : 0}
                  </Text>
                </VStack>
                <VStack gap={2}>
                  <Box
                    width="5.5rem"
                    height="5.5rem"
                    overflow="hidden"
                    background={colorTypes(element[0].type?.name!)}
                    borderRadius="md"
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.id}.png`}
                      alt="pikatchu"
                      layout="responsive"
                      width={10}
                      height={9}
                    />
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
