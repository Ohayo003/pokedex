/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonDataList
// ====================================================

export interface GetPokemonDataList_pokemons_specy_evolutionChain_evolutions_evolveTrigger {
  __typename: "pokemon_v2_pokemonevolution";
  min_level: number | null;
}

export interface GetPokemonDataList_pokemons_specy_evolutionChain_evolutions {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An array relationship
   */
  evolveTrigger: GetPokemonDataList_pokemons_specy_evolutionChain_evolutions_evolveTrigger[];
  id: number;
  evolveFrom: number | null;
  name: string;
}

export interface GetPokemonDataList_pokemons_specy_evolutionChain {
  __typename: "pokemon_v2_evolutionchain";
  id: number;
  /**
   * An array relationship
   */
  evolutions: GetPokemonDataList_pokemons_specy_evolutionChain_evolutions[];
}

export interface GetPokemonDataList_pokemons_specy {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An object relationship
   */
  evolutionChain: GetPokemonDataList_pokemons_specy_evolutionChain | null;
}

export interface GetPokemonDataList_pokemons_element_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemonDataList_pokemons_element {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetPokemonDataList_pokemons_element_type | null;
}

export interface GetPokemonDataList_pokemons {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An object relationship
   */
  specy: GetPokemonDataList_pokemons_specy | null;
  /**
   * An array relationship
   */
  element: GetPokemonDataList_pokemons_element[];
}

export interface GetPokemonDataList {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemons: GetPokemonDataList_pokemons[];
}

export interface GetPokemonDataListVariables {
  limit: number;
  offset: number;
}
