import {
  Box,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Text,
  Stack,
  Menu,
  CheckboxGroup,
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
import {
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import Loading from "src/components/widgets/Loading";
import { usePagination } from "src/hooks/usePagination";
import { useRouter } from "next/router";
import { GET_POKEMON_TYPES } from "../../graphql/queries/pokemon/pokemonlist";
import { GetPokemonTypes } from "../../types/GetPokemonTypes";
import {
  GetPokemonDataList,
  GetPokemonDataListVariables,
} from "src/types/GetPokemonDataList";

const HomePage = () => {
  const { status } = useSession({ required: true });
  const isFiltered = useStore((state) => state.isFiltered);
  const setIsFiltered = useStore((state) => state.setIsFiltered);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [currentLastIdx, setCurrentLastIdx] = useState(10);
  const numberPerPage = 10;
  const router = useRouter();
  const types = useStore((state) => state.filterTypes);
  const setTypes = useStore((state) => state.setFilterTypes);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const list = useStore((state) => state.listView);
  const [listView, setlistView] = useState<Boolean | undefined>();
  const toggleView = useStore((state) => state.toggleView);

  ///useQuery to display list of pokemon
  const [fetchAllPokemons, { loading, data, error, fetchMore }] = useLazyQuery<
    GetPokemonDataList,
    GetPokemonDataListVariables
  >(GET_POKEMON_DATA_LIST, {
    notifyOnNetworkStatusChange: true,
    context: { clientName: "pokedexapi" },
  });

  ///useLazyQuery for filtering pokemon by pokemon element Type
  const [
    filterDataQuery,
    { data: filterData, error: filterError, loading: filterLoading },
  ] = useLazyQuery<GetPokemonDataList>(FILTER_POKEMON_BY_ELEMENT, {
    notifyOnNetworkStatusChange: true,
    context: { clientName: "pokedexapi" },
  });

  ///usePagination custom hook
  const {
    currentPage,
    numberOfPages,
    nextPage,
    previousPage,
    selectedPage,
    currentData,
  } = usePagination(10, {
    data: isFiltered ? filterData?.pokemons! : data?.pokemons!,
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

  ///fetch either FilteredData or FetchAllPokemons based on isFiltered value
  useEffect(() => {
    if (isFiltered) {
      (async function () {
        await filterDataQuery({
          variables: { type: types },
        });
      })();
      // router.push("/home", { query: `types=${types}` });
    } else {
      (async function () {
        await fetchAllPokemons({
          variables: {
            limit: 100,
            offset: 0,
          },
        });
      })();
    }
  }, [fetchAllPokemons, filterDataQuery, isFiltered, types]);

  ///set toggle the isFiltered Value based on the filterTypes Length
  useEffect(() => {
    if (types.length > 0) {
      setIsFiltered(true);
    } else setIsFiltered(false);
  }, [setIsFiltered, types.length]);

  ///Set the current page to the first page on load
  useEffect(() => {
    setlistView(list);
    setCurrentPage(currentIndx + 1);
  }, [currentIndx, list, setCurrentPage]);

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
          <Flex gridColumnGap={5} px={4} py={3}>
            <Filters />
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
            {isFiltered
              ? filterData?.pokemons?.length!
              : data?.pokemons?.length!}
          </Text>
        </HStack>

        {/** Pagination Section */}
        <Flex justifyContent="center" gap={6} align="center" zIndex={1}>
          <Icon
            onClick={() => {
              if (currentIndx > 1) {
                setCurrentLastIdx((prev) => prev - numberPerPage);
                setCurrentIndx((prev) => prev - numberPerPage);
              }
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
              if (data?.pokemons.length! < 1126) {
                handleFetchMore();
                setCurrentIndx((prev) => prev + numberPerPage);
                setCurrentLastIdx((prev) => prev + numberPerPage);
              } else {
                setCurrentIndx((prev) => prev + numberPerPage);
                setCurrentLastIdx((prev) => prev + numberPerPage);
              }
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

// interface IFilters {
//   types: string[];
//   setTypes: (value: string) => void;
// }

///Filter Selection
const Filters = () => {
  const types = useStore((state) => state.filterTypes);
  const setTypes = useStore((state) => state.setFilterTypes);
  const removeFilterType = useStore((state) => state.removeFilterTpyes);

  const { data: typeData } = useQuery<GetPokemonTypes>(GET_POKEMON_TYPES, {
    context: { clientName: "pokedexapi" },
  });

  let filters: GetPokemonTypes["types"] = [];

  if (typeData?.types) {
    filters = [...typeData.types];
  }

  const handleAddFilter = (type: string) => {
    const idx = types.indexOf(type);
    const findType = types.find((item) => item === type);
    console.log(idx);
    if (!findType) {
      setTypes(type);
    }

    console.log(types);
  };

  return (
    <Menu closeOnSelect={false} placement="bottom-start" gutter={10}>
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
        <CheckboxGroup
          defaultValue={
            types &&
            types.map((item) => {
              return item;
            })
          }
        >
          {filters &&
            filters
              .filter((obj) => {
                return obj.name !== "unknown";
              })
              .map((type, idx) => {
                return (
                  <MenuItem key={idx}>
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
                        // checked={types[idx] === type.name}
                        // isChecked={types[idx] === type.name ? true : false}
                        // isChecked={}
                        onChange={(value) => {
                          if (value.target.checked) {
                            handleAddFilter(value.target.value);
                          } else {
                            removeFilterType(value.target.value);
                          }
                          // types.splice(types.indexOf(value.target.value), 1);
                        }}
                        size="lg"
                        colorScheme="background.amber"
                      />
                    </Flex>
                  </MenuItem>
                );
              })}
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
