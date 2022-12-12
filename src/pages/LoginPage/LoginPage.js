import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Spinner
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { BASE_URL } from "../../constants/url";
  import { goToHomePage, goToSignupPage } from "../../routes/coordinator";
  
  export default function LoginPage() {
    const navigate = useNavigate();
  
    const [isLoading, setIsLoading] = useState(false);
  
    const [form, setForm] = useState({
      email: "",
      password: ""
    });
  
    const changeForm = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
  
    const login = async () => {
      try {
        setIsLoading(true);
  
        const body = {
          email: form.email,
          password: form.password
        };
  
        const response = await axios.post(BASE_URL + "/user/login", body);
        window.localStorage.setItem("cookenu-token", response.data.token);
  
        setIsLoading(false);
        goToHomePage(navigate);
      } catch (error) {
        setIsLoading(false);
        console.error(error?.response?.data?.message); // só funciona porque a API devolve uma resposta nos erros
        window.alert("Erro ao fazer login! Veja o console");
      }
    };
  
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Entre em sua conta</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              para aproveitar as melhores receitas ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  autoComplete="off"
                  name="email"
                  onChange={changeForm}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input type="password" name="password" onChange={changeForm} />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={login}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500"
                  }}
                >
                  {isLoading ? <Spinner /> : "Entrar"}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Ainda não tem conta?{" "}
                  <Link
                    onClick={() => goToSignupPage(navigate)}
                    color={"blue.400"}
                  >
                    Cadastrar
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }