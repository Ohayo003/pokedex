import React from "react";
import { GetPokemon } from "src/types/GetPokemon";
import useStore from "./useStore";

interface ICollection {
  p_pointsValue: number;
  pokemon: {
    id: number;
    image: string;
    bg: string;
  };
}

export const useCollection = ({ p_pointsValue, pokemon }: ICollection) => {
  const setPoints = useStore((state) => state.setPoints);
  const user_points = useStore((state) => state.points);
  const addCollection = useStore((state) => state.addCollections);

  function ObtainPokemon() {
    if (user_points >= p_pointsValue) {
      setPoints(user_points, "-");
      addCollection(pokemon.id, pokemon.image, pokemon.bg);
    }
  }
  function EarnPoints () {
      
  }

  return { ObtainPokemon };
};
