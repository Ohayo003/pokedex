import {
  Avatar,
  Box,
  type BoxProps,
  Flex,
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Grid } from "@chakra-ui/react";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useStore from "src/hooks/useStore";
import colorTypes from "src/utils/colorTypes";
import { SiZcash } from "react-icons/si";
import { usePokemonHelper } from "src/hooks/usePokemonHelper";
import pokemonImage from "src/utils/image";

export const MotionBox = motion<BoxProps>(Box);

type PokemonListViewType = {
  pokemons: GetPokemonDataList["pokemons"];
};

const PokemonListView = ({ pokemons }: PokemonListViewType) => {
  const router = useRouter();
  const addCarousel = useStore((state) => state.addCarousel);
  const points = 30;
  ///adds the current Pokemon to Recent Visit
  const handleAddRecent = (id: number, image: string, bg: string) => {
    addCarousel(id, image, bg);
  };

  return (
    <Box zIndex={1} position="relative">
      <Grid
        px={4}
        py={3}
        templateColumns={{
          base: "50px 80px 1fr 1fr",
          lg: "50px 80px 1fr 1fr 1fr 1fr",
        }}
        borderBottom="1px solid white"
        gap={0}
        background="#374151"
      >
        <TData
          fontWeight="600"
          width="3rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          text="#"
        />

        <TData
          fontWeight="600"
          width="5rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
        <TData
          pl={4}
          display={{ base: "flex", lg: "block" }}
          justifyContent={{ base: "center", lg: "left" }}
          fontWeight="600"
          text="Pokemon"
        />
        <TData
          pl={4}
          fontWeight="600"
          text="Type"
          display={{ base: "flex", lg: "block" }}
          justifyContent={{ base: "center", lg: "left" }}
        />
        <TData
          display={{ base: "none", lg: "flex" }}
          pl={4}
          fontWeight="600"
          justifyContent="center"
          text="Level"
        />
        <TData
          display={{ base: "none", lg: "flex" }}
          pl={4}
          fontWeight="600"
          justifyContent="center"
          text="Points"
        />
      </Grid>
      {pokemons &&
        pokemons.map((pokemon, idx) => {
          return (
            <MotionBox
              key={idx}
              whileHover={{ scale: 1.1 }}
              _hover={{ cursor: "pointer" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                router.push(`/home/${pokemon.id}` + "?tab=About");
                handleAddRecent(
                  pokemon.id,
                  pokemonImage(pokemon.id),
                  colorTypes(pokemon?.element[0]?.type?.name!)
                );
              }}
            >
              <Grid
                px={4}
                py={3}
                templateColumns={{
                  base: "50px 80px 1fr 1fr",
                  lg: "50px 80px 1fr 1fr 1fr 1fr",
                }}
                gap={0}
                background="#374151"
                borderBottom="1px solid white"
              >
                <TData
                  display="flex"
                  justifyContent="center"
                  alignSelf={{ base: "center", lg: "normal" }}
                  alignItems="center"
                  height="2.5rem"
                  width="3rem"
                  text={pokemon.id}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  width="5rem"
                  alignSelf={{ base: "center", lg: "normal" }}
                  justifyContent="center"
                  height="2.5rem"
                >
                  <Avatar
                    border={`2px solid ${colorTypes(
                      pokemon.element[0].type?.name!
                    )}`}
                    w={{ lg: 8, base: 12 }}
                    h={{ lg: 8, base: 12 }}
                    src={pokemonImage(pokemon?.id!)}
                  />
                </Box>
                <TData
                  display={{ base: "flex", lg: "block" }}
                  justifyItems={{ base: "center" }}
                  alignItems="center"
                  justifyContent={{ base: "center", lg: "left" }}
                  pl={4}
                  alignSelf={{ base: "center", lg: "normal" }}
                  text={pokemon.name}
                />
                <Flex
                  key={idx}
                  flexDirection={{ base: "column", lg: "row" }}
                  align={{ base: "center", lg: "start" }}
                  justify={{ lg: "start" }}
                  gap={2}
                >
                  {pokemon.element.map((types, idx) => {
                    return (
                      <TData
                        key={idx}
                        // pl={4}
                        text={
                          <Box
                            border="1px"
                            width="5rem"
                            background={colorTypes(types.type?.name!)}
                            borderRadius="full"
                            display="flex"
                            alignContent="center"
                            justifyContent="center"
                          >
                            {types.type?.name}
                          </Box>
                        }
                      />
                    );
                  })}
                </Flex>
                <TData
                  display={{ base: "none", lg: "flex" }}
                  justifyContent="center"
                  pl={4}
                  text={"1"}
                />
                <TData
                  justifyContent="center"
                  pl={4}
                  text={
                    <HStack>
                      <Text
                        color="text.light"
                        fontWeight="bold"
                        fontStyle="italic"
                      >
                        {points * pokemon.id}
                      </Text>
                      <Icon as={SiZcash} />
                    </HStack>
                  }
                />
              </Grid>
            </MotionBox>
          );
        })}
    </Box>
  );
};

export default PokemonListView;

type TDataType = {
  text?: any;
};

const TData = ({ text, ...props }: TDataType & BoxProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      height="2.5rem"
      fontFamily="Inter"
      fontStyle="normal"
      fontWeight="400"
      lineHeight="lg"
      {...props}
      color="light"
    >
      {text}
    </Box>
  );
};
