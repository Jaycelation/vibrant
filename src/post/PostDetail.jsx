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
    const { setIsLoginModalOpen, user } = useContext(MainContext)
    const [isSendingMessage, setIsSendingMessage] = useState(false)
    const [inputComment, setInputComment] = useState("")
    const [listComment, setListComment] = useState([])
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
                username: data.username
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
                username: user.name
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
            onCancel={() => setIsViewPost(false)}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                </>
            )}
        >
            <Flex align='center' gap="10px">
                <Avatar style={{ flexShrink: "0" }} src={post.profile_image}></Avatar>
                <Text style={{
                    fontSize: "20px",
                    fontWeight: "600",
                }}> {post.username} - {post.text}</Text>
            </Flex>
            <Row justify='space-between' style={{ paddingTop: "20px" }} gutter={[24, 16]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <img style={{ maxWidth: "100%", borderRadius: "10px" }}
                        src={post.urlPhoto} alt="img" />
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