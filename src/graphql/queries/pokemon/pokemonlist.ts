import { gql } from "@apollo/client";

export const GET_POKEMON_DATA_LIST = gql`
  query GetPokemonDataList($limit: Int!, $offset: Int!) {
    pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name

      # specy: pokemon_v2_pokemonspecy {
      #   evolutionChain: pokemon_v2_evolutionchain {
      #     id
      #     evolutions: pokemon_v2_pokemonspecies {
      #       evolveTrigger: pokemon_v2_pokemonevolutions {
      #         min_level
      #       }
      #       id
      #       evolveFrom: evolves_from_species_id
      #       name
      #     }
      #   }
      # }
      element: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const FILTER_POKEMON_BY_ELEMENT = gql`
  query FilterPokemonByElement($type: [String!]) {
    pokemons: pokemon_v2_pokemon(
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $type } } }
      }
    ) {
      id
      name

      specy: pokemon_v2_pokemonspecy {
        evolutionChain: pokemon_v2_evolutionchain {
          id
          evolutions: pokemon_v2_pokemonspecies {
            evolveTrigger: pokemon_v2_pokemonevolutions {
              min_level
            }
            id
            evolveFrom: evolves_from_species_id
            name
          }
        }
      }
      element: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    types: pokemon_v2_type {
      name
    }
  }
`;
