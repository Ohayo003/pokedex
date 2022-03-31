import { useQuery } from "@apollo/client";
import { GET_POKEMON_COUNT } from "src/graphql/queries/pokemon/pokemonlist";
import { GetPokemonCount } from "src/types/GetPokemonCount";

export const useGetPokemonTotal = () => {
  const { data } = useQuery<GetPokemonCount>(GET_POKEMON_COUNT, {
    context: { clientName: "pokedexapi" },
  });
  const count = data?.pokemonCount?.aggregate?.count || 0;

  return { count };
};
