import { useContext } from 'react'
import { DataContext } from '../../../globalState'
import { SimpleGrid, Button, ButtonGroup, Text, VStack, AspectRatio, Box, Image, Container } from '@chakra-ui/react'
import { MdOutlinePriceCheck } from 'react-icons/md'
import { CgDetailsMore } from 'react-icons/cg'
import { Link } from 'react-router-dom'

export default function Product() {
    const { products: Products } = useContext(DataContext)
    const [products] = Products
    console.log(products)
    return (
        <Container letterSpacing="2px" maxW="container.xl">
            <SimpleGrid position='relative' columns={[1, 2, 3, 4]} spacing="20px">
                {
                    products && products.map((pr, key) => (
                        <Box key={key} position='relative'>

                            <VStack minHeight='100%' position='relative' spacing='25px' alignItems="start">
                                <AspectRatio maxW='100%' minW='100%' ratio={4 / 3}>
                                    <Image borderRadius="5px" boxShadow="3px 3px 4px 0px #80808026" src={`${pr.images.url}`} />
                                </AspectRatio>


                                <Box flex={1}>
                                    <Text fontSize="20px" fontWeight="semibold">
                                        {pr.title}
                                    </Text>
                                    <Text color='red.400'>
                                        $ {pr.price}
                                    </Text>
                                    <Text>
                                        {pr.description}
                                    </Text>
                                </Box>
                                <ButtonGroup variant="outline" mt='5' isAttached>
                                    <Button colorScheme="teal" leftIcon={<CgDetailsMore />} fontWeight='400'>
                                        <Link to={`/${pr._id}`}>
                                            Detail
                                        </Link>
                                    </Button>
                                    <Button colorScheme='blue' leftIcon={<MdOutlinePriceCheck />} fontWeight='400'>Buy</Button>
                                </ButtonGroup>
                            </VStack>
                            
                        </Box>
                    ))
                }
            </SimpleGrid>
        </Container>
    )
}
