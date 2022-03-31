import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import useStore from "./useStore";
import { GET_POKEMON_COUNT } from "../graphql/queries/pokemon/pokemonlist";
import { GetPokemonCount } from "../types/GetPokemonCount";
import { useGetPokemonTotal } from "./useGetPokemonTotal";

type PaginationType = {
  data: GetPokemonDataList["pokemons"] | any[];
  isRecent: boolean;
  filtered?: boolean;
  handleFetchMore?: () => void;
};

export const usePagination = (
  itemsPerPage: number,
  { data, filtered, isRecent, handleFetchMore }: PaginationType
) => {
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentLastIndex = useStore((state) => state.setCurrentLastIndex);
  const setCurrentIndex = useStore((state) => state.setCurrentIndex);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const currentLastIndex = useStore((state) => state.currentLastIndex);
  const currentIndex = useStore((state) => state.currentIndex);
  const [nextPageTriggered, setNextPageTriggered] = useState(false);
  const [prevPageTriggered, setPrevPageTriggered] = useState(false);
  const { count } = useGetPokemonTotal();

  let numberOfPages: number[] = [];

  ///computes the total number of Pages from the pokemon length divided by items per page
  for (let index = 1; index <= Math.ceil(data.length / itemsPerPage); index++) {
    numberOfPages.push(index);
  }

  ///calculate the range of items shown in the page
  const shownFrom =
    currentPage >= numberOfPages.length ||
    currentLastIndex >= numberOfPages.length
      ? currentPage * itemsPerPage - (itemsPerPage - 1)
      : currentPage * itemsPerPage - currentData().length + 1;
  ///calculate the total items shown in the page
  const totalItems = numberOfPages.length
    ? currentPage * itemsPerPage - (itemsPerPage - currentData().length)
    : currentPage * currentData().length;

  ///check if the next button is triggered then
  ///sets the currentpage with the updated current index + 1
  ///then sets back the nextPageTriggered to false to not cause infinite render
  useEffect(() => {
    if (nextPageTriggered) {
      setCurrentPage(currentIndex + 1);
      setTimeout(() => setNextPageTriggered(false), 100);
    }
  }, [currentIndex, nextPageTriggered, setCurrentPage]);

  ///check first the currentIndex is > numberOfpages.length then if >
  ///sets the currentIndex to - by subtracting the currentindex to both
  ///then setst the currentPage to 1
  useEffect(() => {
    if (filtered) {
      if (currentIndex > numberOfPages.length) {
        setCurrentIndex(currentIndex, "decrement");
        setCurrentLastIndex(currentIndex, "decrement");
        setCurrentPage(1);
      } else {
        setCurrentPage(currentIndex + 1);
      }
    }
  }, [
    currentIndex,
    filtered,
    numberOfPages.length,
    setCurrentIndex,
    setCurrentLastIndex,
    setCurrentPage,
  ]);

  ///check if the prev button is triggered then
  ///sets the currentpage with the updated current index + 1
  ///then sets back the prevPageTriggered to false to not cause infinite render
  useEffect(() => {
    if (prevPageTriggered) {
      setCurrentPage(currentIndex + 1);
      setTimeout(() => setPrevPageTriggered(false), 100);
    }
  }, [currentIndex, prevPageTriggered, setCurrentPage]);

  ///current data is being sliced
  function currentData() {
    const lastIndexOfPokemonList = currentPage * itemsPerPage;
    const firstIndexOfPokemonList = lastIndexOfPokemonList - itemsPerPage;
    return data && data.slice(firstIndexOfPokemonList, lastIndexOfPokemonList);
  }

  ///handles changing next pages
  function nextPage() {
    ///isRecent which means if it is the data from recent carousel view,
    ///just set the currentpage + 1
    if (isRecent) {
      setCurrentPage(currentPage + 1);
    } else {
      ///checking if the filter is not triggered
      if (!filtered) {
        if (currentLastIndex < numberOfPages.length) {
          setNextPageTriggered(true);
          setCurrentIndex(itemsPerPage, "increment");
          setCurrentLastIndex(itemsPerPage, "increment");
        }
        if (currentLastIndex >= numberOfPages.length && data.length < count) {
          setNextPageTriggered(true);
          handleFetchMore!();
          setCurrentIndex(itemsPerPage, "increment");
          setCurrentLastIndex(itemsPerPage, "increment");
        }
      } else {
        if (currentLastIndex < numberOfPages.length) {
          setNextPageTriggered(true);
          setCurrentIndex(itemsPerPage, "increment");
          setCurrentLastIndex(itemsPerPage, "increment");
        }
      }
    }
  }
  ///handles changing page to previous
  function previousPage() {
    if (isRecent) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    } else {
      if (currentIndex > 1) {
        setPrevPageTriggered(true);
        setCurrentIndex(itemsPerPage, "decrement");
        setCurrentLastIndex(itemsPerPage, "decrement");
      }
    }
  }

  function selectedPage(idx: number) {
    setCurrentPage(idx);
  }

  return {
    currentData,
    nextPage,
    previousPage,
    shownFrom,
    totalItems,
    selectedPage,
    numberOfPages,
  };
};
