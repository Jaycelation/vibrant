import { Avatar, Flex, Typography } from "antd";
const CardFriend = (props) => {
    const { friend } = props
    return (
        <Flex gap="10px" align="center">
            <Avatar></Avatar>
            <Flex vertical justify="left">
                <Typography.Text>{friend.name}</Typography.Text>
                <Typography.Text>messages</Typography.Text>
            </Flex>
        </Flex>
    )
}

export default CardFriend;