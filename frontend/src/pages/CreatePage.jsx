import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from "@chakra-ui/react";
import { useState } from "react";

const CreatePage = () => {
    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        image: ""
    });

    const handleAddItem = () => {
        console.log("new Item", newItem)
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Add a new Item to your Wishlist
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Item Name'
                            name='name'
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newItem.image}
                            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                        />

                        <Button colorShema='blue' onClick={handleAddItem} w='full'>
                            Add Item
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container >
    )
}

export default CreatePage;