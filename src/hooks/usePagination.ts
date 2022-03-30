import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import useStore from "./useStore";

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

  ///calculate the range of items shown in the page
  const shownFrom =
    currentPage * currentData()?.length! - currentData()?.length! + 1;
  ///calculate the total items shown in the page
  const totalItems = currentPage * currentData()?.length!;

  let numberOfPages: number[] = [];

  ///computes the total number of Pages from the pokemon length divided by items per page
  for (
    let index = 1;
    index <= Math.ceil(data?.length! / itemsPerPage);
    index++
  ) {
    numberOfPages.push(index);
  }

  ///check if the next button is triggered then
  ///sets the currentpage with the updated current index + 1
  ///then sets back the nextPageTriggered to false to not cause infinite render
  useEffect(() => {
    if (nextPageTriggered) {
      setCurrentPage(currentIndex + 1);
      setTimeout(() => setNextPageTriggered(false), 100);
    }
  }, [currentIndex, nextPageTriggered, setCurrentPage]);

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
        ///check 1st if the current last index < numberOfpages which is the range from 1st - last page
        ///then just set the a new state for currentIndex and currentlastIndex
        ///otherwise if not filtered then the fetchAll pokemons is triggered for pagination
        if (currentPage < numberOfPages.length) {
          setNextPageTriggered(true);
          setCurrentIndex(itemsPerPage, "increament");
          setCurrentLastIndex(itemsPerPage, "increament");
        } else if (
          data?.length! < 1126 &&
          currentPage >= numberOfPages.length
        ) {
          setNextPageTriggered(true);
          handleFetchMore!();
          setCurrentIndex(itemsPerPage, "increament");
          setCurrentLastIndex(itemsPerPage, "increament");
        }
      } else {
        ///if the data is filtered check only if the current last index of the page < the total number of pages
        ///then just increament the current index and last index
        if (currentLastIndex <= numberOfPages.length) {
          setNextPageTriggered(true);
          setCurrentIndex(itemsPerPage, "increament");
          setCurrentLastIndex(itemsPerPage, "increament");
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
        setCurrentIndex(itemsPerPage, "decreament");
        setCurrentLastIndex(itemsPerPage, "decreament");
      }
    }
  }

  function selectedPage(idx: number) {
    setCurrentPage(idx);
  }

  return {
    currentData,
    currentPage,
    nextPage,
    previousPage,
    shownFrom,
    totalItems,
    selectedPage,
    setCurrentPage,
    numberOfPages,
  };
};
