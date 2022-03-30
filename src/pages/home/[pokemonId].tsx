import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Icon,
  SimpleGrid,
  Breadcrumb,
  type BoxProps,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import PokemonDetails from "src/components/widgets/Pokemon/Details/PokemonDetails";
import { GET_POKEMON } from "src/graphql/queries/pokemon/getpokemon";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GetPokemon } from "src/types/GetPokemon";
import Loading from "src/components/widgets/Loading";
import useStore from "src/hooks/useStore";
import { usePagination } from "src/hooks/usePagination";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Card from "src/components/widgets/Card";
import { motion } from "framer-motion";
import { SiZcash } from "react-icons/si";
import { useCollection } from "../../hooks/useCollection";
import colorTypes from "src/utils/colorTypes";
import pokemonImage from "src/utils/image";
import ConfirmModal from "src/components/widgets/ConfirmModal";

export const MotionBox = motion<BoxProps>(Box);

const PokemonId = () => {
  const router = useRouter();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const recentVisit = useStore((state) => state.carousel);
  const addCarousel = useStore((state) => state.addCarousel);
  const [activeBreadcrumb, setActiveBreadcrumb] = useState("About");
  const collections = useStore((state) => state.collections);

  ///fetch pokemon details using pokemon id
  const { data, loading } = useQuery<GetPokemon>(GET_POKEMON, {
    variables: {
      id: router.query.pokemonId,
    },
    context: { clientName: "pokedexapi" },
  });

  const image = pokemonImage(data?.pokemon?.id!);

  ///value of each pokemon
  const PPointsValue = 30 * data?.pokemon?.id!;

  const handleAddRecent = (id: number, image: string, bg: string) => {
    addCarousel(id, image, bg);
  };

  const { checkPoints, ObtainPokemon, checkExistingPokemonCollection } =
    useCollection({
      p_pointsValue: PPointsValue,
      pokemon: {
        id: data?.pokemon?.id!,
        name: data?.pokemon?.name!,
        image,
        bg: colorTypes(data?.pokemon?.element[0].type?.name!),
      },
    });
  console.log(checkExistingPokemonCollection());

  ///usePagination
  const { currentData, nextPage, currentPage, numberOfPages, previousPage } =
    usePagination(6, { data: recentVisit, isRecent: true });

  ///set the currentPage to 1 on Load and set the activeBreadcrumb using the query tab
  useEffect(() => {
    setCurrentPage(1);
    if (router.query.tab) {
      setActiveBreadcrumb(router.query.tab as string);
    }
  }, [data, router.query, setCurrentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box mx={{ base: "20px", lg: "auto" }} minH="100vh">
        <Box w="fit-content" mx="auto">
          <Breadcrumb mt={5} separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="17px"
              color="gray500"
            >
              <Link passHref href="/home">
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="17px"
              color="white"
            >
              <BreadcrumbLink>Pokemon details</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="17px"
              color="white"
            >
              <BreadcrumbLink>{activeBreadcrumb}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex
            mt={10}
            gap={16}
            w="fit-content"
            align={{ base: "center", lg: "start" }}
            flexDirection={{ base: "column", lg: "row" }}
          >
            <VStack gap={9} align="center" zIndex={1}>
              <Box
                width={{ lg: "20.313rem", base: "30rem" }}
                height={{ lg: "24.313rem", base: "30rem" }}
                background="gray800"
                borderRadius="4px"
                position="relative"
                p={2}
                overflow="hidden"
              >
                <Image
                  src={pokemonImage(data?.pokemon?.id!)}
                  alt={data?.pokemon?.name}
                  layout="fill"
                />
              </Box>

              {/**Carousel Container Section */}
              <HStack gap={5} justify="center" zIndex={1}>
                <Box
                  width={{ lg: "2rem", base: "4rem" }}
                  height={{ lg: "2rem", base: "4rem" }}
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
                    w={{ lg: 6, base: 12 }}
                    h={{ lg: 6, base: 12 }}
                    fill={currentPage <= 1 ? "gray500" : "primary"}
                  />
                </Box>
                <SimpleGrid columns={3} gap={2} animation="running">
                  {currentData().length! &&
                    currentData().map((item, idx) => {
                      return (
                        <MotionBox
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Box
                            width={{ lg: "3.563rem", base: "6rem" }}
                            height={{ lg: "3.563rem", base: "6rem" }}
                            overflow="hidden"
                            borderRadius="4px"
                            background={item.bg}
                            _hover={{ cursor: "pointer" }}
                            onClick={() => {
                              router.push(`/home/${item.id}`);
                              handleAddRecent(item.id, item.image, item.bg);
                            }}
                            position="relative"
                          >
                            <Image
                              src={item.image || "null"}
                              alt="dragon"
                              // width="57px"
                              // height="57px"
                              layout="fill"
                            />
                          </Box>
                        </MotionBox>
                      );
                    })}
                </SimpleGrid>
                <Box
                  width={{ lg: "2rem", base: "4rem" }}
                  height={{ lg: "2rem", base: "4rem" }}
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
                    w={{ lg: 6, base: 12 }}
                    h={{ lg: 6, base: 12 }}
                    fill={
                      currentPage >= numberOfPages.length
                        ? "gray500"
                        : "primary"
                    }
                  />
                </Box>
              </HStack>

              {/**Points section */}
              <Flex justifyContent="space-between" width="15rem">
                <HStack>
                  <Text
                    fontFamily="Inter"
                    fontWeight="semibold"
                    color="text.light"
                    fontSize={{ base: "xl", lg: "md" }}
                  >
                    Points:
                  </Text>
                  <HStack>
                    <Text
                      fontFamily="Inter"
                      fontWeight="bold"
                      fontStyle="italic"
                      color="primary"
                      fontSize={{ base: "xl", lg: "md" }}
                    >
                      {PPointsValue}
                    </Text>
                    <Icon as={SiZcash} w={5} h={5} fill="primary" />
                  </HStack>
                </HStack>
                <Button
                  color="primary"
                  height={{ lg: "2rem" }}
                  background="transparent"
                  _focus={{ borderColor: "transparent", color: "gray" }}
                  variant="outline"
                  _disabled={{ borderColor: "gray", color: "gray" }}
                  isDisabled={
                    !checkPoints() || checkExistingPokemonCollection()
                  }
                  borderColor="primary"
                  _pressed={{ background: "transparent" }}
                  _hover={{
                    background: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  onClick={onOpen}
                >
                  {checkExistingPokemonCollection() ? "Obtained" : "Obtain"}
                </Button>
              </Flex>
            </VStack>

            {/** Pokemon Details Section */}
            <PokemonDetails pokemon={data?.pokemon!} />
          </Flex>
        </Box>
      </Box>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          p_points_value={PPointsValue}
          onClose={onClose}
          obtainPokemon={ObtainPokemon}
        />
      )}
    </>
  );
};

export default PokemonId;

PokemonId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
