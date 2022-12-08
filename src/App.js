import Router from "./routes/Router"
import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import { GlobalStyle } from './GlobalStyle.styled'

function App() {
  return (
    <ChakraProvider>
      <GlobalStyle />
    <Router/>
  </ChakraProvider>
      
   
  );
}

export default App;


