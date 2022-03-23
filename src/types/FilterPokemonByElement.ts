/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilterPokemonByElement
// ====================================================

export interface FilterPokemonByElement_pokemon_v2_pokemon {
  __typename: "pokemon_v2_pokemon";
  name: string;
}

export interface FilterPokemonByElement {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemon_v2_pokemon: FilterPokemonByElement_pokemon_v2_pokemon[];
}

export interface FilterPokemonByElementVariables {
  type: string;
}
