import { Box, type BoxProps, Grid, Flex, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import _1 from "public/assets/background/login-image.png";
import colorTypes from "src/utils/colorTypes";
import { motion } from "framer-motion";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import { useRouter } from "next/router";
import useStore from "src/hooks/useStore";
import pokemonImage from "src/utils/image";
import FallBackImage from "../FallBackImage";
import Loading from "../Loading";

export const MotionBox = motion<BoxProps>(Box);

type PokemonGridViewType = {
  pokemons: GetPokemonDataList["pokemons"];
};

const PokemonGridView = ({ pokemons }: PokemonGridViewType) => {
  const router = useRouter();
  const addCarousel = useStore((state) => state.addCarousel);

  ///adds the current Pokemon to Recent Visit
  const handleAddRecent = (id: number, image: string, bg: string) => {
    addCarousel(id, image, bg);
  };

  return (
    <Box zIndex={1}>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr) ",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {pokemons &&
          pokemons.map((pokemon, idx) => {
            return (
              <MotionBox
                key={idx}
                height={{ lg: "17rem", base: "22rem" }}
                p={2}
                _hover={{ cursor: "pointer" }}
                borderRadius="2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                background={colorTypes(pokemon?.element[0]?.type?.name!)}
                boxShadow="5px 5px 5px 0px lightgray"
                overflow="hidden"
                onClick={() => {
                  router.push(`/home/${pokemon.id}` + `?tab=About`);
                  handleAddRecent(
                    pokemon.id,
                    pokemonImage(pokemon.id),
                    colorTypes(pokemon?.element[0]?.type?.name!)
                  );
                }}
                display="flex"
                flexDirection={{ base: "column" }}
                // position="relative"
              >
                <Box
                  mt={2}
                  alignSelf="center"
                  background="whiteAlpha.800"
                  borderRadius={100}
                  height={{ base: "13rem", lg: "10rem" }}
                  width={{ base: "13rem", lg: "10rem" }}
                  borderWidth="2px 2px 6px 2px"
                  position="relative"
                >
                  <FallBackImage
                    isRecent={false}
                    src={pokemonImage(pokemon?.id!)}
                    loader={<ImageLoader />}
                    fallbackImage="/assets/background/unknown.png"
                  />
                </Box>
                <Box
                  pt={{ base: 3, lg: 1 }}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  letterSpacing="widest"
                  as="h4"
                  wordBreak="break-word"
                  textAlign="center"
                  color="white"
                  lineHeight="tight"
                  fontSize={{
                    base: pokemon.name.length > 10 ? "xl" : "4xl",
                    lg: pokemon.name.length > 10 ? "md" : "xl",
                  }}
                >
                  {pokemon.name}
                </Box>
                <Box width="inherit" m={2}>
                  <Flex justify="center">
                    {pokemon?.element.map((e) => {
                      return (
                        <Box
                          key={e.type?.name}
                          fontWeight="bold"
                          letterSpacing="widest"
                          background="skyblue"
                          fontFamily="Inter"
                          borderRadius="25"
                          border="2px solid white"
                          fontSize={{
                            lg: ".6rem",
                            base: "xl",
                          }}
                          color="gray800"
                          m="0px 2px"
                          py="2px"
                          px="10px"
                          textAlign="center"
                          alignSelf="center"
                          textTransform="uppercase"
                        >
                          {e.type?.name}
                        </Box>
                      );
                    })}
                  </Flex>
                </Box>
              </MotionBox>
            );
          })}
      </Grid>
    </Box>
  );
};

export default PokemonGridView;

const ImageLoader = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      transform="translate(-50%, -50%)"
      left="50%"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner fill="red" w={10} h={10} thickness="5px" />
    </Box>
  );
};
