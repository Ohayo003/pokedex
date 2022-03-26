import {
  Box,
  HStack,
  VStack,
  Text,
  Progress,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import "@fontsource/inter";
import { BiChevronDown } from "react-icons/bi";
import Card from "src/components/widgets/Card";
import TagCards from "src/components/widgets/TagCards";
import { GetPokemon } from "src/types/GetPokemon";
import { usePokemonHelper } from "src/hooks/usePokemonHelper";
import { useEffect } from "react";
import getWeaknessess from "src/utils/getWeaknessess";
import getResistance from "src/utils/getResistance";
import colorTypes from "src/utils/colorTypes";

type StatisticsType = {
  pokemon: GetPokemon["pokemon"];
};

const Statistics = ({ pokemon }: StatisticsType) => {
  const [weakness, setWeakness] = useState<string[]>([]);
  const [resistance, setResistance] = useState<string[]>([]);
  const basicStats = [
    {
      name: "HP",
      color: "red",
    },
    {
      name: "ATK",
      color: "text.amber",
    },
    {
      name: "DEF",
      color: "teal",
    },
    {
      name: "SATK",
      color: "orange",
    },
    {
      name: "SDEF",
      color: "gray",
    },
    {
      name: "SPD",
      color: "purple",
    },
  ];

  useEffect(() => {
    (async function getWeaknessAndResistance() {
      const weaknesses = await getWeaknessess(pokemon?.element!);
      const resistance = await getResistance(pokemon?.element!);

      ///removes the duplicate in resistance array
      const uniqueResistance = resistance.reduce<string[]>((array, obj) => {
        return array.includes(obj.name) ? array : [...array, obj.name];
      }, []);

      ///removes the duplicate in weakness array
      const uniqueWeakness = weaknesses.reduce<string[]>((array, obj) => {
        return array.includes(obj.name) ? array : [...array, obj.name];
      }, []);
      setResistance(uniqueResistance);
      setWeakness(uniqueWeakness);
    })();
  }, [pokemon?.element]);

  console.log(resistance);

  return (
    <Box>
      <Box
        height="13.25rem"
        width={{ lg: "49.938rem", base: "35rem" }}
        display="flex"
        border="1px solid white"
        alignItems="center"
        background="background.gray800"
        p={6}
        borderRadius="md"
        borderColor="gray500"
      >
        <VStack justify="center" width={{ base: "inherit", lg: "" }}>
          {basicStats.map((stat, idx) => {
            return (
              <HStack key={idx}>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="500"
                  width={{ lg: "4rem", base: "4rem" }}
                  lineHeight="26px"
                  textAlign="left"
                  color="text.default"
                >
                  {stat.name}
                </Text>
                <Box pl={2} pr={4} width={{ lg: "40rem", base: "25rem" }}>
                  <Progress
                    value={pokemon?.stats[idx].base_stat}
                    size="xs"
                    colorScheme={stat.color}
                  />
                </Box>
                <Text
                  key={idx}
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="26px"
                  color="text.default"
                >
                  {pokemon?.stats[idx].base_stat}
                  {"%"}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </Box>

      <Card
        mt={12}
        position="relative"
        display="flex"
        justifyItems="center"
        justifyContent="center"
        alignItems="center"
        width={{ lg: "inherit", base: "35rem" }}
      >
        <VStack width="49.938rem" align="left" p={6}>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="26px"
            color="text.blue400"
          >
            Weakness
          </Text>
          <Flex flexWrap="wrap" gap={4} pt={4}>
            {weakness.map((item, idx) => {
              return (
                <Box key={idx}>
                  <HStack gap={6}>
                    <TagCards
                      name={item}
                      borderColor="#FECACA"
                      bg={colorTypes(item)}
                      color="text.light"
                    />
                  </HStack>
                </Box>
              );
            })}
          </Flex>
        </VStack>
      </Card>

      <Card
        mt={9}
        position="relative"
        display="flex"
        justifyItems="center"
        width={{ lg: "inherit", base: "35rem" }}
        // justifyContent="center"
        alignItems="center"
      >
        <VStack align="left" width="49.938rem" p={6}>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="26px"
            color="text.blue400"
          >
            Resistant
          </Text>
          <Flex flexWrap="wrap" gap={4} pt={6}>
            {resistance.map((item, idx) => {
              return (
                <Box key={idx}>
                  <HStack gap={4}>
                    <TagCards
                      name={item}
                      borderColor="#A7F3D0"
                      bg={colorTypes(item)}
                      color="text.light"
                    />
                  </HStack>
                </Box>
              );
            })}
          </Flex>
        </VStack>
      </Card>
    </Box>
  );
};

export default Statistics;
