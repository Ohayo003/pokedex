import { Box, HeadingProps } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

const Card = ({ children, ...props }: PropsWithChildren<HeadingProps>) => {
  return (
    <Box
      background="background.gray800"
      border="1px solid"
      borderColor="gray500"
      borderRadius="md"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
