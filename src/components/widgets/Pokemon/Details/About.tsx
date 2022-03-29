import { Box, VStack, Text, HStack, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import "@fontsource/inter";
import Card from "src/components/widgets/Card";
import { GetPokemon } from "src/types/GetPokemon";
import { usePokemonHelper } from "src/hooks/usePokemonHelper";
import TagCards from "src/components/widgets/TagCards";

type AboutType = {
  pokemon: GetPokemon["pokemon"];
};

const About = ({ pokemon }: AboutType) => {
  const { getGenderValue, getGenderPercentage } = usePokemonHelper({
    gender_rate: pokemon?.pokemon_v2_pokemonspecy?.gender_rate!,
  });

  console.log(pokemon?.pokemon_v2_pokemonspecy?.eggroups);

  return (
    <Box>
      <Text
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        fontSize={{ lg: "md", base: "2xl" }}
        lineHeight="26px"
        color="text.default"
      >
        {pokemon?.pokemon_v2_pokemonspecy?.description.map((d) => {
          return d.flavor_text;
        })}
      </Text>
      <Box pt={8}>
        <Card
          width="16.375rem"
          height="6.75rem"
          display="flex"
          justifyContent="center"
        >
          <HStack align="center" gap={7}>
            <VStack align="left">
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="26px"
                color="text.blue400"
              >
                Weight
              </Text>
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="26px"
                color="text.light"
              >
                {pokemon?.weight} KG
              </Text>
            </VStack>
            <Divider orientation="vertical" borderColor="gray700" height={12} />
            <VStack align="left">
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="26px"
                color="text.blue400"
              >
                Height
              </Text>
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="26px"
                color="text.light"
              >
                {pokemon?.height} M
              </Text>
            </VStack>
          </HStack>
        </Card>
        <Box pt={8}>
          <Card
            height="7rem"
            border="1px solid #718096"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <VStack align="left" width={{ lg: "40rem" }}>
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="26px"
                color="text.blue400"
              >
                Breed
              </Text>
              <HStack gap={8}>
                <HStack gap={2}>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="26px"
                    color="text.gray400"
                  >
                    Gender:
                  </Text>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="26px"
                    color="text.light"
                  >
                    {getGenderPercentage()}% {getGenderValue()}
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="26px"
                    color="text.gray400"
                  >
                    Egg Group:
                  </Text>
                  <Flex flexDirection="column" gap={2}>
                    {pokemon?.pokemon_v2_pokemonspecy?.eggroups.length! &&
                      pokemon.pokemon_v2_pokemonspecy?.eggroups.map(
                        (group, idx) => {
                          return (
                            <TagCards
                              key={idx}
                              name={group.names?.name!}
                              borderColor="white"
                              bg="gray500"
                              color="text.light"
                            />
                          );
                        }
                      )}
                  </Flex>
                </HStack>
                <HStack gap={2}>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="26px"
                    color="text.gray400"
                  >
                    Egg Cycle:
                  </Text>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="26px"
                    color="text.light"
                  >
                    {pokemon?.pokemon_v2_pokemonspecy?.hatch_counter!}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
