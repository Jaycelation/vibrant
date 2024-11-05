import { Avatar, Button, Divider, Flex, Typography, Empty, Select } from "antd";
import { useState, useContext, useEffect } from "react";
import CreateNewPost from "../post/CreateNewPost";
import { onSnapshot, colRefPost, query, where, orderBy, getDocs, colRefUser } from '../firebase.config'
import { MainContext } from "../context/context";
import AddNewFriend from "../friend/AddNewFriend";
import Post from "../post/Post";

const Homepage = () => {
    const { user, setListFriends } = useContext(MainContext)
    const [listFriendPost, setListFriendPost] = useState([])
    const [isCreateNewPost, setIsCreateNewPost] = useState(false)
    const [isAddNewFriend, setIsAddNewFriend] = useState(false)
    const [options, setOptions] = useState([])
    const [selectValue, setSelectValue] = useState("All")
    useEffect(() => {
        onSnapshot(colRefPost, snapshot => {
            loadFriendPost()
        })
    }, [selectValue])

    const loadFriendPost = async () => {
        setListFriendPost([])
        setOptions([])
        const listNameFriend = []
        const listFriend = [...user.friends]
        listFriend.forEach((friend) => {
            listNameFriend.push(friend.username)
        })
        const listOptions = listNameFriend.map((friendname) => {
            return { value: friendname, label: friendname }
        })
        setOptions([{ value: "All", label: "All" }, ...listOptions])
        if (selectValue === "All") {
            if (listNameFriend.length > 0) {
                const q = query(colRefPost, where("username", "in", listNameFriend), orderBy('createdAt', 'desc'))
                const snapshot = await getDocs(q)
                let list = []
                snapshot.docs.forEach((doc) => {
                    list.push({ ...doc.data(), id: doc.id })
                })
                setListFriendPost(list)
            }
        }
        else {
            const q = query(colRefPost, where("username", "==", selectValue), orderBy('createdAt', 'desc'))
            const snapshot = await getDocs(q)
            let list = []
            snapshot.docs.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            })
            setListFriendPost(list)
        }


    }
    return (
        <Flex vertical justify="center" align="center" gap="5px" style={{ padding: "40px" }}>
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                <Select
                    value={selectValue}
                    style={{
                        width: 120,
                    }}
                    onChange={(value) => {
                        setSelectValue(value)
                    }}
                    options={options}
                />
                <Flex gap="0.5vw">
                    <Button type="primary"
                        onClick={() => { setIsCreateNewPost(true) }}
                    >{isCreateNewPost ? "Post" : "Create New"}</Button>
                    <Button type="primary"
                        onClick={() => { setIsAddNewFriend(true) }}
                    > Add Friend</Button>
                </Flex>
            </Flex>
            <Divider />

            {
                listFriendPost.length > 0
                    ?
                    <div
                        style={{
                            columns: "4 200px",
                            height: "auto",
                            margin: "0 auto",
                            pageBreakInside: "avoid",
                        }}
                    >
                        {listFriendPost.map((post, index) => {
                            return (
                                <Post post={post} key={index} />
                            )
                        })}
                    </div>
                    :
                    <div>
                        <Empty description={false} />
                    </div>
            }

            <CreateNewPost
                isCreateNewPost={isCreateNewPost}
                setIsCreateNewPost={setIsCreateNewPost}
            />
            <AddNewFriend
                isAddNewFriend={isAddNewFriend}
                setIsAddNewFriend={setIsAddNewFriend}
            />
        </Flex>
    )
}

export default Homepage;