import {
  Box,
  Button,
  Flex,
  Heading,
  Grid,
  Text,
  Image,
  type BoxProps,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ReactElement, useEffect } from "react";
import Layout from "src/components/Layouts/Layout";
import useCards from "src/hooks/useCards";
import { motion } from "framer-motion";
import { HStack } from "@chakra-ui/react";
import { SiZcash } from "react-icons/si";
import useStore from "src/hooks/useStore";
// import pokemonCardBack from ;

const MotionBox = motion<BoxProps>(Box);

const EarnPoints = () => {
  const addPoints = useStore((state) => state.addPoints);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  const {
    shuffleCards,
    pokemonCards,
    moves,
    firstChoice,
    secondChoice,
    setPokemonCards,
    handleClick,
    resetSelection,
  } = useCards();

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice?.src === secondChoice?.src) {
        setPokemonCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              setMatchedCount(1);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => resetSelection(true), 1000);
        setEarnedPoints((prev) => prev + 1000);
        setMatchedCount((prev) => prev + 1);
      } else {
        console.log("do not matched");
        setTimeout(() => resetSelection(false), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (matchedCount === pokemonCards.length) {
      addPoints(earnedPoints);
    } else {
      console.log("there are still more to guess", matchedCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addPoints, earnedPoints, matchedCount, pokemonCards]);

  useEffect(() => {
    if (moves <= 0) {
      if (earnedPoints > 0) {
        addPoints(earnedPoints);
      }
    }
  }, [addPoints, earnedPoints, moves]);

  const isFlipped = (card: { id: number; src: string; matched: boolean }) => {
    let flipped = false;
    if (card === firstChoice) {
      flipped = true;
    } else if (card === secondChoice) {
      flipped = true;
    } else if (card.matched) {
      flipped = true;
    }
    return flipped;
  };

  return (
    <Box minH="100vh">
      <Flex
        mt={5}
        mb={10}
        flexDirection="column"
        align="center"
        gap={4}
        mx="auto"
        maxW="70%"
        justify="center"
      >
        <Heading color="text.light" fontFamily="Inter" fontWeight="bold">
          Pokemon Matching Game
        </Heading>
        <Button
          width="7rem"
          height="2rem"
          onClick={() => {
            shuffleCards();
            setEarnedPoints(0);
            setMatchedCount(0);
          }}
        >
          New Game
        </Button>

        <Box width="100%">
          <Flex align="left" justifyContent="space-around">
            <HStack>
              <Text fontFamily="Inter" color="text.light" fontWeight="semibold">
                Available Moves:
              </Text>
              <Text
                fontFamily="Inter"
                color="primary"
                fontWeight="bold"
                fontStyle="italic"
              >
                {moves}
              </Text>
            </HStack>
            <HStack>
              <Text fontFamily="Inter" color="text.light" fontWeight="semibold">
                Earned Points:
              </Text>
              <Text
                fontFamily="Inter"
                color="primary"
                fontWeight="bold"
                fontStyle="italic"
              >
                {earnedPoints}
              </Text>
              <Icon as={SiZcash} size={25} fill="primary" />
            </HStack>
          </Flex>
        </Box>

        <Grid templateColumns="repeat(4,1fr)" gap={4}>
          {pokemonCards &&
            pokemonCards.map((card) => (
              <MotionBox
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                borderRadius=".5rem"
                overflow="hidden"
                position="relative"
                width="11rem"
                height="14rem"
                _hover={{ cursor: "pointer" }}
                key={card.id}
              >
                <Box position="relative">
                  <Image
                    src={card.src}
                    position={"absolute"}
                    height="14rem"
                    transform={
                      isFlipped(card) ? "rotateY(0deg)" : "rotateY(90deg)"
                    }
                    transitionDelay={isFlipped(card) ? "0.1s" : "0.2s"}
                    transition={"all ease-in 0.2s"}
                    // transitionDuration=".1s"
                    alt={card.id.toString()}
                  />
                  <Image
                    display="block"
                    src={"/assets/cards/PokemonCardBack.png"}
                    position={"absolute"}
                    transform={
                      isFlipped(card) ? "rotateY(90deg)" : "rotateY(0deg)"
                    }
                    width="14rem"
                    transition={isFlipped(card) ? "none" : "all ease-in 0.2s"}
                    transitionDelay={isFlipped(card) ? "0s" : "0.2s"}
                    height="14.1rem"
                    onClick={() => handleClick(card)}
                    alt={card.id.toString()}
                  />
                </Box>
              </MotionBox>
            ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default EarnPoints;

EarnPoints.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
