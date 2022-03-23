import {
  Box,
  HStack,
  VStack,
  Text,
  Grid,
  Table,
  Tr,
  Tbody,
  Th,
  Td,
} from "@chakra-ui/react";
import React from "react";
import "@fontsource/inter";
import { Flex } from "@chakra-ui/react";
import Card from "src/components/widgets/Card";
import SkillCard from "src/components/widgets/SkillCard";
import {
  GetPokemon_pokemon_moves,
  GetPokemon_pokemon_abilities,
} from "src/types/GetPokemon";

type MovesType = {
  moves: GetPokemon_pokemon_moves[];
  abilities: GetPokemon_pokemon_abilities[];
};

const Moves = ({ moves, abilities }: MovesType) => {
  console.log(moves);

  return (
    <Box>
      <Card>
        <Flex pl={12} pr={12} pt={6} pb={6} justify="space-between">
          <VStack align="left" gap={6}>
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="26px"
              color="text.blue400"
            >
              Quick Moves
            </Text>
            <HStack gap={10}>
              {abilities.map((ability, idx) => {
                return (
                  <SkillCard
                    key={idx}
                    name={ability.ability?.name!}
                    borderColor="text.blue200"
                    bg="text.blue50"
                    color="text.blue700"
                  />
                );
              })}
            </HStack>
          </VStack>

          {/* <Box>
            <Table
              width="18.563rem"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="14px"
              lineHeight="17px"
              color="text.gray100"
            >
              <Tr>
                <Td>Damage</Td>
                <Td>DPS</Td>
                <Td>EPS</Td>
              </Tr>
              <Tbody>
                {Array(2)
                  .fill(null)
                  .map((item, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>10</Td>
                        <Td>10</Td>
                        <Td>10</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Box> */}
        </Flex>
      </Card>

      <Card mt={8} overflowY="scroll" scrollBehavior="smooth" height="341px">
        <Flex pl={12} pr={12} pt={6} pb={6} justify="space-between">
          <VStack align="left" gap="18px">
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="26px"
              color="text.blue400"
            >
              Main Moves
            </Text>
            {moves.map((item, idx) => {
              return (
                <SkillCard
                  key={idx}
                  name={item.move?.name!}
                  borderColor="text.blue200"
                  bg="text.blue50"
                  color="text.blue700"
                />
              );
            })}
          </VStack>
          <Box>
            <Grid
              width="18.563rem"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="14px"
              lineHeight="17px"
              justifyContent="center"
              borderBottom="1px solid white"
              color="text.gray100"
              templateColumns="repeat(3, 1fr)"
              py="12px"
              px="23px"
            >
              <Box width="99px">
                <Text textAlign="center">Damage</Text>
              </Box>
              <Box width="99px">
                <Text textAlign="center">DPS</Text>
              </Box>
              <Box width="99px">
                <Text textAlign="center">EPS</Text>
              </Box>
            </Grid>
            {moves.map((m, idx) => {
              return (
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  key={idx}
                  borderBottom="1px solid white"
                  justifyContent="right"
                  alignItems="center"
                  justifyItems="right"
                  width="18.563rem"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="600"
                  height="52px"
                  fontSize="14px"
                  pr={6}
                  lineHeight="17px"
                  color="text.gray100"
                >
                  <Text textAlign="right" height="19px" width="74px">
                    {m.move?.power}
                  </Text>
                  <Text textAlign="right" height="19px" width="74px">
                    {m.move?.pp}
                  </Text>
                  <Text textAlign="right" height="19px" width="74px">
                    {m.move?.pp}
                  </Text>
                </Grid>
              );
            })}
            {/* <Table
              width="18.563rem"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="14px"
              lineHeight="17px"
              color="text.gray100"
            >
              <Tr>
                <Td>Damage</Td>
                <Td>DPS</Td>
                <Td>EPS</Td>
              </Tr>
              <Tbody>
                {moves.map((item, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{item.move?.power}</Td>
                      <Td>{item.move?.pp}</Td>
                      <Td>10</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table> */}
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Moves;
