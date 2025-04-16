import React from 'react';
import {
//   Tabs,
//   TabList,
//   TabPanels,
//   TabPanel,
//   Tab, 
  Box,
  Container,
  Text,
} from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        bg="black"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        opacity={0.7}
      >
        <Text fontSize="4xl" color="gray" fontFamily="Work sans">
          Chatly
        </Text>
      </Box>

      <Box
        // bg="black"
        // w="100%"
        // p={4}
        // borderRadius="lg"
        // borderWidth="1px"
        // opacity={0.7}
      >
        {/* <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs> */}
      </Box>
    </Container>
  );
};

export default Homepage;