import { Avatar, Button, Flex, Input, Space, Typography } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../context/context";
import { CloseCircleFilled, SendOutlined } from "@ant-design/icons";
import Message from "./Message";
import { onSnapshot, colRefMess, query, where, orderBy, getDocs, addDoc, serverTimestamp } from '../firebase.config'

const BoxChat = ({ box }) => {
    const { colorPrimary,
        colorBgBase, listBoxChat, setListBoxChat,
        user
    } = useContext(MainContext)
    const refMes = useRef(null)
    const [message, setMessage] = useState("")
    const [listMessage, setListMessage] = useState([])
    useEffect(() => {
        loadMessage();
        onSnapshot(colRefMess, snapshot => {
            loadMessage();
            refMes.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
        });
    }, []);

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        addDoc(colRefMess, {
            boxchat: box.id,
            user: user.id,
            text: message,
            createdAt: serverTimestamp()
        });
        setMessage("");
        // refMes.current.scrollToBottom()
    };

    const loadMessage = async () => {
        try {
            const q = query(colRefMess, where("boxchat", "==", box.id), orderBy("createdAt", "asc"));
            const snapshot = await getDocs(q);
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            setListMessage(list);
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <Flex
            style={{
                backgroundColor: colorBgBase,
                width: "300px",
                height: "400px",
                borderRadius: "10px",
                padding: "10px",
                border: `1px solid ${colorPrimary}`,
            }}
            gap="1vw"
            justify="left"
            align="flex-start"
            vertical
        >
            <Flex justify="space-between" style={{ width: "100%", }}>

                <Flex align="center" gap="10px">
                    <Avatar></Avatar>
                    <Typography.Text style={{ fontWeight: "600" }}>{box.name}</Typography.Text>
                </Flex>
                <CloseCircleFilled style={{
                    color: colorPrimary,
                    fontSize: "20px"
                }}
                    onClick={() => {
                        let list = listBoxChat;
                        list = list.filter(fr => fr.name !== box.name)
                        setListBoxChat([...list])
                    }}
                />
            </Flex>
            <div
                style={{
                    width: "100%",
                    flexGrow: "1",
                    border: `1px solid ${colorPrimary}`,
                    borderRadius: "10px",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    position: "relative"
                }}
                ref={refMes}
            >
                {
                    listMessage.map((message, index) => {
                        return (
                            <Message message={message} key={message.id} />
                        )
                    })

                }
            </div>
            <Space.Compact
                style={{
                    width: '100%',
                }}
            >
                <Input placeholder="Text your message"
                    style={{ border: `1px solid ${colorPrimary}`, }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="primary"
                    onClick={() => { handleSendMessage() }}
                ><SendOutlined /></Button>
            </Space.Compact>
        </Flex>
    );
}

export default BoxChat;