import { useState } from "react";
import { Flex } from "antd";
import PostDetail from "./PostDetail";
import { CommentOutlined, EyeFilled, HeartFilled } from "@ant-design/icons";
import CountUp from "react-countup";

const PersonnalPost = (props) => {
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
                    breakInside: "avoid",
                    cursor: "pointer",
                    marginBottom: "40px",
                    position: "relative",
                    borderRadius: "10px",
                    height: "100%",
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
                                    <CountUp start={0} end={400} duration={1}
                                        style={{ zIndex: "10000", color: "white" }}
                                    />
                                </Flex>
                                <Flex gap="10px" style={{ fontSize: "20px" }}>
                                    <EyeFilled style={{ color: "white" }} />
                                    <CountUp start={0} end={1234} duration={1}
                                        style={{ zIndex: "10000", color: "white" }}
                                    />
                                </Flex>
                                <Flex gap="10px" style={{ fontSize: "20px" }}>
                                    <CommentOutlined style={{ color: "white" }} />
                                    <CountUp start={0} end={12} duration={1}
                                        style={{ zIndex: "10000", color: "white" }}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                </div>
            </div>
            <PostDetail
                isViewPost={isViewPost}
                setIsViewPost={setIsViewPost}
                post={post}
            />
        </>


    )
}

export default PersonnalPost;