import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AppState } from "../Context/ContextProvider";
import { axiosRequest } from "../lib/axiosReq";

const Addnew = ({ revalidate, setRevalidate }) => {
  const { user } = AppState();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("deposit");
  const toast = useToast();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (amount === "") {
      toast({
        title: "Error",
        status: "error",
        description: "Amount is required!",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axiosRequest.post(
        `${selectedOption}`,
        {
          amount,
        },
        config
      );
      toast({
        title: "Success",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRevalidate(!revalidate);
      setAmount("");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        description: error.response.data,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Select
        my={1}
        variant="outline"
        onChange={handleSelectChange}
        value={selectedOption}
        maxW={"100%"}
        borderColor={"#22c35e"}
        focusBorderColor="#22c35e"
      >
        <option
          value="deposit"
          style={{
            backgroundColor: "#22c35e",
            color: "white",
            padding: "4px",
            width: "100%",
          }}
        >
          Deposit
        </option>
        <option
          value="withdraw"
          style={{ backgroundColor: "#22c35e", color: "white", padding: "4px" }}
        >
          Withdraw
        </option>
      </Select>
      <FormControl isRequired>
        <FormLabel>Amount</FormLabel>
        <Input
          placeholder="Ex 100"
          type="text"
          borderColor={"#22c35e"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          focusBorderColor="#22c35e"
          _placeholder={{ color: "#22c35e" }}
        />
      </FormControl>
      <Stack justify={"center"} align={"center"}>
        <Button
          colorScheme="whatsapp"
          width="30%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Confirm
        </Button>
      </Stack>
    </>
  );
};

export default Addnew;
