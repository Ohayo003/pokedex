import useStore from "src/hooks/useStore";

interface ICollection {
  p_pointsValue?: number;
  pokemon?: {
    id: number;
    name: string;
    image: string;
    bg: string;
  };
}

export const useCollection = ({ p_pointsValue, pokemon }: ICollection) => {
  const user_points = useStore((state) => state.points);
  const updatePoints = useStore((state) => state.updatePoints);
  const collection = useStore((state) => state.collections);
  const addCollection = useStore((state) => state.addCollections);

  function checkPoints() {
    let obtainable = false;
    if (user_points >= p_pointsValue!) {
      obtainable = true;
    } else {
      obtainable = false;
    }
    return obtainable;
  }

  function checkExistingPokemonCollection() {
    let isExisting = true;
    const idxOfExisting = collection.findIndex((obj) => {
      return obj.id === pokemon?.id!;
    });
    console.log(idxOfExisting);
    if (idxOfExisting === -1) {
      isExisting = false;
    }
    return isExisting;
  }

  function ObtainPokemon() {
    if (checkPoints()) {
      updatePoints(p_pointsValue!, "decrement");
      addCollection(
        pokemon?.id!,
        pokemon?.name!,
        pokemon?.image!,
        pokemon?.bg!
      );
    }
  }

  return {
    checkPoints,
    ObtainPokemon,
    checkExistingPokemonCollection,
  };
};
