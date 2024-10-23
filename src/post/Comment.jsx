import { Avatar, Flex, Input, Button, Typography } from "antd";
import { useContext, useState } from "react";
import { MainContext } from "../context/context";
import { HeartOutlined } from "@ant-design/icons";

const { Text } = Typography;
const Comment = (props) => {
    const { text, time } = props;
    const { colorTextGray, user } = useContext(MainContext)
    const [isRepComment, setIsRepComment] = useState(false)
    const handleSubmitRepComment = () => {
        setIsRepComment(false)
    }
    return (
        <Flex gap="10px">
            <Avatar style={{ flexShrink: 0 }}></Avatar>
            <Flex vertical gap="3px" style={{ flexGrow: 1 }}>
                <Text > <b>{user.name}</b> {text} </Text>
                <Flex align="center" gap="20px">
                    <Text style={{ color: colorTextGray }}>  {time} </Text>
                    <Text
                        style={{ fontWeight: "600", color: colorTextGray, cursor: "pointer" }}
                        onClick={() => setIsRepComment(true)}
                    >  Trả lời </Text>
                    <HeartOutlined />
                </Flex>
                {
                    isRepComment && <>
                        <Input placeholder="Trả lời" />
                        <Flex justify="end" gap="10px">
                            <Button onClick={() => setIsRepComment(false)}>Huỷ</Button>
                            <Button type="primary"
                                onClick={handleSubmitRepComment}
                            >Lưu</Button>
                        </Flex>

                    </>
                }
            </Flex>
        </Flex>
    )
}

export default Comment;