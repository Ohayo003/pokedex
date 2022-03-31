import { Button, Flex, HStack, Icon } from "@chakra-ui/react";
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
    if (currentLastIndex >= numberOfPages.length) {
      nextPage();
      setLoading(true);
    } else {
      nextPage();
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1 || currentIndex > 0) {
      previousPage();
      setLoading(true);
    }
  };

  return (
    <Flex justifyContent="center" mt={2} gap={6} align="center" zIndex={1}>
      <Icon
        onClick={handlePrevPage}
        as={BiChevronLeft}
        w={{ lg: 6, base: 10 }}
        h={{ lg: 6, base: 10 }}
        _hover={{
          cursor: "pointer",
          fill: "primary",
        }}
        fill="#718096"
      />
      <HStack>
        {numberOfPages.slice(currentIndex, currentLastIndex).map((idx) => {
          return (
            <Button
              key={idx}
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="500"
              onClick={() => {
                selectedPage(idx);
                // router.push("/home", {
                //   query: `page=${idx}&total=${currentData()?.length!}`,
                // });
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
        onClick={handleNextPage}
        as={BiChevronRight}
        w={{ lg: 6, base: 10 }}
        h={{ lg: 6, base: 10 }}
        fill="#718096"
        _hover={{
          cursor: "pointer",
          fill: "primary",
        }}
      />
    </Flex>
  );
};

export default Pagination;
