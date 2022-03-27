import { Box } from "@chakra-ui/react";
import React from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";

const Collection = () => {
  return <Box minH="100vh">Collection</Box>;
};

export default Collection;

Collection.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
