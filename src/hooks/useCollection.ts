import { truncate } from "fs/promises";
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
  const deductPoints = useStore((state) => state.deductPoints);
  const user_points = useStore((state) => state.points);
  const addPoints = useStore((state) => state.addPoints);
  const collection = useStore((state) => state.collections);
  const addCollection = useStore((state) => state.addCollections);

  function checkPoints() {
    let obtainable = false;
    if (user_points >= p_pointsValue) {
      obtainable = true;
    } else {
      obtainable = false;
    }
    return obtainable;
  }

  function checkExistingPokemonCollection() {
    let isExisting = true;
    const idxOfExisting = collection.findIndex((obj) => {
      return obj.id === pokemon.id;
    });
    console.log(idxOfExisting);
    if (idxOfExisting === -1) {
      isExisting = false;
    }
    return isExisting;
  }

  function ObtainPokemon() {
    if (checkPoints()) {
      deductPoints(p_pointsValue);
      addCollection(pokemon.id, pokemon.image, pokemon.bg);
    }
  }
  function EarnPoints() {
    addPoints(user_points);
  }

  return {
    checkPoints,
    ObtainPokemon,
    EarnPoints,
    checkExistingPokemonCollection,
  };
};