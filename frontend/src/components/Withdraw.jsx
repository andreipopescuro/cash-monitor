import {
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
import React from "react";
import { AppState } from "../Context/ContextProvider";
import { axiosRequest } from "../lib/axiosReq";

const Withdraw = ({ revalidate, setRevalidate }) => {
  const { user } = AppState();
  const toast = useToast();
  const handleDelete = async (wdId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          wdId,
        },
      };

      await axiosRequest.delete("/withdraw", config);
      setRevalidate(!revalidate);

      toast({
        title: "The withdraw was successfully deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
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
    withdraws: { totalWithdraw, withdraws },
  } = AppState();
  return (
    <TableContainer>
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th color="white">Date</Th>
            <Th color="white">Amount</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {withdraws?.map((withdraw) => (
            <Tr key={withdraw._id}>
              <Td color={"gray.400"}>
                {withdraw &&
                  new Date(withdraw.createdAt).toLocaleString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </Td>
              <Td>{withdraw.amount} LEI</Td>
              <Td textAlign={"right"}>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(withdraw._id)}
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
              Total {totalWithdraw} LEI
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Withdraw;
