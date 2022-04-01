import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import "@fontsource/inter";
import { HiViewList } from "react-icons/hi";
import { BsGridFill } from "react-icons/bs";
import PokemonListView from "src/components/widgets/Pokemon/PokemonListView";
import PokemonGridView from "src/components/widgets/Pokemon/PokemonGridView";
import useStore from "src/hooks/useStore";
import { useSession } from "next-auth/react";
import {
  FILTER_POKEMON_BY_ELEMENT,
  GET_POKEMON_DATA_LIST,
} from "src/graphql/queries/pokemon/pokemonlist";
import { useLazyQuery, useQuery } from "@apollo/client";
import Loading from "src/components/widgets/Loading";
import { usePagination } from "src/hooks/usePagination";
import {
  GetPokemonDataList,
  GetPokemonDataListVariables,
} from "src/types/GetPokemonDataList";
import FilterType from "src/components/widgets/Pokemon/FilterTypes";
import Pagination from "src/components/widgets/Pokemon/Pagination";
import { newLimit } from "src/utils/limit";
import { useGetPokemonTotal } from "src/hooks/useGetPokemonTotal";
import { GetStaticProps } from "next";
import client from "src/apollo/apollo-client";

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<
    GetPokemonDataList,
    GetPokemonDataListVariables
  >({
    query: GET_POKEMON_DATA_LIST,
    variables: {
      offset: 0,
      limit: 100,
    },

    context: { clientName: "pokedexapi" },
  });

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
};

const HomePage = ({ pokemons }: GetPokemonDataList) => {
  const { count } = useGetPokemonTotal();

  ///toggles when the app fetch using the types of pokemons
  const isFiltered = useStore((state) => state.isFiltered);
  const setIsFiltered = useStore((state) => state.setIsFiltered);

  const filteredTicked = useStore((state) => state.loading);
  const setFilteredTicked = useStore((state) => state.setLoading);

  ///set and get the current page
  const currentIndex = useStore((state) => state.currentIndex);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  ///elements types stored here are used for filtering
  const types = useStore((state) => state.filterTypes);
  const offset = currentIndex * 10;
  const [loadingData, setLoadingData] = useState(false);

  ///used for triggering list view
  const list = useStore((state) => state.listView);
  const [listView, setlistView] = useState<Boolean | undefined>();
  const toggleView = useStore((state) => state.toggleView);

  ///useQuery to display list of pokemon
  const [fetchAllPokemons, { loading, data, error, fetchMore }] = useLazyQuery<
    GetPokemonDataList,
    GetPokemonDataListVariables
  >(GET_POKEMON_DATA_LIST, {
    context: { clientName: "pokedexapi" },
    notifyOnNetworkStatusChange: true,
  });

  ///useLazyQuery for filtering pokemon by pokemon element Type
  const [filterDataQuery, { data: filterData, loading: filterLoading }] =
    useLazyQuery<GetPokemonDataList>(FILTER_POKEMON_BY_ELEMENT, {
      context: { clientName: "pokedexapi" },
    });

  let pokemonsData: GetPokemonDataList["pokemons"] = [];

  ///Handle the fetchmore data for list of pokemon
  const handleFetchMore = async () => {
    await fetchMore({
      updateQuery: (_, { fetchMoreResult: pokemons }): GetPokemonDataList => {
        return pokemons!;
      },
      variables: {
        offset: 0,
        limit: pokemonsData.length + 100,
      },
    });
  };

  if (isFiltered && filterData?.pokemons) {
    pokemonsData = filterData.pokemons;
  }
  if (!isFiltered && pokemons) {
    pokemonsData = pokemons;
  }
  if (!isFiltered && data?.pokemons) {
    pokemonsData = data.pokemons;
  }

  ///usePagination custom hook
  const {
    shownFrom,
    totalItems,
    numberOfPages,
    nextPage,
    previousPage,
    selectedPage,
    currentData,
  } = usePagination(10, {
    data: pokemonsData,
    isRecent: false,
    filtered: isFiltered,
    handleFetchMore,
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
        console.log("it went here");
        await fetchAllPokemons({
          variables: {
            offset: 0,
            limit: 100,
          },
        });
        setCurrentPage(1);
      })();
    }
  }, [fetchAllPokemons, filterDataQuery, isFiltered, setCurrentPage, types]);

  ///set toggle the isFiltered Value based on the filterTypes Length
  useEffect(() => {
    if (types?.length! > 0) {
      setIsFiltered(true);
      setFilteredTicked(true);
    } else setIsFiltered(false);
  }, [setIsFiltered, types?.length!, setFilteredTicked]);

  useEffect(() => {
    if (filteredTicked) {
      setTimeout(() => setFilteredTicked(false), 1000);
    }
  }, [filteredTicked]);

  ///stores the value of list from the useStore to setListView state on load
  useEffect(() => {
    setlistView(list);
  }, [list]);

  ///sets back the loadingData to false after 1 sec
  useEffect(() => {
    if (loadingData) {
      setTimeout(() => setLoadingData(false), 1000);
    }
  }, [loadingData]);

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
            ///loading variable is for fetchingAllPokemons
            ///loadingData is for clicking next and Prev Page
            ///filterLoading is for the filter query
            loading || filteredTicked || loadingData || filterLoading ? (
              <Loading loadingText="Loading data..." />
            ) : (
              <PokemonListView pokemons={currentData()} />
            )
          ) : loading || filteredTicked || loadingData || filterLoading ? (
            <Loading loadingText="Loading data..." />
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
            {isFiltered ? filterData?.pokemons?.length! : pokemonsData?.length!}
          </Text>
        </HStack>

        {/** Pagination Section */}
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
          setLoading={setLoadingData}
          selectedPage={selectedPage}
          numberOfPages={numberOfPages}
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
