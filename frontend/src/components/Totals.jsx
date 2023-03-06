import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AppState } from "../Context/ContextProvider";

const Totals = () => {
  const {
    withdraws: { totalWithdraw, withdraws },
  } = AppState();
  const {
    deposits: { totalDeposit, deposits },
  } = AppState();
  const calculateProfit = (dep, wd) => {
    return wd - dep;
  };
  return (
    <>
      <Stack bg={"blue.900"} p={[1, 2, 5]} flex={1} borderRadius={4}>
        <Text align={"center"} color={"gray.400"}>
          Deposits ({deposits?.length})
        </Text>
        <Text align={"center"}>{totalDeposit} LEI</Text>
      </Stack>
      <Stack bg={"blue.900"} p={[1, 2, 5]} flex={1} borderRadius={4}>
        <Text align={"center"} color={"gray.400"}>
          Withdraws ({withdraws?.length})
        </Text>
        <Text align={"center"}>{totalWithdraw} LEI</Text>
      </Stack>
      <Stack
        bg={"blue.900"}
        p={[1, 2, 5]}
        flex={1}
        justify={"center"}
        borderRadius={4}
      >
        <Text align={"center"} color={"gray.400"}>
          Funds
        </Text>
        {totalDeposit ? (
          <Text align={"center"}>
            {calculateProfit(totalDeposit, totalWithdraw)} LEI
          </Text>
        ) : (
          0
        )}
      </Stack>
    </>
  );
};

export default Totals;
