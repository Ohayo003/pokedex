/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemon
// ====================================================

export interface GetPokemon_pokemon_element_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemon_pokemon_element {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetPokemon_pokemon_element_type | null;
}

export interface GetPokemon_pokemon_abilities_ability {
  __typename: "pokemon_v2_ability";
  name: string;
}

export interface GetPokemon_pokemon_abilities {
  __typename: "pokemon_v2_pokemonability";
  /**
   * An object relationship
   */
  ability: GetPokemon_pokemon_abilities_ability | null;
}

export interface GetPokemon_pokemon_stats_stat {
  __typename: "pokemon_v2_stat";
  name: string;
}

export interface GetPokemon_pokemon_stats {
  __typename: "pokemon_v2_pokemonstat";
  base_stat: number;
  /**
   * An object relationship
   */
  stat: GetPokemon_pokemon_stats_stat | null;
}

export interface GetPokemon_pokemon_moves_move_effects_effect {
  __typename: "pokemon_v2_moveeffecteffecttext";
  effect: string;
}

export interface GetPokemon_pokemon_moves_move_effects {
  __typename: "pokemon_v2_moveeffect";
  /**
   * An array relationship
   */
  effect: GetPokemon_pokemon_moves_move_effects_effect[];
}

export interface GetPokemon_pokemon_moves_move {
  __typename: "pokemon_v2_move";
  accuracy: number | null;
  name: string;
  power: number | null;
  /**
   * An object relationship
   */
  effects: GetPokemon_pokemon_moves_move_effects | null;
}

export interface GetPokemon_pokemon_moves {
  __typename: "pokemon_v2_pokemonmove";
  /**
   * An object relationship
   */
  move: GetPokemon_pokemon_moves_move | null;
}

export interface GetPokemon_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  height: number | null;
  weight: number | null;
  /**
   * An array relationship
   */
  element: GetPokemon_pokemon_element[];
  /**
   * An array relationship
   */
  abilities: GetPokemon_pokemon_abilities[];
  /**
   * An array relationship
   */
  stats: GetPokemon_pokemon_stats[];
  /**
   * An array relationship
   */
  moves: GetPokemon_pokemon_moves[];
}

export interface GetPokemon {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon: GetPokemon_pokemon | null;
}

export interface GetPokemonVariables {
  id: number;
}
