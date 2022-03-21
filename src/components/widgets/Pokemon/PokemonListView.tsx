import { Avatar, Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import { Grid } from "@chakra-ui/react";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";

type PokemonListViewType = {
  pokemon: GetPokemonDataList["pokemon"];
};

const PokemonListView = ({ pokemon }: PokemonListViewType) => {
  return (
    <Box zIndex={1} minH="100vh" position="relative">
      <Grid
        px={4}
        py={3}
        templateColumns="repeat(5, 1fr)"
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
        <TData pl={4} width="18rem" fontWeight="600" text="Pokemon" />
        <TData pl={4} width="18rem" fontWeight="600" text="Type" />
        <TData pl={4} width="18rem" fontWeight="600" text="Level" />
      </Grid>
      {pokemon &&
        pokemon.map((pokemon, idx) => {
          return (
            <Grid
              px={4}
              py={3}
              templateColumns="repeat(5, 1fr)"
              gap={0}
              background="#374151"
              key={idx}
            >
              <TData
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="2.5rem"
                width="3rem"
                text={idx + 1}
              />
              <Box
                display="flex"
                alignItems="center"
                width="5rem"
                justifyContent="center"
                height="2.5rem"
              >
                <Avatar
                  w={8}
                  h={8}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.id}.png`}
                />
              </Box>
              <TData width="18rem" pl={4} text={pokemon.name} />
              <TData
                width="18rem"
                pl={4}
                text={pokemon.element.map((types, idx) => {
                  return types.type?.name;
                })}
              />
              <TData width="18rem" pl={4} text="Lvl 1" />
            </Grid>
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
