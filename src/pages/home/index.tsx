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
import React, { useEffect, useState } from "react";
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
import { GET_POKEMON_DATA_LIST } from "../../graphql/queries/pokemon/pokemonlist";
import { useQuery } from "@apollo/client";
import Loading from "src/components/widgets/Loading";
import { usePagination } from "src/hooks/usePagination";
import { GetPokemonDataList } from "../../types/GetPokemonDataList";

const HomePage = () => {
  const { loading, data, error } = useQuery(GET_POKEMON_DATA_LIST, {
    context: { clientName: "pokedexapi" },
  });

  let pokemon: GetPokemonDataList["pokemon"] = [];

  if (data) {
    pokemon = [...data.pokemon];
  }

  const list = useStore((state) => state.listView);
  const [listView, setlistView] = useState<Boolean | undefined>();
  const toggleView = useStore((state) => state.toggleView);

  const { data: session } = useSession({ required: true });
  const {
    currentPage,
    numberOfPages,
    setCurrentPage,
    nextPage,
    previousPage,
    selectedPage,
    currentData,
  } = usePagination(10, { pokemon });

  useEffect(() => {
    setlistView(list);
  }, [list]);

  

  return (
    <Box
      minH={{ lg: "100vh", base: "fit-content" }}
      w={{ base: "full" }}
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
            {currentPage * currentData().length - currentData().length + 1}-
            {currentPage * currentData().length} of {pokemon?.length}
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
                  onClick={() => selectedPage(idx)}
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
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomePage;

///Filter Selection
const Filters = () => {
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
          {filters.map((item, idx) => {
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
                    {item}
                  </Text>
                  <Checkbox
                    iconColor="primaryDark"
                    borderRadius="lg"
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
