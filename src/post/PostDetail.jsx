import { useContext, useState } from 'react';
import { Button, Modal, notification, Row, Col, Avatar, Input, Space, Flex, Typography } from 'antd';
import { HeartOutlined, DownloadOutlined, AimOutlined } from '@ant-design/icons';
import Comment from './Comment.jsx';
import { MainContext } from '../context/context';
import Login from '../pages/Login';
const { Text } = Typography;
const PostDetail = (props) => {
    const { isViewPost, setIsViewPost, post } = props
    const { setIsLoginModalOpen, user } = useContext(MainContext)
    const [inputComment, setInputComment] = useState("")
    const [listComment, setListComment] = useState([])
    const [time, setTime] = useState("")
    const handleSendComment = () => {
        if (user.name && user.password) {
            setTime(new Date().toLocaleTimeString())
            setListComment([...listComment, inputComment])
            setInputComment("")
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
                        >Sign in </Text> to unlock this feature</Text>
                    <Login />
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
                    <Flex style={{ flexGrow: "1", position: "relative", minHeight: "300px" }}>
                        <Flex gap="20px" vertical style={{ width: "100%", height: "100%", position: "absolute", overflowY: "scroll" }}>
                            {
                                listComment.map((text, index) => {
                                    return (
                                        <Comment key={index} text={text} time={time} />
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
                        >Send</Button>
                    </Space.Compact>
                </Col>
            </Row>
        </Modal >
    );
};

export default PostDetail;