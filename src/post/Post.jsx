import { useState } from "react";
import { Avatar, Flex, Typography } from "antd";
import PostDetail from "./PostDetail";

const { Text } = Typography;
const Post = (props) => {
    const { post } = props;
    const [isViewPost, setIsViewPost] = useState(false);
    const handleViewPost = () => {
        setIsViewPost(true)
    }
    return (
        <>
            <Flex
                gap="5px"
                wrap="nowrap"
                vertical
                style={{ breakInside: "avoid", cursor: "pointer", marginBottom: "40px" }}
                onClick={() => handleViewPost()}
                onMouseOver={() => { }}
            >
                <img style={{
                    width: "100%",
                    borderRadius: "10px"
                }}
                    src={post.urlPhoto} alt="img" loading="lazy" />
                <Text strong>{post.text}</Text>
                <Flex align="center" gap="5px">
                    <Avatar style={{ flexShrink: "0" }} src={post.profile_image}></Avatar>
                    <Text className="title"> {post.username}</Text>
                </Flex>
            </Flex >
            <PostDetail
                isViewPost={isViewPost}
                setIsViewPost={setIsViewPost}
                post={post}
            />
        </>


    )
}

export default Post;