import { Box, type BoxProps, Grid, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
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
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {pokemons &&
          pokemons.map((pokemon, idx) => {
            return (
              <MotionBox
                key={idx}
                height={{ lg: "20rem", base: "22rem" }}
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
                  height={{ base: "13rem", lg: "13rem" }}
                  width={{ base: "13rem", lg: "13rem" }}
                  borderWidth="2px 2px 6px 2px"
                  position="relative"
                >
                  <FallBackImage
                    src={pokemonImage(pokemon?.id!)}
                    loader={
                      <Box>
                        <Loading />
                      </Box>
                    }
                    fallback="/assets/background/whos_that_pokemon.jpg"
                  />
                  {/* <Image
                    src={pokemonImage(pokemon?.id!)}
                    alt={`${pokemon.name}`}
                    layout="fill"
                    // width={18}
                    // height={20}
                    // objectFit="cover"
                    // objectPosition="center"
                  /> */}
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
                <Box width="inherit" m="5px 0px">
                  <Flex justify="center">
                    <Box fontWeight="bold" fontSize="xs"></Box>
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
                          fontSize={{ lg: "xs", base: "xl" }}
                          color="gray800"
                          m="0px 5px"
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
