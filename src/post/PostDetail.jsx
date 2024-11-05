import { useContext, useEffect, useState } from 'react';
import { Button, Modal, notification, Row, Col, Avatar, Input, Space, Flex, Typography } from 'antd';
import { HeartOutlined, DownloadOutlined, AimOutlined } from '@ant-design/icons';
import Comment from './Comment.jsx';
import { MainContext } from '../context/context.jsx';
import {
    colRefComment,
    getDocs, addDoc,
    query, where, orderBy,
    serverTimestamp, onSnapshot
} from '../firebase.config.jsx'
const { Text } = Typography;
const PostDetail = (props) => {
    const { isViewPost, setIsViewPost, post } = props
    const { setIsLoginModalOpen, user, colorPrimary } = useContext(MainContext)
    const [isSendingMessage, setIsSendingMessage] = useState(false)
    const [inputComment, setInputComment] = useState("")
    const [listComment, setListComment] = useState([])
    const [isViewMoreContent, setIsViewMoreContent] = useState(false)
    useEffect(() => {
        loadComment()
        onSnapshot(colRefComment, () => {
            loadComment()
        })
    }, [])

    const loadComment = async () => {
        setListComment([])
        const q = query(colRefComment, where("post_id", "==", post.id), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        let list = []
        snapshot.docs.forEach((doc) => {
            const data = doc.data()
            list.push({
                post_id: data.post_id,
                createdAt: data.createdAt,
                content: data.content,
                accessToken: data.accessToken,
                username: data.username,
                reply: [],
                avatarUrl: data.avatarUrl,
            })

        })
        setListComment(list)
        setInputComment("")
        setIsSendingMessage(false)
    }
    const handleSendComment = () => {
        if (inputComment.trim() === "") return;
        if (user.accessToken) {
            setIsSendingMessage(true)
            addDoc(colRefComment, {
                post_id: post.id,
                createdAt: serverTimestamp(),
                content: inputComment,
                accessToken: user.accessToken,
                username: user.username,
                reply: [],
                avatarUrl: user.avatarUrl
            })
            loadComment()
        }
        else {
            notification.warning({
                message: `Notification`,
                duration: 3,
                pauseOnHover: false,
                description: <>
                    <Text>
                        <Text type="warning"
                            onClick={() => {
                                setIsLoginModalOpen(true)
                                setIsViewPost(false)
                            }}
                            style={{ cursor: "pointer" }}
                        >Sign in </Text> to unlock this feature
                    </Text>
                </>
                ,
            });
        }
    }
    return (
        <Modal
            height={"400px"}
            style={{ minWidth: "80%" }}
            open={isViewPost}
            onCancel={() => {
                setIsViewPost(false)
                setIsViewMoreContent(false)
            }}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                </>
            )}
        >
            <Row justify='space-between' style={{ paddingTop: "20px" }} gutter={[24, 16]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}
                    style={{ position: "relative" }}
                >
                    <div style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                    }}>
                        <img style={{ maxWidth: "100%", borderRadius: "10px" }}
                            src={post.urlPhoto} alt="img" />
                        {
                            isViewMoreContent &&
                            <div
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

                            </div>
                        }
                    </div>
                    <Flex align='start' gap="10px"

                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "30px"
                        }}
                    >
                        <Avatar size="large" src={post.profile_image}></Avatar>
                        <div style={{
                            backgroundColor: `${colorPrimary}80`,
                            padding: "5px",
                            maxWidth: "200px",
                            cursor: "pointer",
                            paddingRight: post.text.length > 20 ? "20px" : "15px",
                            paddingLeft: post.text.length > 20 ? "20px" : "15px",
                            borderRadius: isViewMoreContent && post.text.length > 20 ? "10px" : "1000px",
                            display: post.text === "" ? "none" : "flex",
                            justifyItems: "center",
                            alignItems: "center",
                            whiteSpace: isViewMoreContent && post.text.length > 20 ? "" : "nowrap",
                            transition: "height 1s"
                        }}
                            onClick={() => setIsViewMoreContent(!isViewMoreContent)}
                        > <span
                            style={{
                                maxWidth: "200px",
                                display: "inline-block",
                                fontSize: "20px",
                                fontWeight: "500",
                                color: "white",
                                overflow: "hidden",
                                textOverflow: isViewMoreContent && post.text.length > 20 ? "" : "ellipsis",
                            }}
                        >{post.text}</span></div>
                    </Flex>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}
                    style={{ display: "flex", flexDirection: "column" }}>
                    <Flex gap="20px" style={{ fontSize: "18px", flexShrink: "0" }}>
                        <Flex gap="10px">
                            <HeartOutlined />
                            <Text>{post.likes}</Text>
                        </Flex>
                        <DownloadOutlined />
                        <AimOutlined />
                    </Flex>
                    <Flex style={{ flexGrow: "1", position: "relative", minHeight: "300px", marginTop: "20px", marginBottom: "20px" }}>
                        <Flex gap="20px" vertical style={{ width: "100%", height: "100%", position: "absolute", overflowY: "scroll" }}>
                            {
                                listComment.map((comment, index) => {
                                    return (
                                        <Comment key={index} comment={comment} />
                                    )
                                })
                            }
                        </Flex>
                    </Flex>
                    <Space.Compact
                        style={{
                            width: '100%',
                            flexShrink: "0",
                        }}
                    >
                        <Input placeholder='input your comment' value={inputComment}
                            onChange={(e) => setInputComment(e.target.value)}
                        />
                        <Button type="primary"
                            onClick={handleSendComment}
                            loading={isSendingMessage}
                        >Send</Button>
                    </Space.Compact>
                </Col>
            </Row>
        </Modal >
    );
};

export default PostDetail;