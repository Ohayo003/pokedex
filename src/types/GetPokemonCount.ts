/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonCount
// ====================================================

export interface GetPokemonCount_pokemonCount_aggregate {
  __typename: "pokemon_v2_pokemon_aggregate_fields";
  count: number;
}

export interface GetPokemonCount_pokemonCount {
  __typename: "pokemon_v2_pokemon_aggregate";
  aggregate: GetPokemonCount_pokemonCount_aggregate | null;
}

export interface GetPokemonCount {
  /**
   * fetch aggregated fields from the table: "pokemon_v2_pokemon"
   */
  pokemonCount: GetPokemonCount_pokemonCount;
}
