import { Box, Divider, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import "@fontsource/inter";
import Statistics from "./Statistics";
import About from "src/components/widgets/Pokemon/Details/About";
import Evolution from "src/components/widgets/Pokemon/Details/Evolution";
import Moves from "src/components/widgets/Pokemon/Details/Moves";
import { GetPokemon } from "src/types/GetPokemon";
import colorTypes from "src/utils/colorTypes";
import usePokemonHelper from "src/hooks/usePokemonHelper";

type PokemonDetailsType = {
  pokemon: GetPokemon["pokemon"];
};

const PokemonDetails = ({ pokemon }: PokemonDetailsType) => {
  const [currentSelected, setCurrentSelected] = useState(0);

  const { capitalizedName } = usePokemonHelper({ name: pokemon?.name! });

  const buttonName = ["About", "Statistics", "Evolutions", "Moves"];
  return (
    <VStack align="left" zIndex={1} width="49.938rem" pb={20}>
      <Text
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="700"
        fontSize="32px"
        color="text.default"
        lineHeight="130%"
        letterSpacing="widest"
      >
        {capitalizedName}
      </Text>
      <Flex gap={2}>
        {pokemon?.element?.map((name, idx) => {
          return (
            <Box
              key={idx}
              width="102px"
              height="35px"
              background={colorTypes(name.type?.name!)}
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              display="flex"
              py={2}
              borderRadius="full"
            >
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="19px"
                color="#F7FAFC"
              >
                {name.type?.name}
              </Text>
            </Box>
          );
        })}
      </Flex>

      {/** Buttons Section */}
      <HStack gap={4} pt={14}>
        {buttonName.map((item, idx) => {
          return (
            <Box
              key={idx}
              width="11.688rem"
              height="3rem"
              display="flex"
              justifyContent="center"
              onClick={() => setCurrentSelected(idx)}
              alignItems="center"
              background={currentSelected === idx ? "primary" : "#1F2937"}
              borderRadius="md"
              _hover={{
                cursor: "pointer",
                background: "primary",
              }}
            >
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="19px"
                color={currentSelected === idx ? "text.gray800" : "text.light"}
              >
                {item}
              </Text>
            </Box>
          );
        })}
      </HStack>
      <Box pt={14}>
        {currentSelected === 1 ? (
          <Statistics pokemon={pokemon!} />
        ) : currentSelected === 2 ? (
          <Evolution
            evolution={pokemon?.pokemon_v2_pokemonspecy!}
            element={pokemon?.element!}
            name={pokemon?.name!}
          />
        ) : currentSelected === 3 ? (
          <Moves moves={pokemon?.moves!} abilities={pokemon?.abilities!} />
        ) : (
          <About pokemon={pokemon!} />
        )}
      </Box>
    </VStack>
  );
};

export default PokemonDetails;
