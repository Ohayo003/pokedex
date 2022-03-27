import {
  Box,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
  Flex,
  type BoxProps,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import "@fontsource/inter";
import Statistics from "./Statistics";
import About from "src/components/widgets/Pokemon/Details/About";
import Evolution from "src/components/widgets/Pokemon/Details/Evolution";
import Moves from "src/components/widgets/Pokemon/Details/Moves";
import { GetPokemon } from "src/types/GetPokemon";
import colorTypes from "src/utils/colorTypes";
import { usePokemonHelper } from "src/hooks/usePokemonHelper";
import { useRouter } from "next/router";

type PokemonDetailsType = {
  pokemon: GetPokemon["pokemon"];
};

const PokemonDetails = ({ pokemon }: PokemonDetailsType) => {
  const router = useRouter();
  const [currentSelected, setCurrentSelected] = useState(0);

  const { capitalizedName } = usePokemonHelper({ name: pokemon?.name! });

  const buttonName = useMemo(
    () => ["About", "Statistics", "Evolutions", "Moves"],
    []
  );

  useEffect(() => {
    const idx = buttonName.indexOf(router.query.tab as string);
    if (idx > -1) {
      setCurrentSelected(idx);
    }
  }, [buttonName, router.query]);

  return (
    <VStack
      mx={{ base: "20px", lg: "auto" }}
      align={{ lg: "start", base: "center" }}
      zIndex={1}
      width={{ lg: "49.938rem", base: "35rem" }}
      pb={28}
    >
      <Text
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="700"
        fontSize={{ lg: "32px", base: "6xl" }}
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
              width={{ lg: "6.375rem", base: "10rem" }}
              height={{ lg: "2.188rem", base: "3rem" }}
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
                fontSize={{ base: "3xl", lg: "md" }}
                color="#F7FAFC"
              >
                {name.type?.name}
              </Text>
            </Box>
          );
        })}
      </Flex>

      {/** Buttons Section */}
      <Stack
        wrap={{ base: "wrap", lg: "nowrap" }}
        justify="center"
        direction="row"
        gap={4}
        pt={14}
      >
        {buttonName.map((item, idx) => {
          return (
            <Box
              key={idx}
              width={{ lg: "11.3rem", base: "16rem" }}
              height={{ lg: "3rem", base: "4rem" }}
              display="flex"
              justifyContent="center"
              onClick={() => {
                setCurrentSelected(idx);
                router.push(`/home/${pokemon?.id}` + `?tab=${item}`);
              }}
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
                fontSize={{ base: "2xl", lg: "md" }}
                fontWeight={{ lg: "500", base: "bold" }}
                lineHeight="19px"
                color={currentSelected === idx ? "text.gray800" : "text.light"}
              >
                {item}
              </Text>
            </Box>
          );
        })}
      </Stack>
      <Box pt={10}>
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
