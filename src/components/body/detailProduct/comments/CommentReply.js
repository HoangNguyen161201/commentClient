import { Box, Avatar, Stack, Code, Center, Divider, Text, Flex } from '@chakra-ui/react'
import moment from 'moment'

export default function CommentReply({ comment }) {
    return (

        <Stack  direction='row' spacing={5}>
            <Flex direction='column'>
                <Avatar bg='white' border='1px solid gray' size='lg' src={`https://avatars.dicebear.com/api/big-smile/${comment.username}.svg`} name={comment.username} />

            </Flex>
            <Stack direction='column' w="100%" spacing='5'>
                <Stack alignItems='start'>
                    <Text fontWeight='semibold'>{comment.username}</Text>
                    <Code>{ moment(Number(comment.time)).toNow() }</Code>
                </Stack>
                <Text>
                    {comment.content ? comment.content : ''}
                </Text>
            </Stack>
        </Stack>

    )
}
