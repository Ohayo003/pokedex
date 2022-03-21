import { Box, Flex, Grid } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import _1 from "public/assets/background/login-image.png";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import colorTypes from "src/utils/colorTypes";

type PokemonGridViewType = {
  pokemons: GetPokemonDataList["pokemon"];
};

const PokemonGridView = ({ pokemons }: PokemonGridViewType) => {
  const pokemonCopy = [...pokemons];

  // const { currentData, setCurrentPage, currentPage, nextPage, previousPage } =
  //   usePagination(8, { pokemons });

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
            <Box
              key={idx}
              height="15rem"
              // width={}
              borderRadius="2xl"
              background={colorTypes(pokemon?.element[0]?.type?.name!)}
              boxShadow="0px 4px 4px 0px gray"
              overflow="hidden"
              position="relative"
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.id}.png`}
                alt="pikatchu"
                layout="responsive"
                width={10}
                height={12}
                objectFit="cover"
                // objectPosition="center"
              />
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PokemonGridView;
