import { Box } from "@chakra-ui/react";
import React from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";

const EarnPoints = () => {
  return <Box minH="100vh">EarnPoints</Box>;
};

export default EarnPoints;

EarnPoints.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
