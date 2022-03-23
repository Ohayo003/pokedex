import { Box, type BoxProps, Grid } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import _1 from "public/assets/background/login-image.png";
import colorTypes from "src/utils/colorTypes";
import { motion } from "framer-motion";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import { useRouter } from "next/router";
import useStore from "src/hooks/useStore";

export const MotionBox = motion<BoxProps>(Box);

type PokemonGridViewType = {
  pokemons: GetPokemonDataList["pokemons"];
};

const PokemonGridView = ({ pokemons }: PokemonGridViewType) => {
  const pokemonCopy = [...pokemons];
  const addCarousel = useStore((state) => state.addCarousel);
  const carousel = useStore((state) => state.carousel);
  const router = useRouter();

  ///adds the current Pokemon to Recent Visit
  const handleAddRecent = (id: number, image: string, bg: string) => {
    const idx = carousel.findIndex((object) => object.id === id);
    if (idx === -1) {
      addCarousel(id, image, bg);
    }
  };

  return (
    <Box zIndex={1}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr) ",
          md: "repeat(2,1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {pokemonCopy.map((pokemon, idx) => {
          return (
            <MotionBox
              key={idx}
              height={{ lg: "15rem", base: "40rem" }}
              p={2}
              _hover={{ cursor: "pointer" }}
              borderRadius="2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              background={colorTypes(pokemon?.element[0]?.type?.name!)}
              boxShadow="0px 4px 4px 0px gray"
              overflow="hidden"
              onClick={() => {
                router.push(`/home/${pokemon.id}`);
                handleAddRecent(
                  pokemon.id,
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.id}.png`,
                  colorTypes(pokemon?.element[0]?.type?.name!)
                );
              }}
              // position="relative"
            >
              <Box
                alignSelf="center"
                background="whiteAlpha.700"
                borderRadius={100}
                borderWidth="2px 2px 6px 2px"
              >
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.id}.png`}
                  alt="pikatchu"
                  layout="responsive"
                  width={20}
                  height={20}
                  objectFit="cover"
                  // objectPosition="center"
                />
              </Box>
              <Box
                mt="1"
                fontWeight="bold"
                fontFamily="sans-serif"
                letterSpacing="widest"
                as="h4"
                textAlign="center"
                color="white"
                lineHeight="tight"
                fontSize={pokemon.name.length > 7 ? "xl" : "xl"}
                isTruncated
              >
                {pokemon.name}
              </Box>
            </MotionBox>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PokemonGridView;
