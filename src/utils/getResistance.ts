import { GetPokemon_pokemon_element } from "src/types/GetPokemon";

const getResistance = async (types: GetPokemon_pokemon_element[]) => {
  let resistance: Record<string, any>[] = [];

  for (const type of types) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type.type?.id}`);
    const data = await res.json();
    resistance = [
      ...data.damage_relations.double_damage_to,
      ...data.damage_relations.half_damage_from,
      ...data.damage_relations.no_damage_from,
    ];
  }

  return resistance;
};

export default getResistance;
