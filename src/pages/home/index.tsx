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
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import "@fontsource/inter";
import { HiViewList, HiOutlineFilter } from "react-icons/hi";
import { BsGridFill } from "react-icons/bs";
import PokemonList from "src/components/widgets/Pokemon/PokemonList";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import PokemonGrid from "src/components/widgets/Pokemon/PokemonGrid";
import useStore from "src/hooks/useStore";

const HomePage = () => {
  const listView = useStore((state) => state.listView);
  const toggleView = useStore((state) => state.toggleView);
  return (
    <Box minH="100vh" w={{ base: "full" }} mt={9} mb={14}>
      <Flex flexDirection="column" mx="auto" maxW="65%">
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
          {listView ? <PokemonList /> : <PokemonGrid />}
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
            Showing 1-10 of 20
          </Text>
        </HStack>

        {/** Pagination Section */}
        <Flex justifyContent="center" gap={6} align="center">
          <Icon as={BiChevronLeft} w={6} h={6} fill="#718096" />
          <HStack>
            <Button
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="lg"
              background="primary"
            >
              1
            </Button>
            <Button
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="lg"
              background="primary"
            >
              2
            </Button>
          </HStack>
          <Icon as={BiChevronRight} w={6} h={6} fill="#718096" />
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
