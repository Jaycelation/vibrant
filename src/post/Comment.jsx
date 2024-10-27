import { Avatar, Flex, Input, Button, Typography } from "antd";
import { useContext, useState } from "react";
import { MainContext } from "../context/context";
import { HeartOutlined } from "@ant-design/icons";
const { Text } = Typography;
const Comment = (props) => {
    const { comment } = props;
    const { colorTextGray } = useContext(MainContext)
    const [isRepComment, setIsRepComment] = useState(false)
    const handleSubmitRepComment = () => {
        setIsRepComment(false)
    }
    return (
        <Flex gap="10px">
            <Avatar style={{ flexShrink: 0 }}></Avatar>
            <Flex vertical gap="3px" style={{ flexGrow: 1 }}>
                <Text > <b>{comment.username}</b> {comment.content} </Text>
                <Flex align="center" gap="20px">
                    {/* <Text style={{ color: colorTextGray }}>
                        time </Text> */}
                    <Text
                        style={{ fontWeight: "600", color: colorTextGray, cursor: "pointer" }}
                        onClick={() => setIsRepComment(true)}
                    >  Reply </Text>
                    <HeartOutlined />
                </Flex>
                {
                    isRepComment && <>
                        <Input placeholder="Reply" />
                        <Flex justify="end" gap="10px">
                            <Button onClick={() => setIsRepComment(false)}>Huỷ</Button>
                            <Button type="primary"
                                onClick={handleSubmitRepComment}
                            >Reply</Button>
                        </Flex>

                    </>
                }
            </Flex>
        </Flex>
    )
}

export default Comment;