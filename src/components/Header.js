import React from 'react'
import { Flex, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { goToLoginPage } from '../routes/coordinator'

const Header = () => {
    const navigate = useNavigate()

    const logout = () => {
        window.localStorage.removeItem("cookenu-token")
        goToLoginPage(navigate)
    }

    return (
        <Flex
            h={20}
            bg="blue.100"
            justifyContent="end"
            alignItems="center"
            paddingLeft={8}
            paddingRight={8}
        >
            <Button onClick={logout} colorScheme="red">Deslogar</Button>
        </Flex>
    )
}

export default Header