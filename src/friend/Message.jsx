import { Flex, Typography } from "antd";
import { useContext } from "react";
import { MainContext } from "../context/context";

const Message = ({ message }) => {
    const { colorPrimary, colorPrimary2,
        user
    } = useContext(MainContext)
    return (
        <Flex
            justify={message.user_id === user.id ? "right" : "left"}
            align="center"
            style={{ paddingLeft: "10px" }}>
            <Typography.Text style={{
                border: message.user_id === user.id ? `1px solid ${colorPrimary2}` : `1px solid ${colorPrimary}`,
                borderRadius: "20px",
                padding: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
                maxWidth: "200px"
            }}>
                {message.text}
            </Typography.Text>
        </Flex>

    )
}

export default Message;