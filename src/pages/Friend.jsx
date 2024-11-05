import { Avatar, Button, Divider, Flex, Typography, Empty, Tag } from "antd";
import PersonalPost from "../post/PersonalPost";
import { useState, useContext, useEffect } from "react";
import CreateNewPost from "../post/CreateNewPost";
import { onSnapshot, colRefPost, query, where, orderBy, getDocs, colRefBoxChat, or } from '../firebase.config'
import { MainContext } from "../context/context";
import AddNewFriend from "../friend/AddNewFriend";
const { Text } = Typography;

const Friend = () => {
    const { friend, listBoxChat, setListBoxChat, user } = useContext(MainContext)
    const [listPost, setListPost] = useState([])
    useEffect(() => {
        window.scrollTo({ top: 0 })
        loadPost()
        onSnapshot(colRefPost, snapshot => {
            loadPost()
        })
    }, [friend])
    const loadPost = async () => {
        setListPost([])
        const q = query(colRefPost, where("username", "==", friend.username), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        let list = []
        snapshot.docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id })
        })
        setListPost(list)
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
        <Flex vertical justify="left" align="center" gap="5px" style={{ position: "relative", padding: "40px" }}>
            <div style={{
                width: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                paddingTop: "5px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <div
                    className="scroll-parent"
                >
                    <div className="scroll-element primary" >
                        <span color="magenta" >magenta</span>
                        <span color="red">red</span>
                        <span color="orange">orange</span>
                        <span color="gold">gold</span>
                        <span color="lime">lime</span>
                        <span color="green">green</span>
                        <span color="cyan">cyan</span>
                    </div>
                    <div className="scroll-element secondary">
                        <span >magenta</span>
                        <span >red</span>
                        <span >orange</span>
                        <span >gold</span>
                        <span >lime</span>
                        <span >green</span>
                        <span >cyan</span>
                    </div>
                </div>
                <div
                    className="scroll-parent"
                >
                    <div className="scroll-element-reverse primary" >
                        <span color="magenta" >magenta</span>
                        <span color="red">red</span>
                        <span color="orange">orange</span>
                        <span color="gold">gold</span>
                        <span color="lime">lime</span>
                        <span color="green">green</span>
                        <span color="cyan">cyan</span>
                    </div>
                    <div className="scroll-element-reverse secondary">
                        <span >magenta</span>
                        <span >red</span>
                        <span >orange</span>
                        <span >gold</span>
                        <span >lime</span>
                        <span >green</span>
                        <span >cyan</span>
                    </div>
                </div>
                <div
                    className="scroll-parent"
                >
                    <div className="scroll-element primary" >
                        <span color="magenta" >magenta</span>
                        <span color="red">red</span>
                        <span color="orange">orange</span>
                        <span color="gold">gold</span>
                        <span color="lime">lime</span>
                        <span color="green">green</span>
                        <span color="cyan">cyan</span>
                    </div>
                    <div className="scroll-element secondary">
                        <span >magenta</span>
                        <span >red</span>
                        <span >orange</span>
                        <span >gold</span>
                        <span >lime</span>
                        <span >green</span>
                        <span >cyan</span>
                    </div>
                </div>
            </div>
            <Flex justify="left" align="center" gap="2vw" style={{ width: "100%" }}>
                <Avatar size={96} style={{ flexShrink: "0" }}>{friend.username.slice(0, 1).toUpperCase()}</Avatar>
                <Flex vertical justify="left" gap="10px">
                    <Flex justify="left" align="center" gap="10px"
                    >
                        <Text style={{ fontWeight: "600", fontSize: "30px" }}>{friend.username.charAt(0).toUpperCase() + friend.username.slice(1)}</Text>
                        <Text type="secondary" style={{ fontSize: "24px" }}> {friend.email}</Text>
                    </Flex>

                    <Button type="primary"
                        onClick={() => { handleAddListBoxChat() }}
                    >Chat</Button>

                </Flex>
            </Flex>
            <Divider />

            {
                listPost.length > 0
                    ?
                    <div
                        style={{
                            columns: "4 300px",
                            height: "100%",
                            margin: "0 auto",
                            breakInside: "avoid",
                        }}
                    >
                        {listPost.map((post, index) => {
                            return (
                                <PersonalPost post={post} key={index} />
                            )
                        })}
                    </div>
                    :
                    <div>
                        <Empty description={false} />
                    </div>
            }

        </Flex >
    )
}

export default Friend;