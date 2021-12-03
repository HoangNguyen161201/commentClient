import { Box, chakra, Avatar, Breadcrumb, BreadcrumbItem, Stack, Code, Center, Divider, Text, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import star from 'react-stars'
import Reply from '../review/Reply'
import CommentReply from './CommentReply'
import moment from 'moment'

export default function CommentItem({ comment, socket, id }) {
    const StartChakra = chakra(star)

    return (
        <Box>
            <Stack direction='row' spacing={5}>
                <Flex direction='column'>
                    <Avatar bg='white' border='1px solid gray' size='lg' src={`https://avatars.dicebear.com/api/big-smile/${comment.username}.svg`} name={comment.username} />
                    <Center flex='1'>
                        <Divider orientation='vertical' borderColor='gray' />
                    </Center>
                </Flex>
                <Stack direction='column' w="100%" spacing='5'>
                    <Stack alignItems='start'>
                        <Text fontWeight='semibold'>{comment.username}</Text>
                        <Code>{moment(comment.createdAt).toNow()}</Code>
                    </Stack>
                    <StartChakra edit={false} color2='#008080c9' color1='#80808059' cursor='pointer' value={comment.rating} count={5} />
                    <Text>
                        {comment.content ? comment.content : ''}
                    </Text>
                    <Reply socket={socket} id={comment._id} product_id={id} name={comment.username} />
                    <Box pb={8}>
                        <Stack spacing={8}>
                            {
                                comment && comment.reply.map((e, key) => (
                                    <Box border='1px solid' borderRadius="5px" borderColor='gray.300' p='20px'>
                                        <CommentReply comment={e} key={key} />
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}
