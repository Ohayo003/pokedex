import { Box, type BoxProps, Grid } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import _1 from "public/assets/background/login-image.png";
import colorTypes from "src/utils/colorTypes";
import { motion } from "framer-motion";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";

export const MotionBox = motion<BoxProps>(Box);

type PokemonGridViewType = {
  pokemons: GetPokemonDataList["pokemons"];
};

const PokemonGridView = ({ pokemons }: PokemonGridViewType) => {
  const pokemonCopy = [...pokemons];

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
              height="15rem"
              // width={}
              _hover={{ cursor: "pointer" }}
              borderRadius="2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              background={colorTypes(pokemon?.element[0]?.type?.name!)}
              boxShadow="0px 4px 4px 0px gray"
              overflow="hidden"
              position="relative"
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.id}.png`}
                alt="pikatchu"
                layout="responsive"
                width={25}
                height={30}
                // objectFit="cover"
                // objectPosition="center"
              />
            </MotionBox>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PokemonGridView;
