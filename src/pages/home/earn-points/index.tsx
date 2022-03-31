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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ReactElement, useEffect } from "react";
import Layout from "src/components/Layouts/Layout";
import useCards from "src/hooks/useCards";
import { motion } from "framer-motion";
import { HStack } from "@chakra-ui/react";
import { SiZcash } from "react-icons/si";
import useStore from "src/hooks/useStore";
import Loading from "src/components/widgets/Loading";

const MotionBox = motion<BoxProps>(Box);

const EarnPoints = () => {
  const udpatePoints = useStore((state) => state.updatePoints);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const numberFormat = new Intl.NumberFormat("en-US");
  const [loadingCard, setLoadingCards] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const toast = useToast();

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

  ///checks if first and second choice already have data
  ///then check if they are equal, if eqaul updates the pokemonCards matched property
  ///to true then reset again the selection
  ///otherwise just reset the selection and decrease moves
  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice?.src === secondChoice?.src) {
        setPokemonCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setEarnedPoints((prev) => prev + 1000);
        setMatchedCount((prev) => prev + 1);
        setTimeout(() => resetSelection(true), 1000);
      } else {
        console.log("do not matched");
        setTimeout(() => resetSelection(false), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstChoice, secondChoice]);

  ///check if the matched count is equal to the total length
  ///of the cards and then updates the user points
  useEffect(() => {
    if (isStarted && matchedCount >= pokemonCards.length / 2) {
      setIsWin(true);
    }
  }, [isStarted, matchedCount, pokemonCards.length, setIsWin]);

  useEffect(() => {
    if (isWin) {
      udpatePoints(earnedPoints, "increment");
      toast({
        title: "Congratulations!",
        position: "top",
        description: `You have guessed all cards. You win ${earnedPoints} Points`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => setIsWin(false), 1000);
      setIsStarted(false);
    }
  }, [earnedPoints, isWin, toast, udpatePoints]);

  ///checks if the moves <= to 0 and then updates the points based on
  ///what the user earned after consumi ng the moves
  useEffect(() => {
    if (moves <= 0) {
      if (earnedPoints > 0) {
        udpatePoints(earnedPoints, "increment");
      }
      toast({
        title: "Game Over",
        description: `You already consumed your moves. You only have earned ${earnedPoints} Points`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [udpatePoints, earnedPoints, moves]);

  ///swaps back card to front card if they matches the condition
  ///but if the cards are matched they will remains open or show the images of matched cards
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

  ///sets back the loading the false after 1 sec
  useEffect(() => {
    if (loadingCard) {
      setTimeout(() => setLoadingCards(false), 1000);
    }
  }, [loadingCard]);

  return (
    <Box minH="100vh">
      <Flex
        mt={5}
        mb={10}
        flexDirection="column"
        align="center"
        gap={4}
        mx={{ lg: "auto", base: "20px" }}
        maxW={{ lg: "70%", base: "100%" }}
        justify="center"
      >
        <Heading color="text.light" fontFamily="Inter" fontWeight="bold">
          Pokemon Matching Game
        </Heading>
        <Button
          width="7rem"
          borderColor="primary"
          _hover={{
            cursor: "pointer",
            background: "primary",
            color: "white",
            borderColor: "primary",
          }}
          border="1px"
          background="transparent"
          height="2rem"
          fontWeight="bold"
          color="primary"
          onClick={() => {
            shuffleCards();
            setEarnedPoints(0);
            setMatchedCount(0);
            setIsStarted(true);
            setLoadingCards(true);
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
                {numberFormat.format(earnedPoints)}
              </Text>
              <Icon as={SiZcash} size={25} fill="primary" />
            </HStack>
          </Flex>
        </Box>
        {loadingCard ? (
          <Loading loadingText="Loading Cards..." />
        ) : (
          <Grid
            templateColumns={{ lg: "repeat(4,1fr)", base: "repeat(3,1fr)" }}
            gap={4}
          >
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
        )}
      </Flex>
    </Box>
  );
};

export default EarnPoints;

EarnPoints.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
