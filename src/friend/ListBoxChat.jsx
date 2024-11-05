import { Flex } from "antd";
import { useContext } from "react";
import { MainContext } from "../context/context";
import BoxChat from "./BoxChat";

const ListBoxChat = () => {
    const { listBoxChat } = useContext(MainContext)
    return (
        <Flex
            style={{
                position: "fixed",
                bottom: "1vw",
                right: "1vw",
                overflow: "hidden",
                columns: "3 400px",
                zIndex: "10000"
            }}
            gap="1vw"
            justify="end"
            align="center"
        >
            {
                listBoxChat.map((box, index) => {
                    return (
                        <BoxChat box={box} key={index} />
                    )
                })
            }
        </Flex>
    );
}

export default ListBoxChat;