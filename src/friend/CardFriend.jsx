import { Avatar, Flex, Typography } from "antd";
import { useContext } from "react";
import { MainContext } from "../context/context";
import { onSnapshot, colRefMess, query, where, orderBy, getDocs, addDoc, serverTimestamp, colRefBoxChat, or } from '../firebase.config'
const CardFriend = (props) => {
    const { friend } = props
    const { listBoxChat, setListBoxChat, user } = useContext(MainContext)
    const handleAddListBoxChat = async () => {
        try {
            if (!listBoxChat.includes(friend)) {
                const q = query(colRefBoxChat,
                    or(
                        where("members", "==", [friend.id, user.id]),
                        where("members", "==", [user.id, friend.id])
                    ));
                const snapshot = await getDocs(q);
                setListBoxChat([...listBoxChat, { ...friend, id: snapshot.docs[0].id }])
            }
        }
        catch (e) {
            console.log(e);
        }

    }
    return (
        <Flex gap="10px" align="center" style={{ cursor: "pointer" }}
            onClick={() => {
                handleAddListBoxChat()
            }}
        >
            <Avatar></Avatar>
            <Flex vertical justify="left">
                <Typography.Text>{friend.name}</Typography.Text>
                <Typography.Text>messages</Typography.Text>
            </Flex>
        </Flex>
    )
}

export default CardFriend;