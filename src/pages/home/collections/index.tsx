import {
  Box,
  Flex,
  type BoxProps,
  Grid,
  Text,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import useStore from "src/hooks/useStore";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "src/components/widgets/Card";
import { FaQuestion, FaTrash } from "react-icons/fa";
import "@fontsource/inter";

const MotionBox = motion<BoxProps>(Box);

const Collection = () => {
  const pokemonCollections = useStore((state) => state.collections);
  const remove = useStore((state) => state.removeCollection);
  const [isHovering, setIsHovering] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(0);

  return (
    <Box minH="100vh">
      <Flex
        mx="auto"
        mt={10}
        maxW="70%"
        justify="center"
        gap={5}
        flexDirection="column"
        alignItems="center"
      >
        <Box width="full" color="text.light">
          <Heading fontFamily="Inter" letterSpacing="wider">
            Pokemon Collections
          </Heading>
        </Box>
        {pokemonCollections.length ? (
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            {pokemonCollections.map((item, idx) => (
              <MotionBox whileHover={{ scale: 1.1 }} key={idx}>
                <Card
                  width="12rem"
                  _hover={{ cursor: "pointer" }}
                  onMouseOver={() => {
                    setIsHovering(true);
                    setCurrentSelected(item.id);
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setCurrentSelected(0);
                  }}
                  borderColor="gray500"
                  height="15rem"
                  display="flex"
                  background="gray800"
                  justifyContent="center"
                  position="relative"
                  alignItems="center"
                >
                  <Image layout="fill" src={item.image} alt="image" />
                  {isHovering && currentSelected === item.id ? (
                    <>
                      <MotionBox
                        top="5"
                        right="3"
                        position="absolute"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon
                          onClick={() => remove(item.id)}
                          as={FaTrash}
                          w={6}
                          h={6}
                          fill="red.300"
                          zIndex={1}
                        />
                      </MotionBox>

                      <Heading
                        position="absolute"
                        bottom="2"
                        fontSize={item.name.length > 9 ? "2xl" : "4xl"}
                        color="text.light"
                      >
                        {item.name}
                      </Heading>
                    </>
                  ) : null}
                </Card>
              </MotionBox>
            ))}
          </Grid>
        ) : (
          <Card
            width="12rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="15rem"
          >
            <Stack align="center">
              <Icon as={FaQuestion} w={20} h={20} fill="gray500" />
              <Text fontSize="sm" color="gray500">
                You do not have collections
              </Text>
            </Stack>
          </Card>
        )}
      </Flex>
    </Box>
  );
};

export default Collection;

Collection.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
