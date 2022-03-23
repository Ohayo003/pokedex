import {
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import PokemonDetails from "src/components/widgets/Pokemon/Details/PokemonDetails";
import { GET_POKEMON } from "src/graphql/queries/pokemon/getpokemon";
import { Router, useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetPokemon } from "src/types/GetPokemon";
import Loading from "src/components/widgets/Loading";
import colorTypes from "src/utils/colorTypes";
import useStore from "src/hooks/useStore";
import { usePagination } from "src/hooks/usePagination";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PokemonId = () => {
  const router = useRouter();
  const loadingRoute = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const datas = useStore((state) => state.carousel);
  const { data, loading } = useQuery<GetPokemon>(GET_POKEMON, {
    variables: {
      id: router.query.pokemonId,
    },
    context: { clientName: "pokedexapi" },
  });
  const [getRecent, { data: recentData, loading: recentLoading }] =
    useLazyQuery<GetPokemon>(GET_POKEMON, {
      fetchPolicy: "network-only",
    });

  const { currentData, nextPage, currentPage, numberOfPages, previousPage } =
    usePagination(6, { datas });

  if (loading || recentLoading) {
    return <Loading />;
  }
  return (
    <Box mx="auto" minH="100vh">
      <Box w="fit-content" mx="auto">
        <Breadcrumb mt={5} separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            fontSize="14px"
            lineHeight="17px"
            color="gray500"
          >
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            fontSize="14px"
            lineHeight="17px"
            color="white"
          >
            <BreadcrumbLink>Pokemon details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex
          mt={10}
          gap={16}
          w="fit-content"
          align={{ base: "center", lg: "start" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <VStack gap={9} align="left">
            <Box
              width="20.313rem"
              height="24.313rem"
              background={colorTypes(
                recentData
                  ? recentData.pokemon?.element[0].type?.name!
                  : data?.pokemon?.element[0].type?.name!
              )}
              borderRadius="4px"
              position="relative"
              overflow="hidden"
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
                  recentData ? recentData.pokemon?.id : data?.pokemon?.id
                }.png`}
                alt="dragaon"
                layout="fill"
                objectFit="cover"
              />
            </Box>

            {/**Carousel Container Section */}
            <HStack gap={5} justify="center" zIndex={1}>
              <Box
                width="2rem"
                height="2rem"
                border="1px solid"
                borderColor={currentPage <= 1 ? "gray500" : "primary"}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  onClick={() => (currentPage > 1 ? previousPage() : null)}
                  as={BiChevronLeft}
                  _hover={{ cursor: "pointer" }}
                  w={6}
                  h={6}
                  fill={currentPage <= 1 ? "gray500" : "primary"}
                />
              </Box>
              <SimpleGrid columns={3} gap={2}>
                {datas.length &&
                  currentData().map((item, idx) => {
                    return (
                      <Box
                        key={idx}
                        width="57px"
                        height="57px"
                        overflow="hidden"
                        borderRadius="4px"
                        background={item.bg}
                        _hover={{ cursor: "pointer" }}
                        onClick={() => router.push(`/home/${item.id}`)}
                      >
                        <Image
                          src={item.image}
                          alt="dragon"
                          width="57px"
                          height="57px"
                          layout="responsive"
                        />
                      </Box>
                    );
                  })}
              </SimpleGrid>
              <Box
                width="2rem"
                height="2rem"
                border="1px solid"
                borderColor={
                  currentPage >= numberOfPages.length ? "gray500" : "primary"
                }
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  onClick={() =>
                    currentPage >= numberOfPages.length ? null : nextPage()
                  }
                  _hover={{ cursor: "pointer" }}
                  as={BiChevronRight}
                  w={6}
                  h={6}
                  fill={
                    currentPage >= numberOfPages.length ? "gray500" : "primary"
                  }
                />
              </Box>
            </HStack>
          </VStack>

          {/** Pokemon Details Section */}
          <PokemonDetails
            pokemon={recentData ? recentData?.pokemon! : data?.pokemon!}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default PokemonId;

PokemonId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
