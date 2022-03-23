import { useState } from "react";
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import useStore from "./useStore";

type PaginationType = {
  datas: GetPokemonDataList["pokemons"] | any[];
};

export const usePagination = (
  itemsPerPage: number,
  { datas }: PaginationType
) => {
  const copyData = [...datas];
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
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
    setCurrentPage(currentPage + 1);
  }
  function previousPage() {
    setCurrentPage(currentPage - 1);
  }
  function selectedPage(idx: number) {
    setCurrentPage(idx);
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
