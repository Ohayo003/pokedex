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
import { GetPokemonDataList } from "src/types/GetPokemonDataList";
import {
  FilterPokemonByElementVariables,
  FilterPokemonByElement,
} from "src/types/FilterPokemonByElement";

const HomePage = () => {
  const { status } = useSession({ required: true });
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState<
    GetPokemonDataList | undefined
  >(null);
  const router = useRouter();

  ///useQuery to display list of pokemon
  const { loading, data, error } = useQuery<GetPokemonDataList>(
    GET_POKEMON_DATA_LIST,
    {
      context: { clientName: "pokedexapi" },
    }
  );

  const loadingRoute = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const list = useStore((state) => state.listView);
  const [listView, setlistView] = useState<Boolean | undefined>();
  const toggleView = useStore((state) => state.toggleView);

  let datas: GetPokemonDataList["pokemons"] = [];

  if (data?.pokemons) {
    datas = [...data.pokemons!];
  }
  console.log(router.query.page);

  ///usePagination custom hook
  const {
    currentPage,
    numberOfPages,
    nextPage,
    previousPage,
    selectedPage,
    currentData,
  } = usePagination(10, { datas });

  useEffect(() => {
    setlistView(list);
    const handelChangeRoute = () => {
      console.log("changing route...");
      setLoading(true);
    };
    const handleChangeRouteComplete = () => {
      console.log("changing route Complete...");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", handelChangeRoute);
    Router.events.on("routeChangeComplete", handleChangeRouteComplete);

    return () => {
      Router.events.off("routeChangeStart", handelChangeRoute);
      Router.events.off("routeChangeComplete", handleChangeRouteComplete);
    };
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
      <Flex flexDirection="column" mx="auto" maxW={{ lg: "70%", base: "90%" }}>
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
            {currentPage! * currentData().length - currentData().length + 1}-
            {currentPage! * currentData().length} of {datas?.length}
          </Text>
        </HStack>

        {/** Pagination Section */}
        <Flex justifyContent="center" gap={6} align="center" zIndex={1}>
          <Icon
            onClick={previousPage}
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
            {numberOfPages.map((idx) => {
              return (
                <Button
                  key={idx}
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="500"
                  onClick={() => {
                    selectedPage(idx);
                    router.push("/home", {
                      query: `page=${idx}&total=${currentData().length}`,
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
            onClick={nextPage}
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
  setFilteredData: Dispatch<SetStateAction<GetPokemonDataList[] | undefined>>;
}

///Filter Selection
const Filters = ({ setIsFiltered, setFilteredData }: IFilters) => {
  ///useLazyQuery for filtering list of pokemon based on types
  const [
    filterPokemons,
    { data: filterData, loading: filterLoading, error: filterError },
  ] = useLazyQuery<FilterPokemonByElement, FilterPokemonByElementVariables>(
    FILTER_POKEMON_BY_ELEMENT,
    {
      fetchPolicy: "network-only",
    }
  );

  if (filterData?.pokemon_v2_pokemon!) {
    setFilteredData(filterData.pokemon_v2_pokemon);
  }

  const filters = ["Normal", "Fire", "Water", "Grass", "Flying", "Fighting"];
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
        <MenuList ml={-10} width={44} zIndex={2}>
          {filters.map((type, idx) => {
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
                    {type}
                  </Text>
                  <Checkbox
                    iconColor="primaryDark"
                    borderRadius="lg"
                    value={type}
                    // isChecked={}
                    onChange={(value) => {
                      console.log(type);
                      setIsFiltered((value) => !value);
                      filterPokemons({
                        variables: {
                          type: type,
                        },
                        context: { clientName: "pokedexapi" },
                      });
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
