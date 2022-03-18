import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
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
import { BsFillPersonFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import "@fontsource/inter";

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
                  rightIcon={
                    <Icon
                      color="light"
                      alignSelf="center"
                      ml={4}
                      as={FaChevronDown}
                    />
                  }
                >
                  <Avatar
                    w="3.5rem"
                    h="3.5rem"
                    src="https://avatars.dicebear.com/api/male/username.svg"
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    <Avatar
                      w="5rem"
                      h="5rem"
                      src="https://avatars.dicebear.com/api/male/username.svg"
                    />
                  </Center>
                  <Center mt={2}>
                    <Text fontWeight="600" fontFamily="Inter">
                      username
                    </Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem
                    fontWeight="600"
                    fontFamily="Inter"
                    icon={<BsFillPersonFill size={25} />}
                  >
                    Profile
                  </MenuItem>
                  <Divider height="inherit" orientation="horizontal" />
                  <MenuItem
                    fontWeight="600"
                    fontFamily="Inter"
                    icon={<IoLogOut size={25} />}
                  >
                    Logout
                  </MenuItem>
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
