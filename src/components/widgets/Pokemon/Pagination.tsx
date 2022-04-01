import { Box, Button, Flex, HStack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Dispatch } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import useStore from "src/hooks/useStore";
import { useGetPokemonTotal } from "../../../hooks/useGetPokemonTotal";

interface IPagination {
  previousPage: () => void;
  nextPage: () => void;
  selectedPage: (idx: number) => void;
  numberOfPages: number[];
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  currentData: () => any[];
}

const Pagination = ({
  previousPage,
  nextPage,
  numberOfPages,
  setLoading,
  selectedPage,
  currentData,
}: IPagination) => {
  const router = useRouter();
  const currentPage = useStore((state) => state.currentPage);
  const currentIndex = useStore((state) => state.currentIndex);
  const currentLastIndex = useStore((state) => state.currentLastIndex);
  const { count } = useGetPokemonTotal();

  const handleNextPage = () => {
    if (currentLastIndex < count && currentLastIndex >= numberOfPages.length) {
      nextPage();
      setLoading(true);
    }
    if (currentLastIndex < numberOfPages.length) {
      nextPage();
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1 || currentIndex > 0) {
      previousPage();
      // setLoading(true);
    }
  };

  return (
    <Flex justifyContent="center" mt={2} gap={6} align="center" zIndex={1}>
      <Box
        background="gray800"
        borderRadius="full"
        display="flex"
        width="2rem"
        height="2rem"
        justifyContent="center"
        alignItems="center"
        _hover={{
          cursor: "pointer",
          background: "primary",
        }}
      >
        <Icon
          onClick={handlePrevPage}
          as={BiChevronLeft}
          w={{ lg: 7, base: 10 }}
          h={{ lg: 7, base: 10 }}
          fill="#718096"
          _hover={{
            fill: "white",
          }}
        />
      </Box>
      <HStack>
        {numberOfPages.slice(currentIndex, currentLastIndex).map((idx) => {
          return (
            <Button
              key={idx}
              fontFamily="Inter"
              borderRadius="full"
              fontStyle="normal"
              fontWeight="semibold"
              width="2.5rem"
              fontSize="sm"
              onClick={() => {
                selectedPage(idx);
                // router.push("/home", {
                //   query: `page=${idx}&total=${currentData()?.length!}`,
                // });
              }}
              background={currentPage === idx ? "primary" : "gray100"}
              _hover={{ background: "primary" }}
            >
              {idx}
            </Button>
          );
        })}
      </HStack>
      <Box
        background="gray800"
        borderRadius="full"
        display="flex"
        width="2rem"
        height="2rem"
        justifyContent="center"
        alignItems="center"
        _hover={{
          cursor: "pointer",
          background: "primary",
        }}
      >
        <Icon
          onClick={handleNextPage}
          as={BiChevronRight}
          w={{ lg: 7, base: 10 }}
          h={{ lg: 7, base: 10 }}
          fill="#718096"
          _hover={{
            fill: "white",
          }}
        />
      </Box>
    </Flex>
  );
};

export default Pagination;
