import {
  Box,
  HStack,
  VStack,
  Text,
  Progress,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import "@fontsource/inter";
import { BiChevronDown } from "react-icons/bi";
import Card from "src/components/widgets/Card";
import SkillCard from "src/components/widgets/SkillCard";

const Statistics = () => {
  const basicStats = [
    {
      name: "HP",
      color: "red",
    },
    {
      name: "ATK",
      color: "text.amber",
    },
    {
      name: "DEF",
      color: "teal",
    },
    {
      name: "SPD",
      color: "purple",
    },
    {
      name: "EXP",
      color: "gray",
    },
  ];
  return (
    <Box>
      <Box
        height="13.25rem"
        display="flex"
        justifyContent="center"
        background="gray800"
        borderRadius="md"
        border="1px solid"
        borderColor="gray500"
      >
        <VStack justify="center">
          {basicStats.map((stat, idx) => {
            return (
              <HStack key={idx}>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="26px"
                  color="text.default"
                >
                  {stat.name}
                </Text>
                <Box pl={8} pr={4} width="38rem">
                  <Progress value={20} size="xs" colorScheme={stat.color} />
                </Box>
                <Text
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="26px"
                  color="text.default"
                >
                  20%
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </Box>

      <Card
        mt={12}
        position="relative"
        display="flex"
        justifyItems="center"
        justifyContent="center"
        alignItems="center"
      >
        <VStack align="left" p={6}>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="26px"
            color="text.blue400"
          >
            Weakness
          </Text>
          <Flex flexWrap="wrap" gap={4}>
            {Array(6)
              .fill(null)
              .map((item, idx) => {
                return (
                  <Box key={idx}>
                    <HStack gap={6}>
                      <SkillCard
                        name="Rock"
                        borderColor="#FECACA"
                        bg="#FEF2F2"
                        color="text.red700"
                      />
                      <HStack
                        fontFamily="Inter"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="26px"
                      >
                        <Text color="#EF4444">160%</Text>
                        <Text color="text.light">damage</Text>
                      </HStack>
                    </HStack>
                  </Box>
                );
              })}
          </Flex>
        </VStack>
      </Card>

      <Card
        mt={9}
        position="relative"
        display="flex"
        justifyItems="center"
        justifyContent="center"
        alignItems="center"
      >
        <VStack align="left" p={6}>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="26px"
            color="text.blue400"
          >
            Resistant
          </Text>
          <Flex flexWrap="wrap" gap={4} pt={6}>
            {Array(6)
              .fill(null)
              .map((item, idx) => {
                return (
                  <Box key={idx}>
                    <HStack gap={4}>
                      <SkillCard
                        name="Rock"
                        borderColor="#A7F3D0"
                        bg="#ECFDF5"
                        color="text.green700"
                      />
                      <HStack
                        fontFamily="Inter"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="26px"
                      >
                        <Text color="#047857">65%</Text>
                        <Text color="text.light">damage</Text>
                      </HStack>
                    </HStack>
                  </Box>
                );
              })}
          </Flex>
          <HStack justify="end">
            <Text color="primary">See more</Text>
            <Icon as={BiChevronDown} fill="primary" w={7} h={7} />
          </HStack>
        </VStack>
      </Card>
    </Box>
  );
};

export default Statistics;
