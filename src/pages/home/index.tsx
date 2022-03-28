import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import "@fontsource/inter";
import { HiViewList } from "react-icons/hi";
import { BsGridFill } from "react-icons/bs";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import PokemonListView from "src/components/widgets/Pokemon/PokemonListView";
import PokemonGridView from "src/components/widgets/Pokemon/PokemonGridView";
import useStore from "src/hooks/useStore";
import { useSession } from "next-auth/react";
import {
  FILTER_POKEMON_BY_ELEMENT,
  GET_POKEMON_DATA_LIST,
} from "src/graphql/queries/pokemon/pokemonlist";
import { useLazyQuery } from "@apollo/client";
import Loading from "src/components/widgets/Loading";
import { usePagination } from "src/hooks/usePagination";
import { useRouter } from "next/router";
import {
  GetPokemonDataList,
  GetPokemonDataListVariables,
} from "src/types/GetPokemonDataList";
import useSound from "use-sound";
import FilterType from "src/components/widgets/Pokemon/FilterTypes";
import Pagination from "src/components/widgets/Pokemon/Pagination";

const HomePage = () => {
  const bgMusic =
    // "/assets/music/pokemon_themesong.mp3";
    "http://soundfxcenter.com/music/television-theme-songs/8d82b5_Pokemon_Theme_Song.mp3";
  const { status } = useSession({ required: true });
  const router = useRouter();
  const isFiltered = useStore((state) => state.isFiltered);
  const setIsFiltered = useStore((state) => state.setIsFiltered);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLastIndex, setCurrentLastIndex] = useState(10);
  const types = useStore((state) => state.filterTypes);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const list = useStore((state) => state.listView);
  const [listView, setlistView] = useState<Boolean | undefined>();
  const toggleView = useStore((state) => state.toggleView);

  const [play, isPlaying] = useSound(bgMusic, {
    volume: 0.1,
    interrupt: true,
  });

  ///useQuery to display list of pokemon
  const [fetchAllPokemons, { loading, data, error, fetchMore }] = useLazyQuery<
    GetPokemonDataList,
    GetPokemonDataListVariables
  >(GET_POKEMON_DATA_LIST, {
    notifyOnNetworkStatusChange: true,
    context: { clientName: "pokedexapi" },
  });

  useEffect(() => {
    if (!isPlaying) {
      play();
    }
  }, [isPlaying, play]);

  ///useLazyQuery for filtering pokemon by pokemon element Type
  const [
    filterDataQuery,
    { data: filterData, error: filterError, loading: filterLoading },
  ] = useLazyQuery<GetPokemonDataList>(FILTER_POKEMON_BY_ELEMENT, {
    notifyOnNetworkStatusChange: true,
    context: { clientName: "pokedexapi" },
  });

  ///Handle the fetchmore data for list of pokemon
  const handleFetchMore = async () => {
    await fetchMore({
      updateQuery: (_, { fetchMoreResult: pokemons }): GetPokemonDataList => {
        console.log(pokemons);
        return { ...pokemons! };
      },
      variables: {
        offset: data?.pokemons.length!,
        limit: 100,
      },
    });
  };

  ///usePagination custom hook
  const {
    currentPage,
    shownFrom,
    totalItems,
    numberOfPages,
    nextPage,
    previousPage,
    selectedPage,
    currentData,
  } = usePagination(list ? 10 : 8, {
    data: isFiltered ? filterData?.pokemons! : data?.pokemons!,
    isRecent: false,
    currentIndex,
    currentLastIndex,
    filtered: isFiltered,
    handleFetchMore,
    setCurrentIndex,
    setCurrentLastIndex,
  });

  ///fetch either FilteredData or FetchAllPokemons based on isFiltered value
  useEffect(() => {
    if (isFiltered) {
      (async function () {
        await filterDataQuery({
          variables: { type: types },
        });
        setCurrentPage(1);
      })();
    } else {
      (async function () {
        await fetchAllPokemons({
          variables: {
            limit: 100,
            offset: 0,
          },
        });
        setCurrentPage(1);
      })();
    }
  }, [fetchAllPokemons, filterDataQuery, isFiltered, setCurrentPage, types]);

  ///set toggle the isFiltered Value based on the filterTypes Length
  useEffect(() => {
    if (types.length > 0) {
      setIsFiltered(true);
    } else setIsFiltered(false);
  }, [setIsFiltered, types.length]);

  ///Set the current page to the first page on load
  useEffect(() => {
    setlistView(list);
    setCurrentPage(currentIndex + 1);
  }, [currentIndex, list, setCurrentPage]);

  return (
    <Box minH="100vh" mt={9} mb={14}>
      <Flex
        flexDirection="column"
        mx={{ lg: "auto", base: "20px" }}
        maxW={{ lg: "70%", base: "100%" }}
      >
        <Flex justifyContent="space-between">
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            display={{ base: "flex", lg: "block" }}
            alignItems={{ base: "center", lg: "start" }}
            justifyItems="center"
            fontWeight="600"
            fontSize={{ lg: "xl", base: "2xl" }}
            lineHeight="32px"
            color="light"
          >
            Choose a Pokemon
          </Text>
          <Flex gridColumnGap={5} px={4} py={3}>
            <FilterType />
            <Icon
              zIndex={1}
              _hover={{ cursor: "pointer" }}
              onClick={() => toggleView(true)}
              as={HiViewList}
              fill="white"
              w={{ lg: 5, base: 10 }}
              h={{ lg: 5, base: 10 }}
            />

            <Icon
              zIndex={1}
              _hover={{ cursor: "pointer", background: "transparent" }}
              onClick={() => toggleView(false)}
              background="transparent"
              as={BsGridFill}
              fill="white"
              aria-label="grid"
              w={{ lg: 5, base: 10 }}
              h={{ lg: 5, base: 10 }}
            />
          </Flex>
        </Flex>

        <Box mt={10} zIndex={1}>
          {listView ? (
            loading || filterLoading ? (
              <Loading />
            ) : (
              <PokemonListView pokemon={currentData()} />
            )
          ) : loading || filterLoading ? (
            <Loading />
          ) : (
            <PokemonGridView pokemons={currentData()} />
          )}
        </Box>

        <HStack justify="end" mt={5} mb={5} zIndex={1}>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            fontSize={{ lg: "md", base: "xl" }}
            lineHeight="md"
            color="text.light"
          >
            Showing {shownFrom}-{totalItems} of{" "}
            {isFiltered
              ? filterData?.pokemons?.length!
              : data?.pokemons?.length!}
          </Text>
        </HStack>

        {/** Pagination Section */}
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
          currentIndex={currentIndex}
          selectedPage={selectedPage}
          currentLastIndex={currentLastIndex}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          currentData={currentData}
        />
      </Flex>
    </Box>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
