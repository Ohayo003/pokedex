import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      element: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
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
        where: { pokemon_v2_move: { power: { _gt: 0 } } }
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

      pokemon_v2_pokemonspecy {
        description: pokemon_v2_pokemonspeciesflavortexts(
          distinct_on: language_id
          where: { pokemon_v2_language: { name: { _eq: "en" } } }
        ) {
          flavor_text
        }

        eggroups: pokemon_v2_pokemonegggroups {
          names: pokemon_v2_egggroup {
            name
          }
        }
        hatch_counter
        gender_rate
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
    }
  }
`;
