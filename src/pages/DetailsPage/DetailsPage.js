import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/url";
import { goToHomePage, goToLoginPage } from "../../routes/coordinator";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Skeleton
} from "@chakra-ui/react";
import Header from "../../components/Header";

export default function DetailsPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("cookenu-token");

    if (!token) {
      goToLoginPage(navigate);
    } else {
      fetchRecipeDetails();
    }
  }, []);

  const fetchRecipeDetails = async () => {
    try {
      setIsLoading(true);

      const token = window.localStorage.getItem("cookenu-token");

      const config = {
        headers: {
          Authorization: token
        }
      };

      const response = await axios.get(
        BASE_URL + `/recipe/${params.recipeId}`,
        config
      );

      setDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error?.response?.data?.message); // só funciona porque a API devolve uma resposta nos erros
      window.alert("Erro ao buscar detalhes de uma receita! Veja o console");
    }
  };

  return (
    <>
      <Header />
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Skeleton w={"100%"} isLoaded={!isLoading}>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={details.imageUrl}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Skeleton>
          </Flex>
          <Skeleton isLoaded={!isLoading}>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {details.title}
                </Heading>

                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  enviada por {details.creatorName}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"lg"}>{details.description}</Text>
                </VStack>

                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Button
                    colorScheme="blue"
                    onClick={() => goToHomePage(navigate)}
                  >
                    Voltar
                  </Button>
                </VStack>
              </Stack>
            </Stack>
          </Skeleton>
        </SimpleGrid>
      </Container>
    </>
  );
}
