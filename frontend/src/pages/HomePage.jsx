import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useItemStore } from "../store/item";
import ItemCard from "../components/ItemCard";

const HomePage = () => {
    const { fetchItems, items } = useItemStore();

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <Container maxW='cotnainer.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    color='blue.500'
                    textAlign={"center"}
                >
                    Items
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {items.map((item) => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </SimpleGrid>

                <Text
                    fontSize='xl'
                    textAlign={"center"}
                    fontWeight='bold'
                    color='gray.500'
                >
                    There are no items defined in your wishlist.{" "}
                    <Link to={"/create"}>
                        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                            Create an item
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Container>
    )
}

export default HomePage;