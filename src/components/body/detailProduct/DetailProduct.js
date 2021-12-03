import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../globalState'
import { Box, Button, chakra, Container, Stack, StackDivider, Text, AspectRatio, Image, Flex, Spacer, Tag } from '@chakra-ui/react'
import Star from 'react-stars'
import { getData } from '../../../utils/fetchData'
import CommentItem from './comments/CommentItem'
import Review from './review/Review'


export default function DetailProduct() {

    const StartChakra = chakra(Star)
    const { id } = useParams()
    const data = useContext(DataContext)
    const { products: Product, socket } = data
    const [products] = Product
    const [detailProduct, setDetailProduct] = useState(null)
    const rating = detailProduct && detailProduct.numberReview > 0 ? (detailProduct.rating / detailProduct.numberReview) : 0
    const [page, setPage] = useState(1)


    // all comments
    const [comments, setComments] = useState([])
    useEffect(() => {
        getData('/api/comments/' + id + '?sort=1&page='+page).then(res => {
            setComments(res1=> [...res1, ...res.data.comments])
        })

    }, [id, page])

 

    useEffect(() => {
        const newArr = products.filter(product => product._id === id)[0]
        setDetailProduct(newArr)
    }, [id, products])

    // realtime
    useEffect(()=> {
        if(socket){
            socket.emit('joinRoom', id)
        }
    }, [socket, id])

    useEffect(()=> {
        if(socket){
            socket.on('sendNewComment', newComment=> {
                setComments([newComment, ...comments])          
            })
            return ()=> socket.off('sendNewComment')
        }
    }, [socket, comments])

    useEffect(()=> {
        if(socket){
            socket.on('sendReply', data=> {
                const Comments = comments.map(e=> {
                    if(e._id == data._id) {
                        return data
                    } else {
                        return e
                    }
                })
                setComments(Comments)
            })
        }
    }, [socket, comments])

    useEffect(()=> {
        const box = document.getElementById('boxView')
        const observer = new IntersectionObserver((entries)=> {
            if(entries[0].isIntersecting){
                setPage(pre => pre + 1)          
            }
        }) 
        observer.observe(box)
    }, [])



    return (
        <Container py={20} letterSpacing="2px">
            {
                detailProduct && (
                    <Stack spacing={5} divider={<StackDivider borderColor='teal.200' />}>
                        <Box>
                            <AspectRatio>
                                <Image borderRadius="5px" boxShadow="3px 3px 10px 0px #80808045" src={`${detailProduct.images.url}`} loading="lazy" />
                            </AspectRatio>
                            <Flex mt={10}>
                                <Text fontWeight='semibold' fontSize='20px'>{detailProduct.title}</Text>
                                <Spacer />
                                <Tag colorScheme="teal">review: {detailProduct.numberReview}</Tag>
                            </Flex>
                        </Box>
                        <Stack>
                            <Text>Rating</Text>
                            <Box>
                                <StartChakra edit={false} color2='#008080c9' color1='#80808059' size="25" value={rating} count={5} />
                            </Box>
                        </Stack>
                        <Stack spacing={3}>
                            <Text color='red.400'> $ {detailProduct.price}</Text>
                            <Text>{detailProduct.description}</Text>
                        </Stack>
                    </Stack>
                )
            }
            <Button mt={8} colorScheme='teal' isFullWidth>Buy</Button>




            {/* review */}
            <Review id={id} socket={socket}/>

            {/* comments */}
            <Stack spacing={5}>
                <Text mt={5} colorScheme='teal' color='teal'>Comments</Text>
                <Box>
                    {
                        comments && comments.map((value, key) => (
                            <CommentItem socket={socket} id={id} key={key} comment={value} />
                        ))
                    }
                </Box>
                <Box id='boxView'></Box>
            </Stack>

        </Container>
    )
}
