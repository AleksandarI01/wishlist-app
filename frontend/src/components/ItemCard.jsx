import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useItemStore } from "../store/item";
import defaultImage from '../images/defaultImage.png';

const ItemCard = ({ item }) => {
    const itemImage = item.image || defaultImage;
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bgColor = useColorModeValue("white", "gray.800");
    const [updatedItem, setUpdatedItem] = useState(item);

    const { deleteItem, updateItem } = useItemStore();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteItem = async (itemId) => {
        const { success, message } = await deleteItem(itemId);

        if (success) {
            toast({
                title: 'Success',
                description: message,
                position: 'top',
                status: 'success',
                duration: 1900,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                position: 'top',
                description: message,
                status: 'error',
                duration: 2200,
                isClosable: true,
            });
        }
    };

    const handleUpdateItem = async (itemId, updatedItem) => {
        const { success, message } = await updateItem(itemId, updatedItem);
        if (success) {
            onClose();
            toast({
                title: 'Success',
                description: message,
                position: 'top',
                status: 'success',
                duration: 1900,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: message,
                position: 'top',
                status: 'error',
                duration: 2200,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            bg={bgColor}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image src={itemImage} alt={item.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md'>
                    {item.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    {item.price} CHF
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteItem(item._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Item Name'
                                name='name'
                                value={updatedItem.name}
                                onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price' type='number'
                                value={updatedItem.price}
                                onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedItem.image}
                                onChange={(e) => setUpdatedItem({ ...updatedItem, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateItem(item._id, updatedItem)}>
                            Update Item
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ItemCard;