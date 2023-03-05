import React, { useEffect, useState } from "react";
import { AppState } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import Totals from "../components/Totals";
import Addnew from "../components/Addnew";
import { axiosRequest } from "../lib/axiosReq";

const Home = () => {
  const { user, setDeposits, setWithdraws, connected, setConnected, setUser } =
    AppState();
  const navigate = useNavigate();
  const [revalidate, setRevalidate] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  useEffect(() => {
    if (connected) {
      const fetchUserTransactionHistory = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data: deposits } = await axiosRequest.get("/deposit", config);
        const { data: withdraws } = await axiosRequest.get("/withdraw", config);
        setDeposits(deposits);
        setWithdraws(withdraws);
      };
      fetchUserTransactionHistory();
    }
  }, [connected, revalidate]);

  const handleLogout = () => {
    localStorage.removeItem("monitorUser");
    setConnected(!connected);
    setUser("");
    setDeposits("");
    setWithdraws("");
    toast({
      title: "Come back soon!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };
  return (
    <Container
      maxW="100%"
      minH={"100vh"}
      flex={1}
      color={"white"}
      pb={10}
      px={[2, 4]}
    >
      <Stack direction="row" justify="space-between" align="center" pt={2}>
        <Text fontSize={"32px"}>{user?.name}</Text>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"} p={[3, 10]}>
        <Totals />
      </Stack>
      <Accordion allowMultiple>
        <AccordionItem backgroundColor="green.700">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Add new
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Addnew revalidate={revalidate} setRevalidate={setRevalidate} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem backgroundColor="red.700" marginY="1">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Deposits
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Deposit revalidate={revalidate} setRevalidate={setRevalidate} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem backgroundColor="blue.900">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Withdraws
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Withdraw revalidate={revalidate} setRevalidate={setRevalidate} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default Home;
