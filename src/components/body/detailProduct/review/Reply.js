import { Stack, Text, Breadcrumb, BreadcrumbItem, useDisclosure, Collapse, Flex, Textarea, Spacer, Button, Input, FormControl, FormLabel, Box, Code, StackDirection, StackDivider, chakra } from '@chakra-ui/react'
import { useRef, useState } from 'react'


export default function Reply({ socket, id, name, product_id }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const username = useRef('')
    const [content, setcontent] = useState(`${name}: `)

// enter command
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { 
            username: username.current.value,
            content,
            comment_id: id,
            reply: true,
            product_id,
            time: Date.now().toString()
        }
        socket.emit('createComment', data)
        username.current.value = ''
        setcontent(`${name}: `)

    }

    return (
        <Stack spacing={3} mt={8}>
            <Breadcrumb my={3}>
                <BreadcrumbItem>
                    <Text cursor="pointer" onClick={onOpen} _hover={{
                        textDecoration: 'underline',
                        color: 'teal'
                    }} fontWeight="400">Reply</Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Text cursor="pointer" onClick={onClose} _hover={{
                        textDecoration: 'underline',
                        color: 'teal'
                    }} fontWeight="400">Hiden reply</Text>
                </BreadcrumbItem>
            </Breadcrumb>
            <Collapse animateOpacity in={isOpen}>
                <Stack mb={5} spacing={5} divider={<StackDivider />} borderRadius="5px" boxShadow="3px 3px 10px 0px #80808029" border="1px solid" padding="20px" borderColor='teal'>

                    <form onSubmit={handleSubmit}>
                        <Stack direction='column' spacing={4}>
                            <FormControl>
                                <FormLabel fontWeight='400'>User name</FormLabel>
                                <Input ref={username} type='text' placeholder="Enter name ..." />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight='400'>Comment</FormLabel>
                                <Textarea value={content} onChange={(e) => setcontent(e.target.value)} placeholder="Enter your comment ..." />
                            </FormControl>
                        </Stack>
                        <Button mt='5' type='submit' colorScheme='teal' variant='ghost' float='right'>Send</Button>
                    </form>
                </Stack>
            </Collapse>
        </Stack>
    )
}


