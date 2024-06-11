import {
    Button,
    Flex,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import SalesModal from '../components/SalesModal';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useEffect } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';


const products = [
    {
        id: 209,
        name: "New Product",
        sku: [
            { id: 248, selling_price: 54 },
            { id: 247, selling_price: 32 },
            { id: 246, selling_price: 23 }
        ]
    }
    // Add more products as needed
];


const Home = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeTable, setActiveTable] = useState('activated');
    const [saleOrders, setSaleOrders] = useState([]);

    useEffect(() => {
        const storedOrders = localStorage.getItem('saleOrders');
        if (storedOrders) {
            setSaleOrders(JSON.parse(storedOrders));
        }
    }, []);

    const handleFormSubmit = (values) => {
        const newSaleOrder = {
            ...values,
            paid: false,
        };
        const updatedOrders = [...saleOrders, newSaleOrder];
        setSaleOrders(updatedOrders);
        localStorage.setItem('saleOrders', JSON.stringify(updatedOrders));
    };
    const calculateTotalPrice = (order) => {
        let totalPrice = 0;
        order.items.forEach(item => {
          totalPrice += item.price * item.quantity;
        });
        return totalPrice;
      };


    return (
        <Flex w={'100vw'} h={'100vh'} flexDirection={'column'}>
            <Flex w={'100vw'} h={'auto'} justify={'space-between'} align={'center'}>
                <Flex justify={'start'} align={'center'} mx={'100px'} my={'30px'}>

                    <Button bg={activeTable === 'activated' ? 'teal.500' : 'transparent'} border={activeTable !== 'activated' ? '2px' : 'none'} textColor={activeTable === 'activated' ? 'white' : 'teal.400'} mx={'10px'} px={'10px'} py={'7px'} w={'200px'} _hover={{ bg: 'gray.100', textColor: 'teal.400', border: '2px', borderColor: 'teal.400' }} onClick={() => setActiveTable('activated')}>Activate Sale Orders</Button>

                    <Button bg={activeTable === 'completed' ? 'teal.500' : 'transparent'} border={activeTable !== 'completed' ? '2px' : 'none'} textColor={activeTable === 'completed' ? 'white' : 'teal.400'} mx={'10px'} px={'10px'} py={'7px'} w={'200px'} _hover={{ bg: 'gray.100', textColor: 'teal.400', border: '2px', borderColor: 'teal.400' }} onClick={() => setActiveTable('completed')}>Completed Sale Orders</Button>
                </Flex>
                <Flex justify={'end'} align={'center'} mx={'100px'} my={'30px'}>
                    <Button bg={'teal.400'} textColor={'white'} mx={'10px'} px={'10px'} py={'7px'} w={'200px'} _hover={{ bg: 'none', textColor: 'teal.400', border: '2px', borderColor: 'teal.400' }} onClick={onOpen}>Sale Order</Button>

                    {
                        <SalesModal isOpen={isOpen} onClose={onClose} onSubmit={handleFormSubmit} products={products} />
                    }
                </Flex>
            </Flex>

            <Flex w={'100vw'} h={'auto'} >
                {
                    activeTable === 'activated' && <TableContainer w={'100%'} h={'500px'} border={'1px'} borderColor={'teal.400'} mx={'30px'} rounded={'md'} px={'10px'} py={'10px'}>
                        <Table variant='simple'>
                            <TableCaption>Details of Activated Sales Orders</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Customer Id</Th>
                                    <Th>Customer Name</Th>
                                    <Th>Price</Th>
                                    <Th>Last Modified</Th>
                                    <Th>Edit/View</Th>
                                </Tr>
                            </Thead>
                            {
                                saleOrders && saleOrders.filter(order => !order.paid).map((order, index) => {
                                    return <Tbody key={index}>
                                        <Tr>
                                            <Td>{order.customer_id}</Td>
                                            <Td>{order.customer_name}</Td>
                                            <Td>
                                                {
                                                    Object.keys(order.items).map((key) => {
                                                        return <Menu key={key}>
                                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mx={'3px'}>
                                                                {order.items[key].sku_id}
                                                            </MenuButton>
                                                            <MenuList>
                                                                <MenuItem>Price: {order.items[key].price}</MenuItem>
                                                                <MenuItem>Quantity: {order.items[key].quantity}</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    })
                                                }
                                            </Td>
                                            <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
                                            <Td>
                                                <Menu>
                                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                        <IoEllipsisHorizontal cursor={'pointer'} />
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem>Delete</MenuItem>
                                                        <MenuItem>Edit</MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                    </Tbody>

                                })
                            }

                        </Table>
                    </TableContainer>}

                {
                    activeTable === 'completed' && <TableContainer w={'100%'} h={'500px'} border={'1px'} borderColor={'teal.400'} mx={'30px'} rounded={'md'} px={'10px'} py={'10px'}>
                        <Table variant='simple'>
                            <TableCaption>Details of Completed Sales Orders</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Customer Id</Th>
                                    <Th>Customer Name</Th>
                                    <Th>Total Price</Th>
                                    <Th>Payment Status</Th>
                                </Tr>
                            </Thead>
                            {
                                saleOrders && saleOrders.filter(order => order.paid).map((order, index) => {
                                    return <Tbody key={index}>
                                        <Tr>
                                            <Td>{order.customer_id}</Td>
                                            <Td>{order.customer_name}</Td>
                                            <Td>
                                                {calculateTotalPrice(order)}
                                            </Td>
                                            <Td>Yes</Td>
                                        </Tr>
                                    </Tbody>

                                })
                            }
                        </Table>
                    </TableContainer>}


            </Flex>
        </Flex>
    )
}

export default Home;