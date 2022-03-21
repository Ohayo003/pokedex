/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonDataList
// ====================================================

export interface GetPokemonDataList_pokemon_element_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemonDataList_pokemon_element {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetPokemonDataList_pokemon_element_type | null;
}

export interface GetPokemonDataList_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  base_experience: number | null;
  /**
   * An array relationship
   */
  element: GetPokemonDataList_pokemon_element[];
}

export interface GetPokemonDataList {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemon: GetPokemonDataList_pokemon[];
}
