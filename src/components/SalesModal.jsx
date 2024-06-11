import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    Select,
} from '@chakra-ui/react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const validationSchema = yup.object({
    customer_id: yup.number().required('Customer ID is required'),
    customer_name: yup.string().required('Customer name is required'),
    invoice_no: yup.string().required('Invoice number is required'),
    invoice_date: yup.date().required('Invoice date is required'),
    items: yup.array().of(
        yup.object({
            sku_id: yup.number().required('SKU ID is required'),
            price: yup.number().required('Price is required').positive('Price must be positive'),
            quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
        })
    ).min(1, 'At least one item is required')
});

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

const SalesModal = ({ isOpen, onClose, onSubmit, products }) => {

    const formik = useFormik({
        initialValues: {
            customer_id: '',
            customer_name: '',
            invoice_no: '',
            invoice_date: getCurrentDate(),
            items: [
                { sku_id: '', price: '', quantity: 1 }
            ],
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
        },
    });

    const handleSKUChange = (index, event) => {
        const skuId = event.target.value;
        const selectedProduct = products.flatMap(product => product.sku).find(sku => sku.id === parseInt(skuId, 10));

        if (selectedProduct) {
            formik.setFieldValue(`items[${index}].sku_id`, skuId);
            formik.setFieldValue(`items[${index}].price`, selectedProduct.selling_price);
            formik.setFieldValue(`items[${index}].quantity`, 1);
        }
    };


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sale Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl isInvalid={formik.errors.customer_id && formik.touched.customer_id} my={'15px'}>
                                <FormLabel>Customer ID</FormLabel>
                                <Input
                                    id="customer_id"
                                    name="customer_id"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.customer_id}
                                />
                            </FormControl>

                            <FormControl isInvalid={formik.errors.customer_name && formik.touched.customer_name} my={'15px'}>
                                <FormLabel>Customer Name</FormLabel>
                                <Input
                                    id="customer_name"
                                    name="customer_name"
                                    type="string"
                                    onChange={formik.handleChange}
                                    value={formik.values.customer_name}
                                />
                            </FormControl>

                            <FormControl isInvalid={formik.errors.invoice_no && formik.touched.invoice_no} my={'15px'}>
                                <FormLabel>Invoice Number</FormLabel>
                                <Input
                                    id="invoice_no"
                                    name="invoice_no"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.invoice_no}
                                />
                            </FormControl>

                            <FormControl isInvalid={formik.errors.invoice_date && formik.touched.invoice_date} my={'15px'}>
                                <FormLabel>Invoice Date</FormLabel>
                                <DatePicker
                                    selected={formik.values.invoice_date}
                                    onChange={(date) => formik.setFieldValue('invoice_date', date)}
                                />
                            </FormControl>
                            {formik.values.items.map((item, index) => (
                                <Box key={index} borderWidth={1} p={4} mb={4} borderRadius="md">
                                    <FormControl isInvalid={formik.errors.items && formik.errors.items[index] && formik.errors.items[index].sku_id && formik.touched.items && formik.touched.items[index] && formik.touched.items[index].sku_id}>
                                        <FormLabel>SKU</FormLabel>
                                        <Select
                                            id={`items[${index}].sku_id`}
                                            name={`items[${index}].sku_id`}
                                            onChange={(event) => handleSKUChange(index, event)}
                                            value={formik.values.items[index].sku_id}
                                        >
                                            <option value="">Select SKU</option>
                                            {products.map(product =>
                                                product.sku.map(sku => (
                                                    <option key={sku.id} value={sku.id}>
                                                        {product.name} - {sku.selling_price}
                                                    </option>
                                                ))
                                            )}
                                        </Select>
                                    </FormControl>

                                    <FormControl isInvalid={formik.errors.items && formik.errors.items[index] && formik.errors.items[index].price && formik.touched.items && formik.touched.items[index] && formik.touched.items[index].price}>
                                        <FormLabel>Price</FormLabel>
                                        <Input
                                            id={`items[${index}].price`}
                                            name={`items[${index}].price`}
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.items[index].price}
                                            readOnly
                                        />
                                    </FormControl>

                                    <FormControl isInvalid={formik.errors.items && formik.errors.items[index] && formik.errors.items[index].quantity && formik.touched.items && formik.touched.items[index] && formik.touched.items[index].quantity}>
                                        <FormLabel>Quantity</FormLabel>
                                        <Input
                                            id={`items[${index}].quantity`}
                                            name={`items[${index}].quantity`}
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.items[index].quantity}
                                        />
                                    </FormControl>

                                    <Button
                                        mt={4}
                                        colorScheme="red"
                                        onClick={() => formik.setFieldValue('items', formik.values.items.filter((_, i) => i !== index))}
                                    >
                                        Remove Item
                                    </Button>
                                </Box>
                            ))}

                            <FormControl w={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={15}>
                                <Button
                                    mx={5}

                                    colorScheme="blue"
                                    onClick={() => formik.setFieldValue('items', [...formik.values.items, { sku_id: '', price: '', quantity: 1 }])}
                                >
                                    Add Item
                                </Button>

                                <Button mx={5} colorScheme="teal" type="submit">
                                    Submit
                                </Button>
                            </FormControl>

                        </form>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default SalesModal;