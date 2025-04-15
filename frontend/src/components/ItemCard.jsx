import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useItemStore } from "../store/item";
import defaultImage from '../images/defaultImage.png';

const ItemCard = ({ item }) => {
    const itemImage = item.image || defaultImage;
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bgColor = useColorModeValue("white", "gray.800");

    const { deleteItem } = useItemStore();

    const toast = useToast();

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
            })
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
    }

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
                    <IconButton icon={<EditIcon />} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteItem(item._id)} colorScheme='red' />
                </HStack>
            </Box>
        </Box>
    )
}

export default ItemCard;