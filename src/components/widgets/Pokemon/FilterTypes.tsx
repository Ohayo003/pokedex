import { useQuery } from "@apollo/client";
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
} from "@chakra-ui/react";
import { HiOutlineFilter } from "react-icons/hi";
import { GET_POKEMON_TYPES } from "src/graphql/queries/pokemon/pokemonlist";
import useStore from "src/hooks/useStore";
import { GetPokemonTypes } from "src/types/GetPokemonTypes";
import { elementIcons } from "src/utils/elementIcons";

const FilterType = () => {
  const types = useStore((state) => state.filterTypes);
  const setTypes = useStore((state) => state.setFilterTypes);
  const removeFilterType = useStore((state) => state.removeFilterTpyes);
  let filters: GetPokemonTypes["types"] = [];

  ///Fetch all the types
  const { data: typeData } = useQuery<GetPokemonTypes>(GET_POKEMON_TYPES, {
    context: { clientName: "pokedexapi" },
  });

  if (typeData?.types) {
    filters = [...typeData.types];
  }

  ///handles adding the selected filter types in the array of types
  ///That will be used in the fetching of pokemon by Types
  const handleAddFilter = (type: string) => {
    const findType = types.find((item) => item === type);
    if (!findType) {
      setTypes(type);
    }
  };

  return (
    <Menu closeOnSelect={false} placement="bottom-start" gutter={10}>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Icon
          as={HiOutlineFilter}
          fill="white"
          w={{ lg: 5, base: 10 }}
          h={{ lg: 5, base: 10 }}
        />
      </MenuButton>
      <MenuList
        background="background.container"
        overflow="hidden"
        overflowY="auto"
        _focus={{ borderColor: "transparent" }}
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
            borderRadius: "12px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray700",
          },
        }}
        color="text.light"
        height={{ lg: "14.375rem" }}
        ml={{ lg: -24 }}
        mr={{ base: -36, lg: 0 }}
        width={{ lg: 44, base: "25rem" }}
        zIndex={2}
      >
        <CheckboxGroup
          defaultValue={
            types &&
            types.map((item) => {
              return item;
            })
          }
        >
          {filters &&
            filters
              .filter((obj) => {
                return obj.name !== "unknown";
              })
              .sort((a, b) => {
                return a.name > b.name ? 1 : -1;
              })
              .map((type, idx) => {
                return (
                  <MenuItem
                    _focus={{ background: "gray800" }}
                    _hover={{ color: "gray500", background: "gray800" }}
                    key={idx}
                  >
                    <Flex minW="full" justifyContent="space-between">
                      <Text
                        fontFamily="Inter"
                        fontStyle="normal"
                        fontWeight="400"
                        fontSize={{ lg: "sm", base: "xl" }}
                        lineHeight="xl"
                      >
                        {type.name.toUpperCase()}
                      </Text>
                      <Checkbox
                        iconColor="primaryDark"
                        borderRadius="lg"
                        value={type.name}
                        onChange={(value) => {
                          if (value.target.checked) {
                            handleAddFilter(value.target.value);
                          } else {
                            removeFilterType(value.target.value);
                          }
                        }}
                        size="lg"
                        colorScheme="background.amber"
                      />
                    </Flex>
                  </MenuItem>
                );
              })}
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
};

export default FilterType;
