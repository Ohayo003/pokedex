/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilterPokemonByElement
// ====================================================

export interface FilterPokemonByElement_pokemons_specy_evolutionChain_evolutions_evolveTrigger {
  __typename: "pokemon_v2_pokemonevolution";
  min_level: number | null;
}

export interface FilterPokemonByElement_pokemons_specy_evolutionChain_evolutions {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An array relationship
   */
  evolveTrigger: FilterPokemonByElement_pokemons_specy_evolutionChain_evolutions_evolveTrigger[];
  id: number;
  evolveFrom: number | null;
  name: string;
}

export interface FilterPokemonByElement_pokemons_specy_evolutionChain {
  __typename: "pokemon_v2_evolutionchain";
  id: number;
  /**
   * An array relationship
   */
  evolutions: FilterPokemonByElement_pokemons_specy_evolutionChain_evolutions[];
}

export interface FilterPokemonByElement_pokemons_specy {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An object relationship
   */
  evolutionChain: FilterPokemonByElement_pokemons_specy_evolutionChain | null;
}

export interface FilterPokemonByElement_pokemons_element_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface FilterPokemonByElement_pokemons_element {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: FilterPokemonByElement_pokemons_element_type | null;
}

export interface FilterPokemonByElement_pokemons {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An object relationship
   */
  specy: FilterPokemonByElement_pokemons_specy | null;
  /**
   * An array relationship
   */
  element: FilterPokemonByElement_pokemons_element[];
}

export interface FilterPokemonByElement {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemons: FilterPokemonByElement_pokemons[];
}

export interface FilterPokemonByElementVariables {
  type?: string[] | null;
}
