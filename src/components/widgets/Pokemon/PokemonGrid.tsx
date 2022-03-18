import { Box, Flex, Grid } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import _1 from "public/assets/background/login-image.png";

const PokemonGrid = () => {
  return (
    <Box zIndex={1}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr) ",
          md: "repeat(2,1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        {Array(8)
          .fill(null)
          .map((item, idx) => {
            return (
              <Box
                key={idx}
                height="16rem"
                borderRadius="2xl"
                boxShadow="0px 4px 4px 0px gray"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={_1}
                  alt="pikatchu"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
            );
          })}
      </Grid>
    </Box>
  );
};

export default PokemonGrid;
