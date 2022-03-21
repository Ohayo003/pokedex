import { useState } from "react";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";

type PaginationType = {
  pokemon: GetPokemonDataList["pokemon"];
};

export const usePagination = (
  itemsPerPage: number,
  { pokemon }: PaginationType
) => {
  const copyData = [...pokemon];
  const [currentPage, setCurrentPage] = useState(1);
  let numberOfPages: number[] = [];

  for (
    let index = 1;
    index <= Math.ceil(copyData.length / itemsPerPage);
    index++
  ) {
    numberOfPages.push(index);
  }

  function currentData() {
    const lastIndexOfPokemonList = currentPage * itemsPerPage;
    const firstIndexOfPokemonList = lastIndexOfPokemonList - itemsPerPage;
    return copyData
      .sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      })
      .slice(firstIndexOfPokemonList, lastIndexOfPokemonList);
  }

  function nextPage() {
    setCurrentPage(() => currentPage + 1);
  }
  function previousPage() {
    setCurrentPage(() => currentPage - 1);
  }
  function selectedPage(idx: number) {
    setCurrentPage(() => idx);
  }

  return {
    currentData,
    currentPage,
    nextPage,
    previousPage,
    selectedPage,
    setCurrentPage,
    numberOfPages,
  };
};
