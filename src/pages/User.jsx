import { Avatar, Button, Divider, Flex, Typography } from "antd";
import PersonalPost from "../post/PersonalPost";
import { useState, useContext, useEffect } from "react";
import CreateNewPost from "../post/CreateNewPost";
import { onSnapshot, colRefPost, query, where, orderBy, getDocs } from '../firebase.config'
import { MainContext } from "../context/context";
const { Text } = Typography;

const User = () => {
    const { listPersonalPost, setListPersonalPost, user } = useContext(MainContext)
    const [isCreateNewPost, setIsCreateNewPost] = useState(false)
    useEffect(() => {
        onSnapshot(colRefPost, snapshot => {
            loadPersonalPost()
        })
    }, [])
    const loadPersonalPost = async () => {
        setListPersonalPost([])
        const q = query(colRefPost, where("username", "==", user.name), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        let list = []
        snapshot.docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id })
        })
        setListPersonalPost(list)
    }
    return (
        <Flex vertical justify="center" align="center" gap="5px" style={{ padding: "40px" }}>
            <Avatar size={96}></Avatar>
            <Text style={{ fontWeight: "600", fontSize: "30px" }}>{user.name}</Text>
            <Text type="secondary" style={{ fontSize: "16px" }}> {user.email}</Text>
            <Flex style={{ paddingTop: "20px" }} gap="20px">
                <Button type="primary"
                    onClick={() => { setIsCreateNewPost(true) }}
                ><a href="#create">{isCreateNewPost ? "Post" : "Create New"}</a></Button>
                <Button> Edit profile</Button>
            </Flex>
            <Divider />


            <div
                style={{
                    columns: "4 200px",
                    height: "auto",
                    margin: "0 auto",
                    breakInside: "avoid"
                }}
            >
                {listPersonalPost.map((post, index) => {
                    console.log(post)
                    return (
                        <PersonalPost post={post} key={index} />
                    )
                })}
            </div>
            <CreateNewPost
                isCreateNewPost={isCreateNewPost}
                setIsCreateNewPost={setIsCreateNewPost}
            />
        </Flex>
    )
}

export default User;