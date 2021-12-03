import { Stack, useToast, Text, useDisclosure, FormHelperText, Collapse, Flex, Textarea, Spacer, Button, Input, FormControl, FormLabel, Box, Code, StackDirection, StackDivider, chakra } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import star from 'react-stars'
import { patchData } from '../../../../utils/fetchData'

export default function Review({ socket, id }) {

    const StartChakra = chakra(star)
    const { isOpen, onToggle } = useDisclosure()
    const [ratingComment, setRatingComment] = useState(0)
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorComment, setErrorComment] = useState(false)
    const username = useRef('')
    const content = useRef('')
    const toast = useToast()

    // enter command
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: username.current.value,
            content: content.current.value,
            rating: ratingComment,
            product_id: id
        }
        if (ratingComment && ratingComment > 0 && username.current.value && content.current.value) {
            socket.emit('createComment', data)
            patchData('/api/products/' + id, { rating: data.rating }).then(res => {
                username.current.value = ''
                content.current.value = ''
                setRatingComment(0)
            })
        } else {
            if (!username.current.value){
                setErrorUsername(true)
            }

            if(!content.current.value){
                setErrorComment(true)
            }

            if(ratingComment == 0){
                toast({
                    status: 'error',
                    description: 'Rating must be greater than 0',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
        }
    }

    return (
        <Stack spacing={3} mt={8}>
            <Text userSelect='none' cursor="pointer" color="teal" onClick={onToggle}>Review</Text>
            <Collapse animateOpacity in={isOpen}>
                <Stack spacing={5} mt='5' divider={<StackDivider />} borderRadius="5px" boxShadow="3px 3px 10px 0px #80808029" border="1px solid" padding="20px" borderColor='teal'>
                    <Flex>
                        <Box>
                            <Code colorScheme='teal' px='10px'>
                                {ratingComment} rating
                            </Code>
                        </Box>
                        <Spacer />
                        <Box>
                            <StartChakra edit={true} color2='#008080c9' color1='#80808059' onChange={e => {
                                setRatingComment(e)
                            }} cursor='pointer' value={ratingComment} count={5} />
                        </Box>
                    </Flex>
                    <form onSubmit={handleSubmit}>
                        <Stack direction='column' spacing={4}>
                            <FormControl>
                                <FormLabel fontWeight='400'>User name</FormLabel>
                                <Input ref={username} onChange={()=> setErrorUsername(false)} type='text' placeholder="Enter name ..." />
                                {
                                    errorUsername ? <FormHelperText color='red.400'>Username cannot be left blank</FormHelperText> : ''
                                }
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight='400'>Comment</FormLabel>
                                <Textarea ref={content} onChange={()=> setErrorComment(false)} placeholder="Enter your comment ..." />
                                {
                                    errorComment ?
                                        <FormHelperText color='red.400'>Comments cannot be left blank</FormHelperText> : ''
                                }
                            </FormControl>
                        </Stack>
                        <Button mt='8' type='submit' colorScheme='teal' variant='ghost' float='right'>Send</Button>
                    </form>
                </Stack>
            </Collapse>
        </Stack>
    )
}
