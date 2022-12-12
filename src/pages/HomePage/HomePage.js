import {
  Heading,
  SimpleGrid,
  Stack,
  Button,
  Flex,
  Grid
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import RecipeCard from "../../components/RecipeCard";
import { GlobalContext } from "../../contexts/GlobalContext";
import { goToCreateRecipePage, goToLoginPage } from "../../routes/coordinator";

export default function HomePage() {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  const { recipes, fetchRecipes } = context;

  useEffect(() => {
    const token = window.localStorage.getItem("cookenu-token");

    if (!token) {
      goToLoginPage(navigate);
    } else {
      fetchRecipes();
    }
  }, []);

  console.log(recipes);

  return (
    <>
      <Header />
      <Stack py={{ base: 18, md: 24 }}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading>Receitas Cookenu</Heading>
          <Button
            colorScheme="blue"
            onClick={() => goToCreateRecipePage(navigate)}
          >
            Criar nova receita
          </Button>
        </Flex>

        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {recipes.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </Grid>
      </Stack>
    </>
  );
}