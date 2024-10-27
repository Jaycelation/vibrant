import { SmileOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Flex, Typography } from "antd";
import PostOwn from "../post/PostOwn";
const { Text } = Typography;

const User = () => {
    const post = {
        id: "123",
        createdAt: "0",
        likes: "0",
        views: "0",
        username: "nav",
        profile_image: null,
        urlPhoto: "https://images.unsplash.com/photo-1541275055241-329bbdf9a191?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlvbGV0fGVufDB8fDB8fHww",
        text: "hello boi"
    }
    return (
        <Flex vertical justify="center" align="center" gap="5px" style={{ padding: "40px" }}>
            <Avatar size={96}></Avatar>
            <Text style={{ fontWeight: "600", fontSize: "30px" }}>Username</Text>
            <Text type="secondary" style={{ fontSize: "16px" }}> <SmileOutlined /> Email</Text>
            <Flex style={{ paddingTop: "20px" }} gap="20px">
                <Button>Create New</Button>
                <Button> Edit profile</Button>
            </Flex>
            <Divider />
            <div
                style={{
                    columns: "4 200px",
                    height: "auto",
                    margin: "0 auto",
                    breakInside: "avoid"
                }}
            >
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
                <PostOwn post={post} />
            </div>
        </Flex>
    )
}

export default User;