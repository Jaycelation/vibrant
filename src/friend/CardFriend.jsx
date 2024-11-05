import { Avatar, Flex, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/context";
import { onSnapshot, colRefMess, query, where, orderBy, getDocs, colRefBoxChat, or, colRefUser } from '../firebase.config'
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const CardFriend = (props) => {
    const { friend } = props
    const navigate = useNavigate()
    const { listBoxChat, setListBoxChat, user, colorPrimary, setFriend } = useContext(MainContext)
    const [isHover, setIsHover] = useState(false)
    const [lastestMessage, setLastestMessage] = useState("")
    const [userSendLastestMessage, setUserSendLastestMessage] = useState("")
    useEffect(() => {
        onSnapshot(colRefMess, snapshot => {
            loadLastestMessage()
        })
    }, [])
    const loadLastestMessage = async () => {
        // try {
        const q1 = query(colRefBoxChat,
            or(
                where("members", "==", [friend.id, user.id]),
                where("members", "==", [user.id, friend.id])
            ));
        const snapshot1 = await getDocs(q1);
        const q2 = query(colRefMess, where("boxchat", "==", snapshot1.docs[0].id), orderBy("createdAt", "asc"));
        const snapshot2 = await getDocs(q2);
        if (snapshot2.docs && snapshot2.docs.length > 0) {
            const mess = snapshot2.docs[+snapshot2.docs.length - 1].data().text;
            const userSend = snapshot2.docs[+snapshot2.docs.length - 1].data().user;
            setLastestMessage(mess)
            setUserSendLastestMessage(userSend)
        }
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }
    const handleViewFriend = async () => {
        try {
            const q = query(colRefUser, where("username", "==", friend.username))
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
        }
    }
    return (
        <Flex gap="10px" align="center" justify="space-between"
            style={{
                cursor: "pointer",
                borderBottom: `1px solid ${colorPrimary}`,
                padding: "10px",
                backgroundColor: isHover ? `${colorPrimary}1A` : ""
            }}

            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Flex align="center" gap="10px">
                {
                    friend.avatarUrl === ""
                        ?
                        <Avatar style={{
                            verticalAlign: 'middle',
                        }}>{friend.username.slice(0, 1).toUpperCase()}</Avatar>
                        :
                        <Avatar src={friend.avatarUrl}></Avatar>
                }
                <Flex vertical justify="left"
                    onClick={() => {
                        handleAddListBoxChat()
                    }}
                >
                    <Typography.Text>{friend.username}</Typography.Text>
                    {
                        userSendLastestMessage &&
                        <Typography.Text>{userSendLastestMessage === user.id ? "me" : friend.username} : {lastestMessage}</Typography.Text>
                    }
                </Flex>
            </Flex>

            <HomeOutlined
                onClick={handleViewFriend}
            />
        </Flex>
    )
}

export default CardFriend;