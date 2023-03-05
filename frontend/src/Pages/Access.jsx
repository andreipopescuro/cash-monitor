import React, { useEffect } from "react";
import { AppState } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authenticaion/Login";
import Register from "../components/Authenticaion/Register";

const Access = () => {
  const { user, connected, setConnected } = AppState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setConnected(true);
      navigate("/");
    }
  }, [user]);
  return (
    <Container maxW="xl" centerContent height={"100vh"}>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
          Investment Monitor
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Access;
