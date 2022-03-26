import { GetPokemon_pokemon_pokemon_v2_pokemonspecy } from "src/types/GetPokemon";

type PokemonHelperType = {
  evolution?: GetPokemon_pokemon_pokemon_v2_pokemonspecy;
  name?: string;
  gender_rate?: number;
};

export const usePokemonHelper = ({
  evolution,
  name,
  gender_rate,
}: PokemonHelperType) => {
  const nameCopy = name;
  const capitalizedName =
    nameCopy?.charAt(0).toUpperCase()! + nameCopy?.slice(1)!;


  ///get Gender (male, female, genderless) using gender_rate
  function getGenderValue() {
    let gender: string = "";
    if (gender_rate! >= 8) {
      gender = "Female";
    } else if (gender_rate! >= 1 && gender_rate! < 8) {
      gender = "Male";
    } else if (gender_rate! < 1) {
      gender = "Genderless";
    }
    return gender;
  }

  ///get Gender Percentage by gender_rate
  function getGenderPercentage() {
    let percentage: number = 0;
    if (gender_rate! >= 1) {
      percentage = gender_rate! * 10;
    }
    return percentage;
  }

  ///get current evolve Form Data
  const currentEvovleForm = evolution?.evolutionChain?.evolutions.find(
    (object) => object.name === name
  );

  ///get previous evolve Form Data
  const evovleFromData = evolution?.evolutionChain?.evolutions.find(
    (object) => object.id === currentEvovleForm?.evolveFrom
  );


  
  return {
    capitalizedName,
    evovleFromData,
    getGenderValue,
    getGenderPercentage,
    currentEvovleForm,
  };
};