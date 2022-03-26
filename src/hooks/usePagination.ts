import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import useStore from "./useStore";

type PaginationType = {
  data: GetPokemonDataList["pokemons"] | any[];
  isRecent: boolean;
  filtered?: boolean;
  handleFetchMore?: () => void;
  setCurrentLastIndex?: (value: React.SetStateAction<number>) => void;
  setCurrentIndex?: (value: React.SetStateAction<number>) => void;
  currentLastIndex?: number;
  currentIndex?: number;
};

export const usePagination = (
  itemsPerPage: number,
  {
    data,
    filtered,
    isRecent,
    handleFetchMore,
    setCurrentIndex,
    setCurrentLastIndex,
    currentIndex,
    currentLastIndex,
  }: PaginationType
) => {
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  let numberOfPages: number[] = [];

  for (
    let index = 1;
    index <= Math.ceil(data?.length! / itemsPerPage);
    index++
  ) {
    numberOfPages.push(index);
  }

  ///current data is being sliced
  function currentData() {
    const lastIndexOfPokemonList = currentPage * itemsPerPage;
    const firstIndexOfPokemonList = lastIndexOfPokemonList - itemsPerPage;
    return data && data.slice(firstIndexOfPokemonList, lastIndexOfPokemonList);
  }

  ///handles changing next pages
  function nextPage() {
    if (isRecent) {
      setCurrentPage(currentPage + 1);
    }
    if (!filtered) {
      if (currentLastIndex! < numberOfPages.length) {
        setCurrentIndex!((prev) => prev + itemsPerPage);
        setCurrentLastIndex!((prev) => prev + itemsPerPage)!;
      } else if (
        data?.length! < 1126 &&
        currentLastIndex! >= numberOfPages.length
      ) {
        handleFetchMore!();
        setCurrentIndex!((prev) => prev + itemsPerPage);
        setCurrentLastIndex!((prev) => prev + itemsPerPage);
      }
    } else {
      if (currentLastIndex! <= numberOfPages.length) {
        setCurrentIndex!((prev) => prev + itemsPerPage);
        setCurrentLastIndex!((prev) => prev + itemsPerPage);
      }
    }
  }
  ///handles changing page to previous
  function previousPage() {
    if (isRecent) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    } else {
      if (currentIndex! > 1) {
        setCurrentLastIndex!((prev) => prev - itemsPerPage);
        setCurrentIndex!((prev) => prev - itemsPerPage);
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
    selectedPage,
    setCurrentPage,
    numberOfPages,
  };
};
