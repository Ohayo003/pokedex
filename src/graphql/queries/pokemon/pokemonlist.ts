import { gql } from "@apollo/client";

export const GET_POKEMON_DATA_LIST = gql`
  query GetPokemonDataList {
    pokemons: pokemon_v2_pokemon(limit: 100, offset: 0) {
      id
      name
      base_experience
      element: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const FILTER_POKEMON_BY_ELEMENT = gql`
  query FilterPokemonByElement($type: String!) {
    pokemon_v2_pokemon(
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: [$type] } } }
      }
    ) {
      name
    }
  }
`;
