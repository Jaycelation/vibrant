import { useContext, useState } from "react";
import { Avatar, Flex, Typography } from "antd";
import PostDetail from "./PostDetail";
import { EyeFilled, EyeOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/context";
import { onSnapshot, colRefUser, query, where, orderBy, getDocs } from '../firebase.config'
const { Text } = Typography;
const Post = (props) => {
    const { post } = props;
    const navigate = useNavigate()
    const { setFriend } = useContext(MainContext)
    const [isViewPost, setIsViewPost] = useState(false);
    const [isHover, setIsHover] = useState(false)
    const handleViewPost = () => {
        setIsViewPost(true)
    }
    const handleViewFriend = async () => {
        try {
            const q = query(colRefUser, where("username", "==", post.username))
            const snapshot = await getDocs(q)
            snapshot.docs[0].data()
            const dataFriend = {
                username: snapshot.docs[0].data().username,
                email: snapshot.docs[0].data().email,
                id: snapshot.docs[0].id,
                tags: [],
                avatar: snapshot.docs[0].data().avatarUrl
            }
            setFriend(dataFriend)
            const stringFriend = JSON.stringify(dataFriend);
            localStorage.setItem('friend', stringFriend);
            navigate('/friend')
        }
        catch {
        }
    }
    return (
        <>
            <div
                style={{
                    pageBreakInside: "avoid",
                    display: "flex",
                    gap: "5px",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    cursor: "pointer",
                    marginBottom: "40px",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: isHover ? `0 5px 10px rgba(0, 0, 0, 0.15), 0 5px 5px rgba(0, 0, 0, 0.1)` : "none",
                    transition: "box-shadow 1s"
                }}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
                    onClick={() => handleViewPost()}
                >
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
                                    <EyeFilled style={{ color: "white" }} />
                                    <CountUp start={0} end={post.views} duration={1}
                                        style={{ zIndex: "10000", color: "white" }}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                </div>

                <Text strong>{post.text}</Text>
                <Flex align="center" gap="5px" onClick={() => handleViewFriend()}>
                    <Avatar style={{ flexShrink: "0" }} src={post.profile_image}></Avatar>
                    <Text> {post.username}</Text>
                </Flex>
            </ div>
            <PostDetail
                isViewPost={isViewPost}
                setIsViewPost={setIsViewPost}
                post={post}
            />
        </>


    )
}

export default Post;