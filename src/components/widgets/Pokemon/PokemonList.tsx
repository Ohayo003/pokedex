import { Avatar, Box, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const PokemonList = () => {
  return (
    <Box zIndex={1}>
      <Table color="light" background="#374151">
        <Thead>
          <Tr
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="lg"
            height={10}
          >
            <Td>#</Td>
            <Td></Td>
            <Td>Pokemon</Td>
            <Td>Type</Td>
            <Td>Level</Td>
          </Tr>
        </Thead>
        <Tbody
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="lg"
        >
          {Array(10)
            .fill(null)
            .map((item, idx) => {
              return (
                <Tr key={idx}>
                  <Td w={12}>{idx + 1}</Td>
                  <Td w={20} h={14}>
                    <Avatar w={8} h={8}></Avatar>
                  </Td>
                  <Td>Flareon</Td>
                  <Td>Fire</Td>
                  <Td>lvl 3</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PokemonList;
