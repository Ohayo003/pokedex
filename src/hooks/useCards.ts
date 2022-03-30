import { useState } from "react";
import cardImages from "src/utils/cardImage";

const useCards = () => {
  const [pokemonCards, setPokemonCards] = useState<
    {
      id: number;
      src: string;
      matched: boolean;
    }[]
  >([]);

  let isLimit = false;

  ///total moves that the user has
  const [moves, setMoves] = useState(5);

  ///stores the first selected card
  const [firstChoice, setFirstChoice] = useState<{
    id: number;
    src: string;
  } | null>(null);

  ///stores the second selected card
  const [secondChoice, setSecondChoice] = useState<{
    id: number;
    src: string;
  } | null>(null);

  ///Shuffle cards and duplicates the existing cards
  function shuffleCards() {
    const shuffle = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
      }));
    setPokemonCards(shuffle);
    setMoves(5);
    setFirstChoice(null);
    setSecondChoice(null);
  }

  ///set the selected card to choice 1 if its empty, otherwise choice 2
  function handleClick(pokemonCards: { id: number; src: string }) {
    if (moves >= 1) {
      if (!firstChoice || !secondChoice) {
        firstChoice
          ? setSecondChoice(pokemonCards)
          : setFirstChoice(pokemonCards);
      }
    } else {
      isLimit = true;
    }
  }

  ///resets the selection and updates the move counts
  function resetSelection(matched: boolean) {
    setFirstChoice(null);
    setSecondChoice(null);
    if (!matched) {
      setMoves((prev) => prev - 1);
    }
  }

  return {
    shuffleCards,
    pokemonCards,
    moves,
    handleClick,
    firstChoice,
    setPokemonCards,
    secondChoice,
    resetSelection,
    isLimit,
  };
};

export default useCards;
