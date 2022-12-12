import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GlobalStyle } from "./GlobalStyle.styled";
import { GlobalContext } from "./contexts/GlobalContext";
import Router from "./routes/Router";
import axios from "axios";
import { BASE_URL } from "./constants/url";

export default function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("cookenu-token");

    if (token) {
      fetchRecipes();
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      const token = window.localStorage.getItem("cookenu-token");

      const config = {
        headers: {
          Authorization: token
        }
      };

      const response = await axios.get(BASE_URL + "/recipe/all", config);

      setRecipes(response.data);
    } catch (error) {
      console.error(error?.response?.data?.message); // só funciona porque a API devolve uma resposta nos erros
      window.alert("Erro ao buscar receitas! Veja o console");
    }
  };

  const context = {
    recipes,
    fetchRecipes
  };

  return (
    <>
      <GlobalStyle />
      <ChakraProvider>
        <GlobalContext.Provider value={context}>
          <Router />
        </GlobalContext.Provider>
      </ChakraProvider>
    </>
  );
}



