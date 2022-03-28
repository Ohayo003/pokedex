import { Button, Flex, HStack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface IPagination {
  previousPage: () => void;
  nextPage: () => void;
  currentIndex: number;
  selectedPage: (idx: number) => void;
  currentLastIndex: number;
  numberOfPages: number[];
  currentPage: number;
  currentData: () => any[];
}

const Pagination = ({
  previousPage,
  nextPage,
  numberOfPages,
  currentIndex,
  currentLastIndex,
  selectedPage,
  currentData,
  currentPage,
}: IPagination) => {
  const router = useRouter();
  return (
    <Flex justifyContent="center" mt={2} gap={6} align="center" zIndex={1}>
      <Icon
        onClick={previousPage}
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
        onClick={nextPage}
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
