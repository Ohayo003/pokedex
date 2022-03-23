import { GetPokemon_pokemon_element } from "src/types/GetPokemon";

const getWeaknessess = async (types: GetPokemon_pokemon_element[]) => {
  let weaknesses: Record<string, any>[] = [];

  for (const type of types) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type.type?.id}`);
    const data = await res.json();
    weaknesses = [
      ...data.damage_relations.double_damage_from,
      ...data.damage_relations.half_damage_to,
      ...data.damage_relations.no_damage_to,
    ];
  }
  return weaknesses;
};

export default getWeaknessess;
