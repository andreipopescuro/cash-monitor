import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AppState } from "../Context/ContextProvider";
import { axiosRequest } from "../lib/axiosReq";

const Deposit = ({ revalidate, setRevalidate }) => {
  const { user } = AppState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (depId) => {
    console.log("heloooo");
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          depId,
        },
      };
      await axiosRequest.delete("/deposit", config);
      setRevalidate(!revalidate);
      setLoading(false);
      toast({
        title: "The deposit was successfully deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        status: "error",
        description: error.response.data,
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const {
    deposits: { totalDeposit, deposits },
  } = AppState();
  return (
    <TableContainer>
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Amount</Th>
            <Th color="white"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {deposits?.map((dep) => (
            <Tr key={dep._id}>
              <Td color={"gray.400"}>
                {dep &&
                  new Date(dep.createdAt).toLocaleString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </Td>
              <Td>{dep.amount} LEI</Td>
              <Td textAlign={"right"}>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(dep._id)}
                  isDisabled={loading}
                >
                  remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th textAlign={"right"} color="white">
              Total {totalDeposit} LEI
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Deposit;
