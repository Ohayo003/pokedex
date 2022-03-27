import { Box } from "@chakra-ui/react";
import React from "react";
import { ReactElement } from "react";
import Layout from "src/components/Layouts/Layout";
import useStore from "src/hooks/useStore";

const Collection = () => {
  const collections = useStore((state) => state.collections);

  return (
    <Box minH="100vh">
      {collections &&
        collections.map((item, idx) => {
          return (
            <Box key={idx} color="text.light">
              {item.id}
            </Box>
          );
        })}
    </Box>
  );
};

export default Collection;

Collection.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
