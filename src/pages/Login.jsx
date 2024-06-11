import { Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAuthenticated } = useAuth();

    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            setIsAuthenticated(true);
          };
          navigate('/home');  
        
        setUsername("");
        setPassword("");
    }

  return (
        <Flex w={'100vw'} h={'100vh'} justify={'center'} align={'center'}>
            <Container as={'div'} maxW={{base:"300px",sm:"400px", md: "400px", lg: '500px'}} maxH={'500px'} boxShadow={'lg'} rounded={'md'} border={'1px'} borderColor={'teal.200'}>
                <FormControl display={'flex'} justifyContent={'center'} alignItems={'center'} my={'30px'}>
                    <Text textColor={'teal.400'} fontSize={'2xl'} fontWeight={'semibold'}>Log In</Text>
                </FormControl>
                <FormControl my={'30px'}>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' name='username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    <FormHelperText>Enter your email id as username</FormHelperText>
                </FormControl>

                <FormControl my={'30px'}>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <FormHelperText>Enter your password</FormHelperText>
                </FormControl>

                <FormControl display={'flex'} justifyContent={'center'} alignItems={'center'} my={'30px'}>
                    <Button type='submit' bg={'teal.400'} w={'full'} textColor={'white'} onClick={handleSubmit}>Submit</Button>
                </FormControl>
            </Container>
        </Flex>
  )
}

export default Login;