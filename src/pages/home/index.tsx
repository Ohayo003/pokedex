import {
  Box,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Text,
  Stack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import "@fontsource/inter";
import { HiViewList, HiOutlineFilter } from "react-icons/hi";
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
import { useLazyQuery, useQuery } from "@apollo/client";
import Loading from "src/components/widgets/Loading";
import { usePagination } from "src/hooks/usePagination";
import Router, { useRouter } from "next/router";
import { GET_POKEMON_TYPES } from "../../graphql/queries/pokemon/pokemonlist";
import { GetPokemonTypes } from "../../types/GetPokemonTypes";
import {
  GetPokemonDataList,
  GetPokemonDataListVariables,
} from "src/types/GetPokemonDataList";

const HomePage = () => {
  const { status } = useSession({ required: true });
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [currentLastIdx, setCurrentLastIdx] = useState(10);
  const [filteredData, setFilteredData] = useState<GetPokemonDataList | any>();
  const router = useRouter();

  const loadingRoute = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const list = useStore((state) => state.listView);
  const [listView, setlistView] = useState<Boolean | undefined>();
  const toggleView = useStore((state) => state.toggleView);

  ///useQuery to display list of pokemon
  const { loading, data, error, fetchMore, refetch } = useQuery<
    GetPokemonDataList,
    GetPokemonDataListVariables
  >(GET_POKEMON_DATA_LIST, {
    variables: {
      limit: 100,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
    context: { clientName: "pokedexapi" },
  });

  console.log(isFiltered);
  console.log(filteredData);
  ///usePagination custom hook
  const {
    currentPage,
    numberOfPages,
    nextPage,
    previousPage,
    selectedPage,
    currentData,
  } = usePagination(10, { data: data?.pokemons! });

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

  useEffect(() => {
    setlistView(list);
  }, [list]);

  if (loadingRoute) {
    return <Loading />;
  }

  return (
    <Box
      minH={{ lg: "100vh", base: "fit-content" }}
      // w={{ base: "full" }}
      minW={{ base: "482px" }}
      mt={9}
      mb={14}
    >
      <Flex flexDirection="column" mx="auto" maxW="70%">
        <Flex justifyContent="space-between">
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            fontSize="xl"
            lineHeight="32px"
            color="light"
          >
            Choose a Pokemon
          </Text>
          <HStack gap={8}>
            <Filters
              setIsFiltered={setIsFiltered}
              setFilteredData={setFilteredData!}
            />
            <Icon
              zIndex={1}
              _hover={{ cursor: "pointer" }}
              onClick={() => toggleView(true)}
              as={HiViewList}
              fill="white"
              w={5}
              h={5}
            />

            <Icon
              zIndex={1}
              _hover={{ cursor: "pointer", background: "transparent" }}
              onClick={() => toggleView(false)}
              background="transparent"
              as={BsGridFill}
              fill="white"
              aria-label="grid"
              w={5}
              h={5}
            />
          </HStack>
        </Flex>

        <Box mt={10} zIndex={1}>
          {listView ? (
            loading ? (
              <Loading />
            ) : (
              <PokemonListView pokemon={currentData()} />
            )
          ) : loading ? (
            <Loading />
          ) : (
            <PokemonGridView pokemons={currentData()} />
          )}
        </Box>

        <HStack justify="end" mt={4}>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            fontSize="md"
            lineHeight="md"
            color="text.light"
          >
            Showing{" "}
            {currentPage! * currentData()?.length! - currentData()?.length! + 1}
            -{currentPage! * currentData()?.length!} of{" "}
            {data?.pokemons?.length!}
          </Text>
        </HStack>

        {/** Pagination Section */}
        <Flex justifyContent="center" gap={6} align="center" zIndex={1}>
          <Icon
            onClick={() => {
              if (currentPage <= currentIndx && currentIndx > 1) {
                setCurrentLastIdx(currentLastIdx - 10);
                setCurrentIndx(currentIndx - 10);
              }
              previousPage();
            }}
            as={BiChevronLeft}
            w={6}
            h={6}
            _hover={{
              cursor: "pointer",
              fill: "primary",
            }}
            fill="#718096"
          />
          <HStack>
            {numberOfPages.slice(currentIndx, currentLastIdx).map((idx) => {
              return (
                <Button
                  key={idx}
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="500"
                  onClick={() => {
                    selectedPage(idx);
                    router.push("/home", {
                      query: `page=${idx}&total=${currentData()?.length!}`,
                    });
                  }}
                  lineHeight="lg"
                  background={currentPage === idx ? "primary" : "gray100"}
                  _hover={{ background: "primary" }}
                >
                  {idx}
                </Button>
              );
            })}
          </HStack>
          <Icon
            onClick={() => {
              if (currentPage >= numberOfPages.length) {
                handleFetchMore();
              }
              if (currentPage >= currentLastIdx) {
                setCurrentIndx(currentIndx + currentLastIdx);
                setCurrentLastIdx(currentLastIdx + currentPage);
              }
              nextPage();
            }}
            as={BiChevronRight}
            w={6}
            h={6}
            fill="#718096"
            _hover={{
              cursor: "pointer",
              fill: "primary",
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomePage;

interface IFilters {
  setIsFiltered: Dispatch<React.SetStateAction<boolean>>;
  setFilteredData?: Dispatch<SetStateAction<GetPokemonDataList | any>>;
}

///Filter Selection
const Filters = ({ setIsFiltered, setFilteredData }: IFilters) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [types, setTypes] = useState<string[]>([]);
  const { data: typeData } = useQuery<GetPokemonTypes>(GET_POKEMON_TYPES, {
    context: { clientName: "pokedexapi" },
  });

  let filters: GetPokemonTypes["types"] = [];

  if (typeData?.types) {
    filters = [...typeData.types];
  }

  const [filterData, { data, loading, error }] = useLazyQuery(
    FILTER_POKEMON_BY_ELEMENT,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      context: { clientName: "pokedexapi" },
    }
  );

  const handleAddFilter = (type: string) => {
    const idx = types.indexOf(type);
    console.log(idx);
    if (idx === -1) {
      setTypes((prev) => [...prev, type]);
    }

    handleFilterPokemon(types);
    console.log(types);
  };
  function getChecked() {
    // console.log(getChex);
  }

  const handleFilterPokemon = async (type: string[]) => {
    console.log("this is types : ", type);
    const newType =
      type &&
      type.map((type) => {
        return type.toLocaleLowerCase();
      });
    await filterData({
      variables: {
        type: newType,
      },
    });
  };
  if (error) {
    console.log(error.message);
  }
  if (data?.pokemons) {
    console.log(data);
    setFilteredData(data!);
  }

  // const filters = ["Normal", "Fire", "Water", "Grass", "Flying", "Fighting"];
  return (
    <Stack direction={"row"} spacing={7}>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Icon as={HiOutlineFilter} fill="white" w={5} h={5} />
        </MenuButton>
        <MenuList
          overflow="hidden"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
              borderRadius: "12px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary",
            },
          }}
          height="230px"
          ml={-10}
          width={44}
          zIndex={2}
        >
          {filters &&
            filters.map((type, idx) => {
              return (
                <MenuItem
                  onClick={() => {
                    setCurrentIndex(idx);
                    handleAddFilter(type.name);
                    // handleFilterPokemon(types);
                  }}
                  key={idx}
                >
                  <Flex minW="full" justifyContent="space-between">
                    <Text
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="400"
                      fontSize="sm"
                      lineHeight="xl"
                    >
                      {type.name}
                    </Text>
                    <Checkbox
                      iconColor="primaryDark"
                      borderRadius="lg"
                      value={type.name}
                      // isChecked={}
                      onChange={(value) => {
                        types.splice(types.indexOf(value.target.value), 1);
                        console.log(types);
                        handleAddFilter(value.target.value);
                      }}
                      size="lg"
                      colorScheme="background.amber"
                    />
                  </Flex>
                </MenuItem>
                //   </Box>
              );
            })}
        </MenuList>
      </Menu>
    </Stack>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
