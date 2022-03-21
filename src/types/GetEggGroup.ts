/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEggGroup
// ====================================================

export interface GetEggGroup_egg_group_pokemon_v2_pokemonegggroups_group {
  __typename: "pokemon_v2_egggroup";
  name: string;
}

export interface GetEggGroup_egg_group_pokemon_v2_pokemonegggroups {
  __typename: "pokemon_v2_pokemonegggroup";
  /**
   * An object relationship
   */
  group: GetEggGroup_egg_group_pokemon_v2_pokemonegggroups_group | null;
}

export interface GetEggGroup_egg_group {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An array relationship
   */
  pokemon_v2_pokemonegggroups: GetEggGroup_egg_group_pokemon_v2_pokemonegggroups[];
}

export interface GetEggGroup {
  /**
   * fetch data from the table: "pokemon_v2_pokemonspecies" using primary key columns
   */
  egg_group: GetEggGroup_egg_group | null;
}

export interface GetEggGroupVariables {
  id: number;
}
