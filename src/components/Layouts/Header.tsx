import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import "@fontsource/inter";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  return (
    <Box h="7.25rem" background="background.gray500">
      <Flex justifyContent="space-between" ml={16} mr={32}>
        <Heading
          pt={8}
          pb={8}
          color="text.header"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          fontSize="40px"
          lineHeight="52px"
        >
          Pokedex
        </Heading>
        <HStack>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            fontSize="16px"
            lineHeight="19px"
            color="text.default"
            mr={5}
          >
            Welcome, [Username]
          </Text>
          <Flex
            alignItems={"center"}
            //  mr={32}
            pt={7}
            pb={7}
          >
            <Stack direction={"row"} spacing={7} zIndex={2}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Box display="flex" justifyContent="center">
                    <Avatar
                      w="3.5rem"
                      h="3.5rem"
                      src="https://avatars.dicebear.com/api/male/username.svg"
                    />
                    <Icon
                      color="light"
                      alignSelf="center"
                      ml={4}
                      as={FaChevronDown}
                    />
                  </Box>
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    <p>username</p>
                  </Center>
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
