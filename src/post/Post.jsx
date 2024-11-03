import { useState } from "react";
import { Avatar, Flex, Typography } from "antd";
import PostDetail from "./PostDetail";
import { EyeOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
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
            <Flex
                gap="5px"
                wrap="nowrap"
                vertical
                style={{
                    breakInside: "avoid",
                    cursor: "pointer",
                    marginBottom: "40px",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: isHover ? `0 5px 10px rgba(0, 0, 0, 0.15), 0 5px 5px rgba(0, 0, 0, 0.1)` : "none",
                    transition: "box-shadow 1s"
                }}
                onClick={() => handleViewPost()}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                    <img style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                        src={post.urlPhoto} alt="img" loading="lazy" />
                    {
                        isHover &&
                        <Flex
                            justify="center" align="center"
                            style={{
                                position: "absolute",
                                width: "100%",
                                borderRadius: "10px",
                                backgroundColor: "black",
                                opacity: "0.6",
                                height: "100%",
                                top: "0",
                                left: "0",
                                transition: 'ease-in-out 1s'
                            }}>
                            <Flex vertical justify="center" align="center" gap="10px" >
                                <Flex gap="10px" style={{ fontSize: "20px" }}>
                                    <HeartFilled style={{ color: "red" }} />
                                    <CountUp start={0} end={post.likes} duration={1}
                                        style={{ zIndex: "10000", color: "white" }}
                                    />
                                </Flex>
                                <Flex gap="10px" style={{ fontSize: "20px" }}>
                                    <EyeOutlined style={{ color: "white" }} />
                                    <CountUp start={0} end={post.views} duration={1}
                                        style={{ zIndex: "10000", color: "white" }}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                </div>

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