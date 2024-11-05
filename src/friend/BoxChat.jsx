import { Avatar, Button, Flex, Input, Space, Typography } from "antd";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
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
    useLayoutEffect(() => {
        refMes.current?.lastElementChild?.scrollIntoView()
    })
    const handleSendMessage = () => {
        if (message.trim() === "") return;
        addDoc(colRefMess, {
            boxchat: box.id,
            user_id: user.id,
            text: message,
            createdAt: serverTimestamp()
        });
        setMessage("");
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
                transition: "1s ease-in-out"
            }}
            gap="1vw"
            justify="left"
            align="flex-start"
            vertical
        >
            <Flex justify="space-between" style={{ width: "100%", }}>

                <Flex align="center" gap="10px">
                    {box.avatarUrl === ""
                        ?
                        <Avatar style={{
                            verticalAlign: 'middle',
                        }}>{box.username.slice(0, 1).toUpperCase()}</Avatar>
                        :
                        <Avatar src={box.avatarUrl}></Avatar>
                    }

                    <Typography.Text style={{ fontWeight: "600" }}>{box.username}</Typography.Text>
                </Flex>
                <CloseCircleFilled style={{
                    color: colorPrimary,
                    fontSize: "20px"
                }}
                    onClick={() => {
                        let list = listBoxChat;
                        list = list.filter(fr => fr.username !== box.username)
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
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage()
                        }
                    }}
                />
                <Button type="primary"
                    onClick={() => { handleSendMessage() }}
                ><SendOutlined /></Button>
            </Space.Compact>
        </Flex>
    );
}

export default BoxChat;