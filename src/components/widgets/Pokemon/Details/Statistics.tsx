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
import SkillCard from "src/components/widgets/SkillCard";
import { GetPokemon } from "src/types/GetPokemon";
import usePokemonHelper from "src/hooks/usePokemonHelper";
import { useEffect } from "react";
import getWeaknessess from "src/utils/getWeaknessess";
import getResistance from "../../../../utils/getResistance";

type StatisticsType = {
  pokemon: GetPokemon["pokemon"];
};

const Statistics = ({ pokemon }: StatisticsType) => {
  const [weakness, setWeakness] = useState<Record<string, any>[]>([]);
  const [resistance, setResistance] = useState<Record<string, any>[]>([]);
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
    (async function getWeakness() {
      const weaknesses = await getWeaknessess(pokemon?.element!);
      const resistance = await getResistance(pokemon?.element!);
      setResistance(resistance);
      setWeakness(weaknesses);
    })();
  }, [pokemon?.element]);

  console.log(resistance);

  return (
    <Box>
      <Box
        height="13.25rem"
        display="flex"
        alignItems="center"
        background="gray800"
        p={6}
        borderRadius="md"
        border="1px solid"
        borderColor="gray500"
      >
        <VStack justify="center">
          {basicStats.map((stat, idx) => {
            return (
              <HStack key={idx}>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="500"
                  width="4rem"
                  lineHeight="26px"
                  textAlign="left"
                  color="text.default"
                >
                  {stat.name}
                </Text>
                <Box pl={2} pr={4} width="38rem">
                  <Progress value={20} size="xs" colorScheme={stat.color} />
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
                    <SkillCard
                      name={item.name}
                      borderColor="#FECACA"
                      bg="#FEF2F2"
                      color="text.red700"
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
                    <SkillCard
                      name={item.name}
                      borderColor="#A7F3D0"
                      bg="#ECFDF5"
                      color="text.green700"
                    />
                  </HStack>
                </Box>
              );
            })}
          </Flex>
          <Box display="flex" justifyContent="end">
            <HStack justify="end">
              <Text color="primary">See more</Text>
              <Icon as={BiChevronDown} fill="primary" w={7} h={7} />
            </HStack>
          </Box>
        </VStack>
      </Card>
    </Box>
  );
};

export default Statistics;
