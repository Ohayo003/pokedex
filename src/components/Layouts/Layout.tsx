import { Box, Grid } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Header from "./Header";
import psmall from "public/assets/background/pokeball-small.png";
import pBig from "public/assets/background/pokeball-big.png";
import electric from "public/assets/elements/Electric.svg";
import fire from "public/assets/elements/fire.svg";
import metal from "public/assets/elements/metal.svg";
import grass from "public/assets/elements/grass.svg";
import steel from "public/assets/elements/steel.svg";
import rock from "public/assets/elements/rock.svg";
import water from "public/assets/elements/water.svg";
import poison from "public/assets/elements/poison.svg";
import fairy from "public/assets/elements/fairy.svg";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <Grid
      minW={{ base: "fit-content" }}
      // minW="200%"
      // minW="925px"
      minH="100vh"
      h="full"
      bg="background.container"
    >
      <Header />

      <Box position="relative" height="auto">
        <Box position="absolute" h="26.25rem" right={0} top={-16}>
          <Image src={pBig} alt="pokeball" />
        </Box>
        <Box position="absolute" left={0} bottom="40.62px">
          <Image src={psmall} alt="pokeball" />
        </Box>
        <Box position="absolute" w={14} h={14} left={0} bottom="273px ">
          <Image src={electric} alt="element" />
        </Box>
        <Box
          position="absolute"
          transform={`rotate(30deg)`}
          w={10}
          h={12}
          left="130px"
          bottom="327px"
        >
          <Image src={fire} alt="fire" />
        </Box>
        <Box position="absolute" w={9} h={8} left="155px" bottom="229px">
          <Image src={metal} alt="element" />
        </Box>
        <Box position="absolute" w={16} h={20} left="55px" bottom="44px">
          <Image src={grass} alt="element" />
        </Box>
        <Box position="absolute" w={9} h={10} left="240px" bottom="33.77px">
          <Image src={steel} alt="element" />
        </Box>
        <Box position="absolute" w={14} h={14} right="149px" bottom="57px  ">
          <Image src={water} alt="element" />
        </Box>
        <Box
          position="absolute"
          w={9}
          h={14}
          transform={`rotate(14.5deg)`}
          right="10px"
          bottom="120px"
        >
          <Image src={poison} alt="element" />
        </Box>
        <Box
          position="absolute"
          transform={`rotate(-27.98deg)`}
          w={9}
          h={14}
          right="103px"
          bottom="185.62px"
        >
          <Image src={fairy} alt="element" />
        </Box>
        <Box
          position="absolute"
          transform={`rotate(22.96deg)`}
          w={7}
          h={7}
          right="57px"
          bottom="354.62px"
        >
          <Image src={rock} alt="element" />
        </Box>
        {children}
      </Box>
    </Grid>
  );
};

export default Layout;
