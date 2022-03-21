import { gql } from "@apollo/client";

export const GET_POKEMON_DATA_LIST = gql`
  query GetPokemonDataList {
    pokemon: pokemon_v2_pokemon(limit: 100, offset: 0) {
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

export const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      element: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }

      stats: pokemon_v2_pokemonstats {
        base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      moves: pokemon_v2_pokemonmoves(
        limit: 9
        where: { pokemon_v2_move: { power: { _gte: 50 } } }
        distinct_on: move_id
      ) {
        move: pokemon_v2_move {
          accuracy
          name
          power
          effects: pokemon_v2_moveeffect {
            effect: pokemon_v2_moveeffecteffecttexts {
              effect
            }
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_EGG_GROUP = gql`
  query GetEggGroup($id: Int!){
    egg_group: pokemon_v2_pokemonspecies_by_pk(id: $id) {
      pokemon_v2_pokemonegggroups {
        group: pokemon_v2_egggroup {
          name
        }
      }
    }
  }
`;