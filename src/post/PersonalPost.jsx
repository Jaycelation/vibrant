import { useContext, useState } from "react";
import { Flex, Typography } from "antd";
import PostDetail from "./PostDetail";
import { EyeOutlined, HeartOutlined, MessageOutlined } from "@ant-design/icons";

const { Text } = Typography;
const Post = (props) => {
    const { post } = props;
    const [isViewPost, setIsViewPost] = useState(false);
    const [isHover, setIsHover] = useState(false)
    const handleViewPost = () => {
        setIsViewPost(true)
    }
    return (
        <>
            <div
                style={{
                    cursor: "pointer", marginBottom: "40px",
                    position: "relative",
                    borderRadius: "10px",
                    height: "auto",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    boxShadow: isHover ? "0 5px 10px rgba(0, 0, 0, 0.15), 0 5px 5px rgba(0, 0, 0, 0.1)" : "none",
                    transition: "box-shadow 1s",
                    padding: "10px",
                }}
                onClick={() => handleViewPost()}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img style={{
                    width: "100%",
                    borderRadius: "10px",
                }}
                    src={post.urlPhoto} alt="img" />
                <Flex gap="10px" style={{ position: "absolute", bottom: "15px", left: "15px" }}>
                    <HeartOutlined style={{ color: "white" }} />
                    <Text style={{ color: "white" }}>{post.likes}</Text>
                    <EyeOutlined style={{ color: "white" }} />
                    <Text style={{ color: "white" }}>{post.views}</Text>
                    <MessageOutlined style={{ color: "white" }} />
                    <Text style={{ color: "white" }}>0</Text>
                </Flex>
            </div>
            <PostDetail
                isViewPost={isViewPost}
                setIsViewPost={setIsViewPost}
                post={post}
            />
        </>


    )
}

export default Post;