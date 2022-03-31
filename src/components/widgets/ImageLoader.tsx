import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const ImageLoader = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      transform="translate(-50%, -50%)"
      left="50%"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner fill="red" w={10} h={10} thickness="5px" />
    </Box>
  );
};

export default ImageLoader;
