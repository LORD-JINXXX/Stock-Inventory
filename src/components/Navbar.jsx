import React from 'react';
import { Container, Flex, Text, useColorMode } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        setIsAuthenticated(false);
    }
    return (
        <Container as={'nav'} m={'0px'}>
            <Flex justify={'space-between'} alignItems={'center'} w={'100vw'} h={'50px'} px={'50px'}>
                <Flex>
                    <Text textColor={'teal.400'} fontSize={'2xl'} fontWeight={'semibold'}>Stock Inventory</Text>
                </Flex>
                <Flex>
                    {
                        isAuthenticated && <Button w={'100px'} px={'10px'} py={'7px'} bg={'teal.400'} textColor={'white'} _hover={{ bg: 'white', textColor: 'teal.400', border: '2px', borderColor: 'teal.400' }} mx={'10px'} onClick={handleLogout}>
                            Logout
                        </Button>
                    }

                    <Button onClick={toggleColorMode} bg={'teal.500'}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Flex>
            </Flex>

        </Container>
    )
}

export default Navbar;