import { Box, VStack, Text, HStack, Divider } from "@chakra-ui/react";
import React from "react";
import "@fontsource/inter";
import Card from "../../Card";

const About = () => {
  return (
    <Box>
      <Text
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        fontSize="16px"
        lineHeight="26px"
        color="text.default"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin
        mauris tempus consectetur arcu maecenas id mauris pretium. Integer
        laoreet morbi cursus consectetur. Ipsum turpis id quisque morbi est in
        id nibh sagittis. Ipsum ornare quam vitae praesent.
      </Text>
      <Box pt={8}>
        <Card
          width="16.375rem"
          height="6.75rem"
          display="flex"
          justifyContent="center"
        >
          <HStack align="center" gap={7}>
            <VStack align="left">
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="26px"
                color="text.blue400"
              >
                Weight
              </Text>
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="26px"
                color="text.light"
              >
                220.0 KG
              </Text>
            </VStack>
            <Divider orientation="vertical" borderColor="gray700" height={12} />
            <VStack align="left">
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="26px"
                color="text.blue400"
              >
                Height
              </Text>
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="26px"
                color="text.light"
              >
                220.0 KG
              </Text>
            </VStack>
          </HStack>
        </Card>
        <Box pt={8}>
          <Card
            width="36.5rem"
            height="7rem"
            border="1px solid #718096"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <VStack align="left">
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="26px"
                color="text.blue400"
              >
                Height
              </Text>
              <HStack gap={9}>
                <HStack gap={2}>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="26px"
                    color="text.gray400"
                  >
                    Gender:
                  </Text>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="26px"
                    color="text.light"
                  >
                    87.8% Male
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="26px"
                    color="text.gray400"
                  >
                    Egg Group:
                  </Text>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="26px"
                    color="text.light"
                  >
                    Monster
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="26px"
                    color="text.gray400"
                  >
                    Egg Cycle:
                  </Text>
                  <Text
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="26px"
                    color="text.light"
                  >
                    Grass
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
