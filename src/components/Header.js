import { Box, Flex, Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../routes/coordinator";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("cookenu-token");
    goToLoginPage(navigate);
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"end"}>
          <Button
            variant={"solid"}
            colorScheme={"red"}
            size={"sm"}
            mr={4}
            onClick={logout}
          >
            Deslogar
          </Button>
        </Flex>
      </Box>
    </>
  );
}